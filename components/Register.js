import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import * as firebase from 'firebase';
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../fire";

export default class Register extends React.Component {


    state = {
        user: {
            name: "",
            email: "",
            password: "",
            avatar: null
        },
        error: null,
        isLoading: false
    };

    handleSignUp = () => {
       console.log("signed up");
        Fire.shared.createUser(this.state.user);
    };

    handlePickAvatar = async () => {
       
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user: { ...this.state.user, avatar: result.uri } });
        }
    };
  render() {
    return (
      <View style={styles.a1}>
      <ScrollView contentContainerStyle={styles.contentContainer}>    
        <View style={{  alignItems: "center", width: "100%" }}>
        <Text style={styles.a2}>{`Sign up to get Start`}</Text>
                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
                        <Ionicons
                            name="md-add"
                            size={40}
                            color="#FFF"
                            style={{ marginTop: 6, marginLeft: 2 }}
                        ></Ionicons>
                    </TouchableOpacity>
                </View>


        <View style={styles.e1}>
          {this.state.error && (
            <Text style={{ color: "red", fontSize: 15 }}>
              {this.state.error}
            </Text>
          )}
        </View>

        <View style={styles.f1}>
        <View>
            <Text style={styles.t1}>Full Name:</Text>
            <TextInput
              style={styles.i1}
              autoCapitalize="none"
              onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
              value={this.state.user.name}
            ></TextInput>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.t1}>Email:</Text>
            <TextInput
              style={styles.i1}
              autoCapitalize="none"
              onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
              value={this.state.user.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.t1}>Password:</Text>
            <TextInput
              style={styles.i1}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
              value={this.state.user.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.b1} onPress={this.handleSignUp}>
          <Text style={styles.bt2}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.n2}>
            Already have an Account?
            <Text style={{ fontWeight: "400", color: "blue" }}> Login</Text>
          </Text>
        </TouchableOpacity>
        </ScrollView>     
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
    textAlign: "center",
    marginTop: 34,
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
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center"
},
avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50
},
contentContainer: {
  paddingBottom: 20
}
});
