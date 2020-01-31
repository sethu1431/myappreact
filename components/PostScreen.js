import React from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlightBase,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../fire";
import * as ImagePicker from "expo-image-picker";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";
import "firebase/firestore";

export default class PostScreen extends React.Component {
  state = {
    text: "",
    image: null,
    user: [],
    isLoading: true
  };

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handlePost = () => {
    this.setState({isLoading:false})
    Fire.shared
      .addPost({
        text: this.state.text.trim(),
        name: this.state.user.name,
        pimage: this.state.user.avatar,
        localUri: this.state.image
      })
      .then(ref => {
        console.log("finished");
        alert("your post uploaded");
        this.setState({ text: "", image: null });
        this.props.navigation.dispatch(NavigationActions.back());
      })
      .catch(error => {
        alert("error occerd")
      });
  };

  pickimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.a1}>
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.a2}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          >
            <Ionicons name="md-arrow-back" size={24} color="#DBD9D8" />
          </TouchableOpacity>
           
           {this.state.isLoading ?<TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: "400" }}>Post</Text>
          </TouchableOpacity> : <ActivityIndicator size="small"></ActivityIndicator> }

          
          
        </View>

        <View style={styles.a3}>
          <Image
            source={
              this.state.user.avatar
                ? { uri: this.state.user.avatar }
                : require("../assets/authHeader.png")
            }
            style={styles.a4}
          ></Image>

          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={3}
            style={{ flex: 1 }}
            placeholder="Write about Something..."
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.a5} onPress={this.pickimage}>
          <Ionicons name="md-camera" size={32} color="#D8D9D8" />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 32, marginTop: 32, height: 300 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  a1: {
    flex: 1
  },
  a2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9D8"
  },
  a3: {
    margin: 32,
    flexDirection: "row"
  },
  a4: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  a5: {
    alignItems: "flex-end",
    marginHorizontal: 32
  }
});
