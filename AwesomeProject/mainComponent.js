import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
import App from "./App.js";
import { store, persistor } from "./store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loading from "./components/loading.js";
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react";

const instanceLocator = "v1:us1:6bc7e912-2873-4a9d-9b0d-7cfbd3c3eb19";
const userId = "Jeremy";
 
const tokenProvider = new TokenProvider({
  url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/6bc7e912-2873-4a9d-9b0d-7cfbd3c3eb19/token",
});


class MainComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<ChatkitProvider
				        instanceLocator={instanceLocator}
				        tokenProvider={tokenProvider}
				        userId={userId}
				      >
			        	<App />
			        </ChatkitProvider>
				</PersistGate>
			</Provider>
		);
	}
}
export default MainComponent;