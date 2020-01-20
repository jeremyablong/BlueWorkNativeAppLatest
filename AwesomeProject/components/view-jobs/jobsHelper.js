import React, { Component } from 'react';
import { View, Text as Texttt, StyleSheet, ScrollView } from "react-native";
import { SearchBar, Button, ListItem  } from "react-native-elements";
import axios from "axios";
import { Container, Header, Content, Card, CardItem, Body, Item, Input, Icon, Button as NativeButton, Text } from 'native-base';



class ViewJobsHelper extends Component {
constructor () {
	super();

	this.state = {
		query: "",
		data: []
	}
}
	updateSearch = (value) => {
		this.setState({
			query: value
		})
	}
	search () {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/jobs/home", {
			search: this.state.query.toLowerCase()
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
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/jobs/home", {
			search: this.state.query.toLowerCase()
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
		return this.state.data.map((item, index) => {

			// console.log("This is the item result :", item);
			return item.businessDetails.map((i, idx) => {
				let element = i;
				let isMatch = new RegExp('\\b'+ this.state.query +'\\b', 'i').test(i.jobDescription);
				if (isMatch) {
					console.log("This is the matches :", item)
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
			})
			// console.log(item)
			// return item.businessDetails.map((i, x) => {
			// 	console.log(i);
					// return (
					// <ScrollView>
				 //      <ListItem
				 //        key={x}
				 //        title={i.businessName}
				 //       	subtitle={i.jobDesciption}
				 //        bottomDivider 
				 //        rightTitle={`$${i.hourly} Per Hour`}
				 //        chevron 
				 //      />
				 //    </ScrollView>
					// );
			// })
		}) 
	}
	// category jobDesciption hourly worker count Construction
	componentDidUpdate () {
		console.log("updated.")
	}
	render() {
		return (
			<View>

				<Header style={{ marginTop: -30 }} searchBar rounded>
	          <Item>
	            <Icon name="ios-search" />
	            <Input placeholder="Search for KEY-WORDS..." onChangeText={(value) => {
	            	this.setState({
						query: value.toLowerCase()
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
export default ViewJobsHelper;