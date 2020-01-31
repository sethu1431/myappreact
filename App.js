import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebasekey from './config'
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import Loading from "./components/Loading";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PostScreen from "./components/PostScreen";
import Profile from "./components/Profile";
import * as firebase from "firebase";
import Fire from "./fire";

if (!firebase.apps.length) {
  firebase.initializeApp(firebasekey);
  }

const AppContainer = createStackNavigator({
  default: createBottomTabNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-home" size={25} color={tintColor} />
          )
        }
      },
      Post: {
        screen: PostScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons
              name="md-add-circle"
              size={40}
              color={tintColor}
              style={{
                shadowColor: "blue",
                shadowOffset: { width: 20, height: 20 },
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            />
          )
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-person" size={25} color={tintColor} />        )
        }
      }
    },
    {
       defaultNavigationOptions: {
         tabBarOnPress: ({navigation, defaultHandler}) => {
           if(navigation.state.key == "Post"){
             navigation.navigate("PostModal")
           } else {
             defaultHandler()
           }
         }
       },
      tabBarOptions: {
        activeTintColor: '#161F3D',
        inactiveTintColor:"#B8BBC4",
        showLabel: false
      }
    }
  ),
 
  PostModal: {
    screen: PostScreen
  }
},
{
  mode: "modal",
  headerMode: "none",
})

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
 