import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import { StreamChat } from 'stream-chat';

const client = new StreamChat('36umqkgry8u3');
client.setUser(
    {
        id: 'jlahey',
        name: 'Jim Lahey',
        image: 'https://i.imgur.com/fR9Jz14.png',
    },
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiamxhaGV5In0.-ZIhHcRP4bFDjNejR21n7nuHu4jnHb9aac-dO5_4iuw',
);

client.connect('36umqkgry8u3', null, '62135');

class getStreamHome extends Component {
constructor () {
	super();


}
	handleTextMessage = async => () => {
		const text = 'I’m mowing the air Rand, I’m mowing the air.';
		const response = channel.sendMessage({
		    text,
		    customfield: '123',
		});
	}
  render() {
    const channel = client.channel('messaging', 'travel', {
	    name: 'Awesome channel about traveling',
	});
	// fetch the channel state, subscribe to future updates
	channel.watch();

    return (
      <SafeAreaView>
        {/*<Chat client={chatClient}>
          <Channel channel={channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>*/}
      </SafeAreaView>
    );
  }
}


export default getStreamHome;