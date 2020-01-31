import React from "react";
import { StyleSheet, Text, View, ActivityIndicator,Image } from "react-native";
import firebase from "firebase";
import Fire from "../fire";

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App" : "Auth");
    });
  }
  render() {
    return (
      <View style={styles.a1}>
        <Image
          source={require("../assets/a1.png")}
        ></Image>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  a1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
