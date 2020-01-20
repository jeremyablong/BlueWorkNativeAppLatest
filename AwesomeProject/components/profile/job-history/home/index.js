import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Header, Button as ElementButton } from "react-native-elements";
import JobHistoryHelper from "./jobHistoryHelper.js";
import JobHistoryHelperTwo from "./helperTwo.js";


class JobHistoryHome extends Component {
constructor () {
	super();

	this.state = {
		hidden: true
	}
}
	renderLeftContent = () => {
		return (
			<View>
				<ElementButton title="Home" onPress={() => {
					this.props.navigation.navigate("home")
				}}></ElementButton>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				<ElementButton title="Back" onPress={() => {
					this.props.navigation.navigate("profile")
				}}></ElementButton>
			</View>
		);
	}
	renderHiddenContent = () => {
		if (this.state.hidden === false) {
			return <JobHistoryHelper navigation={this.props.navigation} />
		}
	}
	render() {
		return (
			<ScrollView>
			<Header 
			  rightComponent={this.nextPage()}
			  leftComponent={this.renderLeftContent()}
			  centerComponent={{ text: 'Employment/Job History', style: { color: '#fff' } }}
			/>	
			<View style={styles.btnOutlineView} >
				<ElementButton
				  title="Add Your Work Experience"
				  type="outline" 
				  raised={true}
				  style={styles.btn} 
				  onPress={() => {
				  	this.setState({
				  		hidden: !this.state.hidden
				  	})
				  }}
				></ElementButton>
			</View>
				<JobHistoryHelperTwo />
				{this.renderHiddenContent()}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		
	},
	btnOutlineView: {
		paddingTop: 30,
		paddingBottom: 30
	}
})
export default JobHistoryHome;