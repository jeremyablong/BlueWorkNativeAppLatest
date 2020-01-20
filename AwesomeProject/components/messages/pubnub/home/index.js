import React, { Component } from 'react';
import { View, Text } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import PubNubReact from 'pubnub-react';
import { Button } from "react-native-elements";

class PubnubHome extends Component {
constructor (props) {
	super(props);

	this.state = {
		messages: []
	}
}
	onSend = () => {

	}
	componentDidMount() {
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: instanceLocator,
        userId: userId,
        tokenProvider: new Chatkit.TokenProvider({
          url: testToken
        })
    }) 
    render() {
    	console.log(this.props.chatkit);
		return (
			<View>
				<Text> Pubnub Home . </Text>
				<Button 
				onPress={this.onSend}
				title="Press me :)"></Button>
			</View>
		);
	}
}
export default PubnubHome;