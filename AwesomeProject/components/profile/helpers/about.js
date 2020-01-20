import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Button as NativeButton, ListItem, Card } from "react-native-elements";
import axios from "axios";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import AboutHelper from "./aboutHelper.js";

class AboutMeSection extends Component {
constructor () {
	super();

	this.state = {
		data: [],
		error: null
	}
}	
	button = () => {
		return (
			<View>
				<NativeButton title="Home" onPress={() => {
					this.props.navigation.navigate("home")
				}}></NativeButton>
			</View>
		);
	}
	nextPage = () => {
		return (
			<View>
				<NativeButton title="Back" onPress={() => {
					this.props.navigation.navigate("profile")
				}}></NativeButton>
			</View>
		);
	}
	componentDidMount () {
		axios.get("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/profile/gather").then((res) => {
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			this.setState({
				error: err
			})
		})
	}
	reRender = () => {
		console.log("re-render clicked")
		axios.get("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/profile/gather").then((res) => {
			this.setState({
				data: res.data
			}, () => {
				console.log(this.state.data)
			})
		}).catch((err) => {
			this.setState({
				error: err
			})
			if (err) {
				console.log(err)
			}
		})		
	}
	returnApiData = () => { 
		return this.state.data.map((item, index) => {
			if (item.email === this.props.email) {
				console.log("This is the item :", item)
				return (
					<Card style={styles.card} key={index} title="Welcome To Your Profile Information">
					  {
				        <View key={index} style={styles.user}>
				          
				          <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>First Name:</Text> {item.firstName}</Text>
								
				          <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Last Name:</Text> {item.lastName}</Text>
								
						  <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Email Address:</Text> {item.email}</Text>
								
						  <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Password:</Text> {item.password}</Text>
						  {item.age ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Age:</Text> {item.age}</Text> : null}
						  {item.addressCity ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Address City:</Text> {item.addressCity}</Text> : null}
						  {item.addressState ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Address State:</Text> {item.addressState}</Text> : null}
						  {item.addressZipCode ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Zip Code:</Text> {item.addressZipCode}</Text> : null}
						  {item.addressStreet ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Address Street:</Text> {item.addressStreet}</Text> : null}
						  {item.occupation ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Prefered Occupation:</Text> {item.occupation}</Text> : null}
						  {item.hobbies ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Hobbies:</Text> {item.hobbies}</Text> : null}
						  {item.gender ? <Text style={styles.name}><Text style={{ fontWeight: "bold" }}>Gender:</Text> {item.gender}</Text> : null}

				        </View>
					  }
					</Card>
				);
			}
		})
	}
	render() {
		return (
			<ScrollView>
				<Header
				  style={styles.nav}
				  leftComponent={this.button()}
				  centerComponent={{ text: 'Welcome To The About Me Section', style: { color: '#fff' } }}
				  rightComponent={this.nextPage()}
				/>
				
				{this.returnApiData()}
				<NativeButton title="View Entire Profile" onPress={() => {
					this.reRender()
				}}> </NativeButton>
				<Text style={styles.bottomText}>Please fill out each field to be able to unlock the submit buttons.</Text>

				<AboutHelper />
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	name: {
		color: "black",
		fontSize: 20
	},
	card: {
		marginBottom: 30
	},
	bottomText: {
		fontSize: 20,
		textAlign: "center",
		fontWeight: "bold"
	}
})

const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}
export default connect(mapStateToProps, { })(AboutMeSection);
