import React, { Component } from 'react';
import { View, Text, Button } from "react-native";
import { Header, Button as ElementsButton } from "react-native-elements";

class JobsHome extends Component {
	renderLeftContent = () => {
		return (
			<View>
				<Button title="HOME" onPress={() => {
					this.props.navigation.navigate("home");
				}}></Button>
			</View>
		);
	}
	renderRight = () => {
		return (
			<View>
				<Button title="BACK" onPress={() => {
					this.props.navigation.navigate("home");
				}}></Button>
			</View>
		);		
	}
	render() {
		return (
			<View>
			<Header
			  statusBarProps={{ barStyle: 'light-content' }}
			  barStyle="light-content" 
			  leftComponent={this.renderLeftContent()}
			  centerComponent={{ text: 'Welcome To The Jobs Homepage', style: { color: '#fff' } }}
			  rightComponent={this.renderRight()}
			/>
				<Text>This is the job postings homepage .</Text>
			</View>
		);
	}
}
export default JobsHome;