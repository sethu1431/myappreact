import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator
} from "react-native";
import * as firebase from "firebase";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    Email: "",
    Password: "",
    error: null,
    isLoading: true
  };

  handleLogin = () => {
    this.setState({ isLoading: false });
    const { Email, Password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(Email, Password)
      .catch(error => this.setState({ error: error.message, isLoading: true }));
  };
  render() {
    return (
      <View style={styles.a1}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <Image
          source={require("../assets/a1.png")}
          style={{ marginTop: 15, alignSelf: "center" }}
        ></Image>
        <Text style={styles.a2}>{`Welcome To \n new fed`}</Text>
        <View style={styles.e1}>
          {this.state.error && (
            <Text style={{ color: "red", fontSize: 15 }}>
              {this.state.error}
            </Text>
          )}
        </View>

        <View style={styles.f1}>
          <View>
            <Text style={styles.t1}>Email:</Text>
            <TextInput
              style={styles.i1}
              autoCapitalize="none"
              onChangeText={Email => this.setState({ Email })}
              value={this.state.Email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.t1}>Password:</Text>
            <TextInput
              style={styles.i1}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={Password => this.setState({ Password })}
              value={this.setState.Password}
            ></TextInput>
          </View>
        </View>

        {this.state.isLoading ? (
          <TouchableOpacity style={styles.b1} onPress={this.handleLogin}>
            <Text style={styles.bt2}>Login</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="large"></ActivityIndicator>
        )}

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.n2}>
            Not an User?
            <Text style={{ fontWeight: "400", color: "blue" }}>  Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  a1: {
    flex: 1
  },
  a2: {
    fontWeight: "bold",
    fontFamily: "",
    textAlign: "center",
    marginTop: 24,
    fontSize: 20
  },
  e1: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 20,
    marginVertical: 9
  },
  f1: {
    marginBottom: 45,
    marginHorizontal: 30
  },
  t1: {
    color: "#8A8F9E",
    fontSize: 17,
    textTransform: "uppercase"
  },
  i1: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "black"
  },
  b1: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: 52,
    borderRadius: 4,
    marginHorizontal: 30
  },
  bt2: {
    fontSize: 18,
    color: "white",
    fontWeight: "400"
  },
  n2: {
    color: "black",
    fontWeight: "300",
    fontSize: 13,
    paddingTop: 20
  }
});
