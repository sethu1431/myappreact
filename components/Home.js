import React from "react";
import { View, Text, StyleSheet, Image, FlatList,StatusBar } from "react-native";
import moment from "moment";
import Fire from "../fire";
import { AppLoading } from "expo";

export default class HomeScreen extends React.Component {
  constructor(props) {
    console.ignoredYellowBox = [
      'Setting a timer'
      ];    
    super(props);
    this.state = {
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
    var db = Fire.shared.firestore.collection("posts").get();
    db.then(snapShot => {
      var feed = [];
      snapShot.forEach(doc => {
        feed.push(doc.data());
      });
      this.setState({ posts: feed });
    });
   }
  componentDidMount(props) {
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
  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.pimage ? {uri:post.pimage} : require("../assets/a1.png")} style={styles.avatar} />        
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
        <StatusBar barStyle="dark-content"></StatusBar>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
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
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 55,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
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
