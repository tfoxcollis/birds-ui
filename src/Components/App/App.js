import React from "react";
import { Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import './App.css';
import EventForm from '../EventForm/EventForm'

const client = new ApolloClient({
  uri: "endpoint goes here",
  cache: new InMemoryCache()
});

const App = () =>  {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 className="App-header"> Hello world!</h1>
        <EventForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
