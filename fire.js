import firebasekey from './config'
import firebase from 'firebase'

class Fire {
    constructor() {
        firebase.initializeApp(firebasekey);
    }
      
    addPost = async({text,name,pimage, localUri}) => {
        var remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}.jpg`);
          return new Promise((res, rej) => {
            this.firestore.collection("posts").add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
                name: name,
                pimage: pimage,
                ref: null
            })
            .then(ref => {
                res(ref)
                 this.firestore.collection("posts").doc(ref.id).set({ref: ref.id}, {merge: true})
                console.log('Added document with ID: ', ref.id);
            })
            .catch(error => {
                rej(error)
            })
        })
    }
     


    uploadPhotoAsync = async (uri,path) => {
        return new Promise(async (res,rej) => {
            const response = await fetch(uri);
            const file = await response.blob();
            console.log('====================================');
            console.log("image upoloaded");
            console.log('====================================');
            let upload = firebase 
            .storage()
            .ref(path)
            .put(file)

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url)
                }
            );
        })
    }
    
    createUser = async user => {
        let remoteUri = null;
        console.log("entered");
        var err = "";
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(error => err = error.message);
            console.log("entered2");
            let db = this.firestore.collection("users").doc(this.uid);
            db.set({
                name: user.name,
                email: user.email,
                avatar: null,
                uid: this.uid
                
            });
            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

                db.set({ avatar: remoteUri }, { merge: true });
            }
        }catch(error) {
            alert(err)
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    };


    get firestore(){
        return firebase.firestore();
    }
    get uid(){
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp(){
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;