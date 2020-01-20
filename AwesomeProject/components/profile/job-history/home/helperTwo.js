import React, { Component } from 'react';
import { View, Text as NativeText, Button, StyleSheet } from "react-native";
import { Button as ElementButton, Input } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { connect } from "react-redux";
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button as BaseButton } from 'native-base';


class JobHistoryHelperTwo extends Component {
constructor () {
	super();

	this.state = {
		data: []
	}
}
	componentDidMount () {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/employment/gather/history", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err);
		})
	}
	reRender = () => {
		axios.post("https://txjqlz5f4f.execute-api.us-east-1.amazonaws.com/latest/employment/gather/history", {
			email: this.props.email
		}).then((res) => {
			this.setState({
				data: res.data
			})
		}).catch((err) => {
			console.log(err);
		})	
	}
	renderAPICall = () => {
		if (this.state.data !== []) {
			return this.state.data.map((item, index) => {
				if (item.jobHistory) {
					return item.jobHistory.map((itemTwo, indexTwo) => {
						const element = itemTwo;
						console.log("Itemtwo :", itemTwo)
						return (
					      <Container style={{ maxHeight: "100%", height: "100%" }}> 
					        <Content>
					          <List>
					            <ListItem thumbnail>
					             
					              <Body>
					                <Text>Company Name : {element.companyName}</Text>
					                <Text>Job Description : {element.description}</Text>
					                <Text>Year - Left Job : {element.howLong}</Text>
					                <Text>How Many Years: {element.howManyYears}</Text>
					                <Text>Position/Title: {element.position}</Text>
					              </Body>
					              <Right>
					                <BaseButton transparent>
					                  <Text>View</Text>
					                </BaseButton>
					              </Right>
					            </ListItem>
					          </List>
					        </Content>
					      </Container>
						);
					})
				}
				// return item.jobHistory.map((itemTwo, indexTwo) => {
				// 	const element = itemTwo;
				// 	console.log(itemTwo)
				// 	return (
				//       <Container style={{ maxHeight: "100%", height: "100%" }}> 
				//         <Content>
				//           <List>
				//             <ListItem thumbnail>
				             
				//               <Body>
				//                 <Text>Company Name : {element.companyName}</Text>
				//                 <Text>Job Description : {element.description}</Text>
				//                 <Text>Year - Left Job : {element.howLong}</Text>
				//                 <Text>How Many Years: {element.howManyYears}</Text>
				//                 <Text>Position/Title: {element.position}</Text>
				//               </Body>
				//               <Right>
				//                 <BaseButton transparent>
				//                   <Text>View</Text>
				//                 </BaseButton>
				//               </Right>
				//             </ListItem>
				//           </List>
				//         </Content>
				//       </Container>
				// 	);
				// })
			})
		}
	}
						
	render() {
		return (
			<View>
				<ElementButton title="View Your Employment History" onPress={() => {
					this.reRender()
				}}> </ElementButton>
				{this.renderAPICall()}
			</View>
		);
	}
}


const styles = StyleSheet.create({

});



const mapStateToProps = (state) => {
	return {
		email: state.userData.data.email
	}
}
export default connect(mapStateToProps, {  })(JobHistoryHelperTwo);