import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client/core';
// import { HttpLink } from 'apollo-angular/http';

const uri = 'http://localhost:5093/graphql'; 
const httpLink = new HttpLink({ uri: 'http://localhost:5093/graphql' });



const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  
  // Add the authorization to the headers
  if (token) {
    operation.setContext({
      headers: {
        'x-auth-token': `${token}`
      }
    });
  }

  return forward(operation);
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
