import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import Home from "./components/homepage/home.js";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Contact from "./components/contact/contact.js";
import SignIn from "./components/login/index.js";
import Signup from "./components/signup/index.js";
import Navbar from "./components/universal/slide-out-menu.js";
import ProfileHome from "./components/profile/main/index.js";
import JobsHome from "./components/job-postings/jobs-home/index.js";
import AboutMeSection from "./components/profile/helpers/about.js";
import SecurityHome from "./components/profile/security-page/home/index.js";
import JobHistoryHome from "./components/profile/job-history/home/index.js";
import JobsCreate from "./components/job-postings/create/index.js";
import SignupBusinessAccount from "./components/job-postings/signup/home/index.js";
import PostedJobsHome from "./components/view-jobs/home/index.js";
import ViewIndividualJob from "./components/view-jobs/view-individual/index.js";
import MainMap from "./components/maps/main-map/index.js";
import StartIndividualConvo from "./components/messages/singleViewStart/startConvo.js";
import MessagesHome from "./components/messages/home/index.js";
import Individual from "./components/messages/individual/index.js";
import ModalMap from "./components/maps/main-map/modalMap.js";


const AppNavigator = createDrawerNavigator({
  home: {
    screen: Home
  },
  contact: {
    screen: Contact
  },
  login: {
    screen: SignIn
  },
  register: {
    screen: Signup
  },
  profile: {
    screen: ProfileHome
  },
  jobs: {
    screen: JobsHome
  },
  job_history: {
    screen: JobHistoryHome
  },
  job_create: {
    screen: JobsCreate
  },
  signup_business_account: {
    screen: SignupBusinessAccount
  },
  profile_about: {
    screen: AboutMeSection
  },
  profile_security: {
    screen: SecurityHome
  },
  jobs_list: {
    screen: PostedJobsHome
  },
  job_individual: {
    screen: ViewIndividualJob
  },
  main_map: {
    screen: MainMap
  },
  message_start: {
    screen: StartIndividualConvo
  },
  messages_home: {
    screen: MessagesHome
  },
  chat_individual: {
    screen: Individual
  },
  modal_map: {
    screen: ModalMap
  }
});

const App = createAppContainer(AppNavigator);

export default App;

