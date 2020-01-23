import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground, 
  Dimensions
} from 'react-native';
import { Button as ElementsButton, Input } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import IconThree from 'react-native-vector-icons/Entypo';
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import uuid from "react-uuid";
import SendBird from 'sendbird';

Icon.loadFont();
IconTwo.loadFont();
IconThree.loadFont();

const sb = new SendBird({ 'appId': 'F5880415-F353-4D16-9D7F-09A199DE2813' });

class SignUpView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      show: false,
      accountType: "",
      phoneNumber: "",
      page: 1,
      code: "",
      expectedCode: "",
      userId: "",
      nickname: "",
      error: ""
    }
  }
  renderSubmit = () => { 
    const generatedUUID = uuid().toString();

    if (this.state.code === this.state.expectedCode.toString()) {
      axios.post("http://172.31.99.114:5000/register", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
        accountType: this.state.accountType,
        userId: generatedUUID
      }).then((res) => {
        console.log("This is the response on the client side:", res.data);
        alert("Successfully Registered!")
      }).catch((err) => {
        alert(err);
        console.log("This is the error on the client side:" , err);
      })
      this.setState({
          nickname: this.state.firstName + " " + this.state.lastName,
          userId: generatedUUID,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          accountType: "",
          phoneNumber: "",
          page: 1
        }, () => {

          const { userId, nickname } = this.state;

          sb.connect(userId, (user, error) => {
            if (error) {
                console.log("There was an error");
                this.setState({ 
                  error 
                }, () => {
                  console.log(this.state.error)
                });
            } else {
              sb.updateCurrentUserInfo(nickname, null, (user, error) => {
                    if (error) {
                        console.log("There was an error inside the sendbird function");
                        this.setState({ 
                          error 
                        }, () => {
                          console.log(this.state.error)
                        });
                    } else {
                        this.setState({
                            userId: '',
                            nickname: '',
                            error: ''
                        }, () => {
                            this.props.navigation.navigate('Menu');
                            console.log("SUCCESSFULLY UPDATED USER DATA AND REGISTERED.")
                        });
                    };
                });
            }
        });
              
        });
    } else {
      alert("Code was invalid, please try again.");
    }
  }
  renderInitialMsg = () => {
    this.setState({
      page: 2
    });

    axios.post("http://172.31.99.114:5000/twillio", {
      phoneNumber: this.state.phoneNumber
    }).then((res) => {
      console.log(res.data);
      if (res.data.message === "Text message as been sent!") {
        alert("You should be receiving a text message shortly! Enter the code now.");
        this.setState({
          expectedCode: res.data.code
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  renderAuth = () => {
    if (this.state.page === 1) {
      return (
      <ImageBackground source={require("../../images/building-three.jpg")} style={styles.background} >
         {/* <Text style={styles.mainText}>Welcome to the sign-up page! We're happy to have you here.</Text>*/}
         <Text style={styles.label}>Sign-Up Today!</Text>
            <View>

            <View style={styles.inputOne} >
              <Input 
                onChangeText={(value) => {
                  this.setState({
                    firstName: value
                  })
                }}
                value={this.state.firstName}
                placeholder='Please enter your first name'
                leftIcon={
                  <Icon
                    name='user'
                    size={24}
                    color='black'
                  />
                }
              />

            </View>
            {/*<Text style={styles.textError}>{this.state.firstNameError}</Text>*/}
            <View style={styles.inputTwo}>
              <Input
                onChangeText={(value) => {
                  this.setState({
                    lastName: value
                })
              }}
              placeholder='Please enter your last name'
              value={this.state.lastName}
              leftIcon={
                <Icon
                  name='user'
                  size={24}
                  color='black'
                />
              }
            />
          </View>
           <View style={styles.inputTwo}>
            <Input
              onChangeText={(value) => {
                this.setState({
                  phoneNumber: value
                })
              }}
              placeholder='Please enter your phone number'
              value={this.state.phoneNumber}
              leftIcon={
                <Icon
                  name='phone'
                  size={24}
                  color='black'
                />
              }
            />
          </View>
          {/*<Text style={styles.textError}> {this.state.lastNameError} </Text>*/}
          <View style={styles.inputThree}>
            <Input
              onChangeText={(value) => {
                this.setState({
                  email: value
                })
              }} 
              value={this.state.email}
              placeholder="Please enter your email"
              leftIcon={
                <IconThree
                  name='email'
                  size={24}
                  color='black'
                />
              }
            />
          </View>
          {/*<Text style={styles.textError}> {this.state.emailError}</Text>*/}
          <View style={styles.inputFour} >
            <Input 
              onChangeText={(value) => {
                this.setState({
                  password: value
                })
              }}
              secureTextEntry={!this.state.show ? true : false}
              value={this.state.password.toString()}
              placeholder='Please enter your password'
              leftIcon={
                <IconTwo 
                  onPress={() => {
                    this.setState({
                      show: !this.state.show
                    })
                  }}
                  name='onepassword'
                  size={24}
                  color='black' 

                />
              }
            />
          </View>
        <Text style={styles.label}>Choose wether you're a worker or employer</Text>
          <View style={styles.turnBack}>
          <RNPickerSelect 
                    onValueChange={(value) => {
                      this.setState({
                        accountType: value
                      })
                    }}
                    items={[
                      { label: "I am a WORKER", value: "EMPLOYEE" },
                      { label: 'I am an EMPLOYER', value: 'EMPLOYER' }
                    ]}
                />
          </View>
         {/* <Text style={styles.textError}>{this.state.passwordError}</Text>*/}
          
          </View>
          <View style={styles.btnView}>
            {this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.accountType ? <ElementsButton 
              onPress={() => {
                this.renderInitialMsg()
              }}
              title="Submit Credentials" 
              style={styles.submitBtn}
            >

            </ElementsButton> : null}
          </View>
        </ImageBackground>
      );
    } else {
        return (
          <ImageBackground source={require("../../images/building-three.jpg")} style={styles.background} >
           {/* <Text style={styles.mainText}>Welcome to the sign-up page! We're happy to have you here.</Text>*/}
           <Text style={styles.label}>Enter your authentication code...</Text>
              <View>

              <View style={styles.inputOne} >
                <Input 
                  onChangeText={(value) => {
                    this.setState({
                      code: value
                    })
                  }}
                  value={this.state.code}
                  placeholder='Please enter your validation code'
                  leftIcon={
                    <Icon
                      name='code'
                      size={24}
                      color='black'
                    />
                  }
                />

              </View>
              {/*<Text style={styles.textError}>{this.state.firstNameError}</Text>*/}
   
           {/* <Text style={styles.textError}>{this.state.passwordError}</Text>*/}
            
            </View>
            <View style={styles.btnView}>
              {this.state.firstName && this.state.lastName && this.state.email && this.state.password && this.state.accountType ? <ElementsButton 
                onPress={() => {
                  this.renderSubmit()
                }}
                title="Submit Credentials" 
                style={styles.submitBtn}
              >

              </ElementsButton> : null}
            </View>
          </ImageBackground>
        );
    }
  }
  render() {
    return (
      <View>
        {this.renderAuth()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainText: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 30,
    fontWeight: "bold",
    color: "white"
  },
  textError: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 7
  },
  turnBack: {
    backgroundColor: "white",
    minHeight: 33,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    height: 33
  },
  background: {
    flex: 1,
    minHeight: "100%",
    height: "100%",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  inputOne: {
    marginBottom: 20,
    backgroundColor: "white"
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
    fontSize: 20,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});


export default SignUpView;