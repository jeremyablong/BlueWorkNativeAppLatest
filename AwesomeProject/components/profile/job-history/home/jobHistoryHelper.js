import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { Header, Button as ElementButton, Input } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { connect } from "react-redux";
import JobHistoryHelperTwo from "./helperTwo.js";


class JobHistoryHelper extends Component {
constructor () {
	super()

	this.state = {
		companyName: "",
		position: "",
		howLong: "",
		howManyYears: "",
		description: ""
	}
}
	handleSubmit = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/employment/add", {
			email: this.props.email,
			companyName: this.state.companyName,
			position: this.state.position,
			howManyYears: this.state.howManyYears,
			description: this.state.description,
			howLong: this.state.howLong
		}).then((res) => {
			this.setState({
				companyName: "",
				position: "",
				howLong: "",
				howManyYears: "",
				description: ""
			})
			alert("Successfully added job!")
		}).catch((err) => {
			console.log(err);
		})
		console.log(this.state);
	}
	render() {
		return (
			<View>

			{this.state.description && this.state.howLong && this.state.position && this.state.companyName && this.state.howManyYears ? <ElementButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.topBtn} 
				title="Submit Employment History"
			> </ElementButton> : null}
				<View style={styles.inputOne} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		companyName: value
		          	})
		          }}
		          label="Company name"
		          value={this.state.companyName}
		          placeholder='Please list a company name'
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
		          		position: value
		          	})
		          }}
		          label="Postion / Role"
		          value={this.state.postion}
		          placeholder='Please list your postion title or label'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
		      <View style={styles.inputTwo} >
		      <Text style={styles.label}>Please Select How Many Years You've Worked For This Comapny</Text>
		        <RNPickerSelect 
					style={styles.select}
		            onValueChange={(value) => {
		            	this.setState({
		            		howManyYears: value
		            	})
		            }}

		            items={[
		                { label: 'Under 3 Months', value: 'Under 3 Months' },
		                { label: '3-6 Months', value: '3-6 Months' },
		                { label: "6-12 Months", value: "6-12 Months" }, 
		                { label: "1-2 Years", value: "1-2 Years" },
		                { label: "2+ Years", value: "2+ Years"  }
		            ]}
		        />

		      </View>
		      <View style={styles.inputThree} >
		        <Text style={styles.label}>When Did You Leave This Job?</Text>
		        <RNPickerSelect 
					style={styles.select}
		            onValueChange={(value) => {
		            	this.setState({
		            		howLong: value
		            	})
		            }}
		            items={[
		                { label: '1999', value: '1999' },
		                { label: '2000', value: '2000' },
		                { label: '2001', value: '2001' },
		                { label: '2002', value: '2002' },
		                { label: '2003', value: '2003' },
		                { label: '2004', value: '2004' },
		                { label: '2005', value: '2005' },
		                { label: '2006', value: '2006' },
		                { label: '2007', value: '2007' },
		                { label: '2008', value: '2008' },
		                { label: '2009', value: '2009' },
		                { label: '2010', value: '2010' },
		                { label: '2011', value: '2011' },
						{ label: '2012', value: '2012' },
		                { label: '2013', value: '2013' },
		                { label: '2014', value: '2014' },
		                { label: '2015', value: '2015' },
		                { label: '2016', value: '2016' },
		                { label: '2017', value: '2017' },
		                { label: '2018', value: '2018' },
		                { label: '2019', value: '2019' },
		                { label: '2020', value: '2020' },

		            ]}
		        />

		      </View>
		      <View style={styles.inputFour} >
		        <Input 
		          onChangeText={(value) => {
		          	this.setState({
		          		description: value
		          	})
		          }}
		          label="What did you do there?"
		          value={this.state.description}
		          placeholder='Cleaned Kitchen, Installed pipes, Maintained Quality Control, etc..'
		          leftIcon={
		           {/* <Icon
		              name='user'
		              size={24}
		              color='black'
		            />*/}
		          }
		        />

		      </View>
			  {this.state.description && this.state.howLong && this.state.position && this.state.companyName && this.state.howManyYears ? <ElementButton onPress={()  => {
				this.handleSubmit()
			}}
				style={styles.bottomBtn} 
				title="Submit Employment History"
			> </ElementButton> : null}

			</View>
		);
	}
}

const styles = StyleSheet.create({
  inputOne: {
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "white"
  },
  inputTwo: {
    marginBottom: 20,
    backgroundColor: "white",
    paddingLeft: 13,
    paddingRight: 13
  },
  inputThree: {
    marginBottom: 20,
    backgroundColor: "white",
    paddingLeft: 13,
    paddingRight: 13
  },
  inputFour: {
    backgroundColor: "white",
    marginBottom: 50
  },
  btnView: {
    margin: 10
  },
  label: {
  	fontSize: 17,
  	marginLeft: 10
  },
  topBtn: {
  	marginTop: 30
  }
});

const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}


export default connect(mapStateToProps, {  })(JobHistoryHelper);