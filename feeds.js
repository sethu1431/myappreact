class Feed {
    
    feed = () => {
        console.log('====================================');
        console.log("home mounted");
        console.log('====================================');
          Fire.shared.firestore
            .collection("posts")
            .get()
            .then(snapshot => {
              const posts = [];
              snapshot.forEach(doc => {
                posts.push({
                  avatar: doc.data().pimage,
                  name: doc.data().name,
                  text: doc.data().text,
                  timestamp: doc.data().timestamp,
                  image: doc.data().image,
                });
              });
              this.setState({ posts });
            });
        }
}

Feed.shared = new Feed()
export default Feed;