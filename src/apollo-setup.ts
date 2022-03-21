import { ApolloClient, ApolloLink, concat, from, HttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { getAccessToken } from "utils/local-storage";
import { onError } from "@apollo/client/link/error";
import { QGetUserPosts_getUserPosts } from "__generated__/QGetUserPosts";
import { QGetSubscribingPosts_getSubscribingPosts } from "__generated__/QGetSubscribingPosts";
import { QGetPostsByAddress_getPostsByAddress } from "__generated__/QGetPostsByAddress";
import { QGetMyLikedPosts_getMyLikedPosts } from "__generated__/QGetMyLikedPosts";



const httpLink = new HttpLink({ uri: 'http://121.154.94.120/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${ getAccessToken() || null}`,
    },
  }));

  return forward(operation);
});


// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


export const loginState = makeVar(Boolean(getAccessToken()))

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return loginState()
          }
        },
        getUserPosts: {
          read(existing, {args:{args:{take}}}:any) {
            if(!existing?.data?.length){
              return undefined
            }
            // console.log("read", existing, existing.data.slice(offset, limit), username, offset, limit)
            
            return {__typename: existing.__typename, error:null, ok:true, data: existing.data.slice(0, take)};
          },
          keyArgs: ["@connection", ["key"]],
          merge(existing = {data:[]} , incomming:QGetUserPosts_getUserPosts) {
            // console.log("merge", existing, incomming)
            return {__typename : incomming.__typename, data:[...existing.data, ...incomming.data]};
          },
        },
        getSubscribingPosts:{
          read(existing, {args:{ page:{take}}}:any) {
            if(!existing?.data?.length){
              return undefined
            }
            // console.log("read", existing, existing.data.slice(offset, limit), offset, limit)
            
            return {__typename: existing.__typename, error:null, ok:true, data: existing.data.slice(0, take)};
          },
          keyArgs: [],
          merge(existing = {data:[]} , incomming:QGetSubscribingPosts_getSubscribingPosts) {
            // console.log("merge", existing, incomming)
            return {__typename : incomming.__typename, data:[...existing.data, ...incomming.data]};
          },
        },
        getPostsByAddress:{
          read(existing, {args:{ page:{take}}}:any) {
            if(!existing?.data?.length){
              return undefined
            }
            // console.log("read", existing, existing.data.slice(offset, limit), offset, limit)
            
            return {__typename: existing.__typename, error:null, ok:true, data: existing.data.slice(0, take)};
          },
          keyArgs: ['@connection',['key']],
          merge(existing = {data:[]} , incomming:QGetPostsByAddress_getPostsByAddress) {
            // console.log("merge", existing, incomming)
            return {__typename : incomming.__typename, data:[...existing.data, ...incomming.data]};
          },
        },
        getMyLikedPosts:{
          read(existing, {args:{ page:{take}}}:any) {
            if(!existing){
              return undefined
            }
            // console.log("read", existing, existing.data.slice(offset, limit), offset, limit)
            
            return {__typename: existing.__typename, error:null, ok:true, data: existing.data.slice(0, take)};
          },
          keyArgs: false,
          merge(existing = {data:[]} , incomming:QGetMyLikedPosts_getMyLikedPosts) {
            // console.log("merge", existing, incomming)
            return {__typename : incomming.__typename, data:[...existing.data, ...incomming.data]};
          },
        }
      }
    }
  }
});

export const client = new ApolloClient({
  cache,
  link: from([authMiddleware, errorLink.concat(httpLink)]),
});

