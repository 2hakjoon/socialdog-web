import { ApolloClient, ApolloLink, from, fromPromise, HttpLink, InMemoryCache, makeVar, Observable } from "@apollo/client";
import { getAccessToken, getRefreshToken, setAccessToken } from "utils/local-storage";
import { onError } from "@apollo/client/link/error";
import { QGetUserPosts_getUserPosts } from "__generated__/QGetUserPosts";
import { QGetSubscribingPosts_getSubscribingPosts } from "__generated__/QGetSubscribingPosts";
import { QGetPostsByAddress_getPostsByAddress } from "__generated__/QGetPostsByAddress";
import { QGetMyLikedPosts_getMyLikedPosts } from "__generated__/QGetMyLikedPosts";
import { REISSUE_ACCESS_TOKEN } from "apllo-gqls/auth";
import { MReissueAccessToken, MReissueAccessTokenVariables } from "__generated__/MReissueAccessToken";



 const httpLink = new HttpLink({ uri: 'http://121.154.94.120/graphql' });
// const httpLink = new HttpLink({ uri: 'https://api.2hakjoon.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${getAccessToken() || null}`,
    },
  }));

  return forward(operation);
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if(client && graphQLErrors?.filter(error=>error.message === 'Unauthorized').length){
      // console.log("인증에러")
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      if(!(accessToken && refreshToken)){
        return ;
      }
      const promises =  fromPromise(
        client.mutate<MReissueAccessToken, MReissueAccessTokenVariables>(
          {mutation:REISSUE_ACCESS_TOKEN, variables:{args:{accessToken, refreshToken}}})
          .then(data=> {
            // console.log(data)
            if(data.data?.reissueAccessToken.accessToken){
              setAccessToken(data.data.reissueAccessToken.accessToken);
            }
            // 엑세스토큰 발급 실패시
            if(!data.data?.reissueAccessToken.ok){
              if(()=>getAccessToken()){
                client.resetStore()
                loginState(false)
              }
            }
          })
      )
      return promises.flatMap(()=>{
        const oldHeaders = operation.getContext().headers;
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `Bearer ${getAccessToken()}`,
          },
        })
        return forward(operation)
      })
    }
    console.log(
      `[GraphQL error]: Message: ${graphQLErrors?.[0].message}, Location: ${graphQLErrors?.[0].locations}, Path: ${graphQLErrors?.[0].path}`
      )
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
            
            return {
              __typename: existing.__typename,
              error:null,
              ok:true,
              length:existing.data.length,
              data: existing.data.slice(0, take)
            };
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
            // console.log("read", existing, existing.data.slice(0, take), take)
            
            return {
              __typename: existing.__typename,
              error:null, 
              ok:true,
              length:existing.data.length,
              data: existing.data.slice(0, take)
            };
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
            
            return {
              __typename: existing.__typename,
              error:null,
              ok:true,
              length:existing.data.length,
              data: existing.data.slice(0, take)
            };
          },
          keyArgs: ['@connection',['key']],
          merge(existing = {data:[]} , incomming:QGetPostsByAddress_getPostsByAddress) {
            // console.log("merge", existing, incomming)
            return {__typename : incomming.__typename, data:[...existing.data, ...incomming.data]};
          },
        },
        getMyLikedPosts:{
          read(existing, {args:{ page:{take}}}:any) {
            if(!existing?.data?.length){
              return undefined
            }
            // console.log("read", existing, existing.data.slice(offset, limit), offset, limit)
            
            return {
              __typename: existing.__typename, 
              error:null, 
              ok:true, 
              length:existing.data.length,
              data: existing.data.slice(0, take)};
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

