import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Button as NativeButton, Input } from "react-native-elements";
import axios from "axios";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import RNPickerSelect from 'react-native-picker-select';

class AboutHelper extends Component {
constructor () {
	super();

	this.state = {
		hobbies: "",
		addressStreet: "",
		addressCity: "",
		addressZipCode: "",
		addressState: "",
		occupation: "",
		age: 0,
		hobbiesTouch: false,
		addressStateTouch: false,
		addressStreetTouch: false,
		addressZipCodeTouch: false,
		occupationTouch: false,
		ageTouch: false,
		gender: "",
		genderTouch: false,
		addressCityTouch: false
	}
}
	handleSubmit = () => {
		const { addressCity, addressState, addressZipCode, addressStreet, age, gender, occupation, hobbies } = this.state;
		axios.put("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/profile/account/update", {
			email: this.props.email,
			addressCity, 
			addressState, 
			addressZipCode, 
			addressStreet, 
			age, 
			gender, 
			occupation, 
			hobbies
		}).then((res) => {
			this.setState({
				hobbies: "",
				addressStreet: "",
				addressCity: "",
				addressZipCode: "",
				addressState: "",
				occupation: "",
				age: 0,
				hobbiesTouch: false,
				addressStateTouch: false,
				addressStreetTouch: false,
				addressZipCodeTouch: false,
				occupationTouch: false,
				ageTouch: false,
				gender: "",
				genderTouch: false,
				addressCityTouch: false
			});
			
			console.log("This is the res.data: ", res.data);
		}).catch((err) => {
			console.log(err);
		})
		console.log(this.state);
	}
	render() {
		return (
			<View>
			{/*<NativeButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.topBtn} 
				title="Submit Changes"
			> </NativeButton>*/}
			{this.state.hobbiesTouch && this.state.addressStateTouch && this.state.addressStreetTouch && this.state.addressZipCodeTouch && this.state.occupationTouch && this.state.genderTouch && this.state.addressCityTouch && this.state.ageTouch ? <NativeButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.bottomBtn} 
				title="Submit Changes"
			> </NativeButton> : null }
		      <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		hobbies: value,
		          		hobbiesTouch: true
		          	})
		          }}
		          label="Hobbies & Interests"
		          value={this.state.hobbies}
		          placeholder='List your hobbies and interests'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>

		      <View style={{ paddingLeft: 13, paddingRight: 13}}>
		      <Text style={styles.label}>Please Select Your Age</Text>
				<RNPickerSelect 
					style={styles.select}
		            onValueChange={(value) => {
		            	console.log(value)
		            	this.setState({
		            		age: value,
		            		ageTouch: true
		            	})
		            }}
		            items={[
		                { label: '18', value: '18' },
		                { label: '19', value: '19' },
		                { label: '20', value: '20' },
		                { label: '21', value: '21' },
		                { label: '22', value: '22' },
		                { label: '23', value: '23' },
		                { label: '24', value: '24' },
		                { label: '25', value: '25' },
		                { label: '26', value: '26' },
		                { label: '27', value: '27' },
		                { label: '28', value: '28' },
		                { label: '29', value: '29' },
		                { label: '30', value: '30' },
		                { label: '31', value: '31' },
		                { label: '32', value: '32' },
		                { label: '33', value: '33' },
		                { label: '34', value: '34' },
		                { label: '35', value: '35' },
		                { label: '36', value: '36' },
		                { label: '37', value: '37' },
		                { label: '38', value: '38' },
		                { label: '39', value: '39' },
		                { label: '40', value: '40' },
		                { label: '41', value: '41' },
		                { label: '42', value: '42' },
		                { label: '43', value: '43' },
		                { label: '44', value: '44' },
		                { label: '45', value: '45' },
		                { label: '46', value: '46' },
		                { label: '47', value: '47' },
		                { label: '48', value: '48' },
		                { label: '49', value: '49' },
		                { label: '50', value: '50' },
		                { label: '51', value: '51' },
		                { label: '52', value: '52' },
		                { label: '53', value: '53' },
		                { label: '54', value: '54' },
		                { label: '55', value: '55' },
		                { label: '56', value: '56' },
		                { label: '57', value: '57' },
		                { label: '58', value: '58' },
		                { label: '59', value: '59' },
		                { label: '60', value: '60' },
		                { label: '61', value: '61' },
		                { label: '62', value: '62' },
		                { label: '63', value: '63' },
		                { label: '64', value: '64' },
		                { label: '65', value: '65' },
		                { label: '66', value: '66' },
		                { label: '67', value: '67' },
		                { label: '68', value: '68' },
		                { label: '69', value: '69' },
		                { label: '70', value: '70' }
		            ]}
		        />
		      </View>

		      <View style={styles.inputOne} >
		      <Text style={styles.label}>Please Enter Your Gender</Text>
		        <RNPickerSelect 
					style={styles.select}
		            onValueChange={(value) => {
		            	this.setState({
		            		gender: value,
		            		genderTouch: true
		            	})
		            }}
		            items={[
		                { label: 'Male', value: 'Male' },
		                { label: 'Female', value: 'Female' },
		                { label: "Prefer To Not Answer", value: "Prefer To Not Answer" }
		            ]}
		        />

		      </View>

		      <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		addressStreet: value,
		          		addressStreetTouch: true
		          	})
		          }}
		          label="Address - Street"
		          value={this.state.addressStreet}
		          placeholder='2384 Oklahoma Street'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		      <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		addressCity: value,
		          		addressCityTouch: true
		          	})
		          }}
		          label="Address - City"
		          value={this.state.addressCity}
		          placeholder='Los Angeles'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		      <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		addressZipCode: value,
		          		addressZipCodeTouch: true
		          	})
		          }}
		          label="Address - Zip Code"
		          value={this.state.addressZipCode}
		          placeholder='90012'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		       <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		addressState: value,
		          		addressStateTouch: true
		          	})
		          }}
		          label="Address - State"
		          value={this.state.addressState}
		          placeholder='California'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		       <View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		occupation: value,
		          		occupationTouch: true
		          	})
		          }}
		          label="Occupation - Specialized Skill"
		          value={this.state.occupation}
		          placeholder='Carpenter, Plumber, etc...'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		      {/*<NativeButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.bottomBtn} 
				title="Submit Changes"
			> </NativeButton>*/}
			{this.state.hobbiesTouch && this.state.addressStateTouch && this.state.addressStreetTouch && this.state.addressZipCodeTouch && this.state.occupationTouch && this.state.genderTouch && this.state.addressCityTouch && this.state.ageTouch ? <NativeButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.bottomBtn} 
				title="Submit Changes"
			> </NativeButton> : null }
			</View>
			

		);
	}
}

const styles = StyleSheet.create({
  inputOne: {
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "white",
    paddingRight: 13,
    paddingLeft: 13
  },
  inputTwo: {
    marginBottom: 20,
    backgroundColor: "white"
  },
  inputThree: {
    marginBottom: 20,
    backgroundColor: "white"
  },
  inputFour: {
    backgroundColor: "white"
  },
  btnView: {
    margin: 10
  },
  label: {
  	fontSize: 17,
  	marginLeft: 10
  }
});

const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}


export default connect(mapStateToProps, {  })(AboutHelper);