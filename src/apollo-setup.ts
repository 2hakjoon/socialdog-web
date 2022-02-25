import { ApolloClient, ApolloLink, concat, gql, HttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { getAccessToken } from "utils/local-storage";



const httpLink = new HttpLink({ uri: 'http://121.154.94.120/graphql' });

console.log(getAccessToken())
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${ getAccessToken() || null}`,
    },
  }));

  return forward(operation);
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
        }
      }
    }
  }
});

export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

