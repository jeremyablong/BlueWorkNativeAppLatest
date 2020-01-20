import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Button as NativeButton } from "react-native-elements";
import ProfileMainHelper from "../helpers/index.js";
import { signOut } from "../../../actions/index.js";
import { connect } from "react-redux";

class ProfileHome extends Component {
constructor () {
	super();


}
	button = () => {
		return (
			<View>
				<Text style={{ color: "white" }} title="Home" onPress={() => {
					this.props.navigation.navigate("home")
				}}>HOME</Text>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				{/*<Button title="Back" onPress={() => {
					this.props.navigation.navigate("")
				}}></Button>*/}
			</View>
		);
	}
	signOut = () => {
		this.props.signOut({});
	}
	renderAuth = () => {
		return (
			<View styles={styles.btnView}>
				<Text 
				title="Click To Sign Out" 
				style={styles.textOne} 
				onPress={() => {
					this.signOut();
					this.props.navigation.navigate("home");
				}} 
				backgroundColor="black">Click To Sign-Out
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
				  centerComponent={this.renderAuth()}
				  rightComponent={this.nextPage()}/>
				<ProfileMainHelper navigation={this.props.navigation} />

			</View>
		);
	}
}
const styles = StyleSheet.create({
	textOne: {
		color: "white"
	}
});

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps, { signOut })(ProfileHome);