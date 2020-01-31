import React from "react";
import { View, Text, StyleSheet, Image,FlatList, TouchableOpacity,ActivityIndicator,ScrollView} from "react-native";
import Fire from "../fire";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class ProfileScreen extends React.Component {
  constructor(props) {
    console.ignoredYellowBox = [
      'Setting a timer'
      ];    
    super(props);
    this.state = {
      user:{},
      posts: [
        {
          name: "Loading...",
          text:"",
          timestamp: false,
          avatar: null,
          image: null
        }
      ]
    };
  }
   feed = () => {
    var db = Fire.shared.firestore.collection("posts").where("uid", "==", Fire.shared.uid).get();
    db.then(snapShot => {
      var feed = [];
      snapShot.forEach(doc => {
        feed.push(doc.data());
      });
      this.setState({ posts: feed });
    });

   }
  unsubscribe = null;
   deleteHandle = (refid) =>{
       Fire.shared.firestore.collection("posts").doc(refid).delete();
      this.feed()
   }
  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;
    try{
      this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
    }catch(error){
      null
    }
      this.feed()
      if(this.props.navigation){
        this.props.navigation.addListener(
          'willFocus',
          ()=>{
           this.feed()
          }
        )
      }
  }

  componentWillUnmount(){
    this.unsubscribe();
    console.log('====================================');
    console.log("logs");
    console.log('====================================');
  }

  renderPost = post => {
    return (
   
      <View style={styles.feedItem}>
        <Image
              source={
                this.state.user.avatar
                  ? { uri: this.state.user.avatar }
                  : require("../assets/a1.png")
              }
              style={styles.avatar}
            />    
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                { post.timestamp ? moment(post.timestamp).fromNow()  : null }
              </Text>
            </View>
            
            <TouchableOpacity onPress={() => { this.deleteHandle(post.ref)}}>
            <Ionicons name="md-delete" size={24} color="#73788B"  />
             </TouchableOpacity>
          </View>
             <Text style={styles.post}>{post.text}</Text>
            <Image source={post.image ? {uri:post.image} : null} style={styles.postImage} resizeMode="cover"/>
        </View>
      </View>

    );
  };
  render() {
    return (
     
      <View style={styles.container}>
        <View style={{  marginTop: 50,alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                this.state.user.avatar
                  ? { uri: this.state.user.avatar }
                  : require("../assets/a1.png")
              }
              style={styles.pavatar}
            />
          </View>

          <Text style={styles.pname}>
            {this.state.user.name ? this.state.user.name : "Loading..."}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
           <Text style={styles.statAmount}>{this.state.posts.length ? this.state.posts.length : "0"}</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
        </View>
          {this.state.user.name ?<TouchableOpacity
          style={styles.b1}
          onPress={() => {
            Fire.shared.signOut();
          }}
        >
          <Text style={styles.bt2}>Logout</Text>
        </TouchableOpacity> : <ActivityIndicator></ActivityIndicator>}
        <FlatList
          style={styles.feed}
          data={this.state.posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.image}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  pavatar: {
    width: 126,
    height: 126,
    borderRadius: 68
  },
  pname: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  b1: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    height: 50,
    borderRadius: 4,
    marginHorizontal: 30
  },
  bt2: {
    fontSize: 18,
    color: "white",
    fontWeight: "400"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32
  },
  stat: {
    alignItems: "center",
    flex: 1
  },
  statAmount: {
    color: "#4F566D",
    fontSize: 18,
    fontWeight: "300"
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
