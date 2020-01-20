import React, { Component } from 'react';
import { 
	View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet, 
    Button as Buttonnn } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button, Header, Input } from 'react-native-elements';
import SendBird from 'sendbird';
import { sendbirdLogin } from "../../../actions/sendBirdLogin.js";
import { connect } from "react-redux";

class SendBirdChat extends Component {
constructor () {
	super();

	this.state = {
		userId: '',
        nickname: '',
        error: ''
	}
}
	button = () => {
		return (
			<View>
				<Buttonnn title="Home" onPress={() => {
					this.props.navigation.navigate("home")
				}}></Buttonnn>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				<Buttonnn title="bird" onPress={() => {
					this.props.navigation.navigate("sendbird_menu")
				}}></Buttonnn>
			</View>
		);
	}
    _userIdChanged = (userId) => {
        this.setState({ 
        	userId 
        });
    }

    _nicknameChanged = (nickname) => {
        this.setState({ 
        	nickname 
        });
    }
	_onButtonPress = () => {
		const { userId, nickname } = this.state;
        this.props.sendbirdLogin({ 
        	userId, 
        	nickname 
        });
		console.log("Username :", this.state.username)
	}
	render() {
		return (
		<View>
			<Header
			  style={styles.nav}
			  leftComponent={this.button()}
			  centerComponent={{ text: 'Chat Homepage', style: { color: '#fff' } }}
			  rightComponent={this.nextPage()}
			/>
            <View>
            	
                <View style={styles.containerStyle}>
                    <Text>User ID</Text>
                    <Input
                        value={this.state.userId}
                        onChangeText={this._userIdChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text>Nickname</Text>
                    <Input
                        value={this.state.nickname}
                        onChangeText={this._nicknameChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                
	            	<Button onPress={this._onButtonPress} 
	            	title="press me" 
	            	buttonStyle={{ 
                        	backgroundColor: '#2096f3'
                        }}></Button>
	         
                </View>
                <View style={styles.containerStyle}>
                    <Text>{this.state.error}</Text>
                </View>
            </View>
		</View>
		);
	}
}

var styles = StyleSheet.create({
	containerStyle: {
        marginTop: 10
    }
});
export default connect(null, { sendbirdLogin })(SendBirdChat);