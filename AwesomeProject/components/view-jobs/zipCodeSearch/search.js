import React, { Component } from 'react';
import { View, Text as Texttt, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Button, ListItem  } from "react-native-elements";
import axios from "axios";
import { Container, Header, Content, Card, CardItem, Body, Item, Input, Icon, Button as NativeButton, Text } from 'native-base';



class SearchZipCode extends Component {
constructor () {
	super();

	this.state = {
		query: 0,
		data: []
	}
}
	updateSearch = (value) => {
		this.setState({
			query: value
		})
	}
	search () {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobs/map/zipCode", {
			search: this.state.query
		}).then((res) => {
			console.log(res.data)
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err);
		})
	}
	componentDidMount () {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/gather/jobs/map/zipCode", {
			search: this.state.query
		}).then((res) => {
			console.log(res.data)
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err);
		})		
	}
	renderContent = () =>  {
		if (this.state.data) {
			return this.state.data.map((item, index) => {
			// console.log("This is the item result :", item);
			return item.businessDetails.map((i, idx) => {
				console.log("iiiiii:", i)

				const objKeys = Object.keys(i);

				return objKeys.map((key) => {

					if (key === "zipCode") {
						console.log("THIS IS THE ZIP CODES MATCHES.", i)
						if (i.zipCode === this.state.query) {
							return (
							    <ListItem 
							      	onPress={() => {
							      		this.props.navigation.navigate("job_individual", { data: i })
							      	}}
							        key={idx}
							        title={i.businessName}
							       	subtitle={i.jobDesciption}
							        bottomDivider 
							        rightTitle={`$${i.hourly} Per Hour`}
							        chevron 
							      />
							);
						}
					}
				})
				// let isMatch = new RegExp(^\d{5}(?:[-\s]\d{4})?$).test(i.zipCode);
				// if (i.hasOwnProperty(i.zipCode)) {
				// 	console.log("This is the matches ZIPCODE :", i);
				// 	return (
				// 	      <ListItem 
				// 	      	onPress={() => {
				// 	      		this.props.navigation.navigate("job_individual", { data: i })
				// 	      	}}
				// 	        key={idx}
				// 	        title={i.businessName}
				// 	       	subtitle={i.jobDesciption}
				// 	        bottomDivider 
				// 	        rightTitle={`$${i.hourly} Per Hour`}
				// 	        chevron 
				// 	      />
				// 	);
				// }
			})
		}) 
		}
	}
	componentDidUpdate () {
		console.log("updated.")
	}
	render() {
		return (
			<View>
			<Header style={{ marginTop: -30 }} searchBar rounded>
	          <Item>
	            <Icon name="ios-search" />
	            <Input placeholder="Search for ZIP-CODE..." onChangeText={(value) => {
	            	this.setState({
						query: value
					})
	            }}/>
	            <Icon name="ios-people" />
	          </Item>
	         
	        </Header>
				<Button onPress={() => {
					this.search()
				}} title="Submit Search Query" style={styles.searchBtn}></Button>
				
				{this.renderContent()}
				
			</View>
		);
	}
}

const styles = StyleSheet.create({

})
export default SearchZipCode;
