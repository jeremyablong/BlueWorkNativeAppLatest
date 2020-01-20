import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Button as NativeButton } from "react-native-elements";
import LoginHelper from "./loginHelper.js";
import Navbar from "../universal/slide-out-menu.js";
import { NetworkInfo } from "react-native-network-info";

class SignIn extends Component {
constructor () {
	super();

// windowSoftInputMode="adjustResize"
}
	button = () => {
		return (
			<Navbar navigation={this.props.navigation} />	
		);
	}
	nextPage = () => {
		return (
			<NativeButton
				onPress={() => {
					console.log("clicked.");
					this.props.navigation.navigate("home")
				}}
				style={styles.navButtonTwo} 
				title="Back"
			></NativeButton>
		);
	}
	render() {
		return (
			<View>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Sign-In Page', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
				<LoginHelper navigation={this.props.navigation} />
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	navButton: {

	},
	navButtonTwo: {
		color: "white"
	},
	text: {
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		fontSize: 20
	}
})

export default SignIn;