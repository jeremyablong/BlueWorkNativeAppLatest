import React, { Component } from 'react';
import { View, Text as Texter, Button as NativeButton, StyleSheet, ScrollView } from "react-native";
import { Header as Head, Input, SearchBar  } from "react-native-elements";
import ViewJobsHelper from "../jobsHelper.js";
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import SearchZipCode from "../zipCodeSearch/search.js";
import SearchCity from "../citySearch/search.js";

class PostedJobsHome extends Component {
constructor (props) {
	super(props);

	this.state = {
		search: "",
		zipcodeView: false,
		showDescription: true,
		showCity: false
	}
}
	nextPage = () => {
		return (
			<View>
				<Texter style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("home")
				}}>HOME</Texter>
			</View>
		);
	}
	renderLeftContent = () => {
		return (
			<View>
				<Texter style={{ color: "white" }} onPress={() => {
					this.props.navigation.navigate("home")
				}}>BACK</Texter>
			</View>
		);
	}

	render() {
		return (
	<>
		
			<View>
				<Head 
				  rightComponent={this.nextPage()}
				  leftComponent={this.renderLeftContent()}
				  centerComponent={{ text: 'Job Postings - Homepage', style: { color: '#fff' } }}
				/>
			
			</View>

		<ScrollView>
			{this.state.showDescription === true ? <ViewJobsHelper navigation={this.props.navigation} /> : null}
			{this.state.zipcodeView === true ? <SearchZipCode navigation={this.props.navigation} /> : null}
			{this.state.showCity === true ? <SearchCity navigation={this.props.navigation} /> : null}

		</ScrollView>
		<Text style={{ textAlign: "center", color: "white", backgroundColor: "black" }}>Filter By The Following Options</Text>
		<Footer>

          <FooterTab>
            <Button onPress={() => {
              	this.setState({
					zipcodeView: true,
					showDescription: false,
					showCity: false
              	})
              }}>
              <Text>ZipCode</Text>
            </Button>
            <Button onPress={() => {
              	this.setState({
					zipcodeView: false,
					showDescription: true,
					showCity: false
              	})
              }}>
              <Text>Details</Text>
            </Button>
            <Button onPress={() => {
              	this.setState({
					zipcodeView: false,
					showDescription: false,
					showCity: true
              	})
              }}>
              <Text>City</Text>
            </Button>
            {/*<Button onPress={() => {
              	this.setState({
					zipcodeView: true,
					showDescription: false
              	})
              }}>
              <Text>NULL</Text>
            </Button>*/}
          </FooterTab>
        </Footer>
        </>
		);
	}
}

const styles = StyleSheet.create({

})
export default PostedJobsHome;