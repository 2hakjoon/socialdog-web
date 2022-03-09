import { ApolloClient, ApolloLink, concat, from, HttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { getAccessToken } from "utils/local-storage";
import { onError } from "@apollo/client/link/error";
import { QGetMyPosts_getMyPosts } from "__generated__/QGetMyPosts";



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
          // @ts-ignore
          read(existing, {args:{args:{offset, limit}}}) {
            if(!existing){
              return undefined
            }
            // console.log("read", existing, existing?.data.slice(offset, limit), offset, limit)
            return {__typename: existing.__typename, data: existing.data.slice(offset, limit)};
            
          },
          keyArgs: false,
          merge(existing = {data:[]} , incomming:QGetMyPosts_getMyPosts) {
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

