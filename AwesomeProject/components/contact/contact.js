import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "react-native-elements";


class Contact extends Component {
constructor (props){
	super(props);

	
}
	button = () => {
		return (
			<Button 
				title="Go Back"
				onPress={() => {
					this.props.navigation.navigate("home")
				}}></Button>
		);
	}
	nextPage = () => {
		return (
			<Button 
				title="Next"></Button>
		);
	}
	render() {
		return (
			<View>
				{/*<Button 
					style={styles.btn}
					title="Go Back To Homepage"
					onPress={()  => {
						this.props.navigation.navigate("home")
				}}>*/}
				<Header
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Ticketing Annonymous', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
				
				<Text style={{ textAlign: "center" }}> Welcome To Our Contact Page. </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		backgroundColor: "darkred",
		marginTop: "10px"
	}
})

export default Contact;