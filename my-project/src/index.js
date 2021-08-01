import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./app";

const client = new ApolloClient({
  uri: "https://graphql-weather-api.herokuapp.com/",
  cache: new InMemoryCache(),
});

const Index = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Index;
