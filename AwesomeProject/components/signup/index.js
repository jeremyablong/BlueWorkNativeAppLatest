import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { Header, Button as NativeButton } from "react-native-elements";
import SignUpView from "./signupHelper.js";


class Signup extends Component {
constructor () {
	super();


}
	button = () => {
		return (
			<View>
				<Text  
				style={styles.buttonOne}
				onPress={() => {
					this.props.navigation.navigate("login")
					console.log("login redirect clicked.")
				}}>
					LOGIN
				</Text>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				<Text  
				style={styles.buttoTwoNav}
				title="Home"
				onPress={() => {
					this.props.navigation.navigate("home")
					console.log("Home redirect clicked.")
				}}>
					HOME
				</Text>
			</View>
		);
	}
	render() {
		return (
			<View>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Sign-Up Homepage', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
				
				<SignUpView navigation={this.props.navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({

	buttonOne: {
		color: "white"
	},
	buttoTwoNav: {
		color: "white"
	}
})	

export default Signup;