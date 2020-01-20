// import firebase from 'firebase';

// class Fire {
//     constructor () {
//         this.init();
//         this.observeAuth();
//     }

//     init = () => {
//         if (!firebase.apps.length) {
//             firebase.initializeApp({
//                 apiKey: "AIzaSyBlh-I6OJHi9vrzU6F4n-bGHsZoQLQTfeA",
//                 authDomain: "bluecollarworker-1571279478394.firebaseapp.com",
//                 databaseURL: "https://bluecollarworker-1571279478394.firebaseio.com",
//                 projectId: "bluecollarworker-1571279478394",
//                 storageBucket: "bluecollarworker-1571279478394.appspot.com",
//                 messagingSenderId: "310760655841",
//                 appId: "1:310760655841:web:99fae4ddf17f5e338420a0",
//                 measurementId: "G-4F6L5W2NF1"
//             })
//         }
//     }
//     // const config = {
//     //     apiKey: "AIzaSyBlh-I6OJHi9vrzU6F4n-bGHsZoQLQTfeA",
//     //     authDomain: "bluecollarworker-1571279478394.firebaseapp.com",
//     //     databaseURL: "https://bluecollarworker-1571279478394.firebaseio.com",
//     //     projectId: "bluecollarworker-1571279478394",
//     //     storageBucket: "bluecollarworker-1571279478394.appspot.com",
//     //     messagingSenderId: "310760655841",
//     //     appId: "1:310760655841:web:99fae4ddf17f5e338420a0",
//     //     measurementId: "G-4F6L5W2NF1"
//     // };
//     observeAuth = () => {
//         firebase.auth().onAuthStateChanged(this.onAuthStateChanged) 
//     }

//     onAuthStateChanged = (user) => {
//         if (!user) {
//             try {
//                 firebase.auth().signInAnnoymously();
//             } catch ({ message }) {
//                 alert(message);
//             }
//         }
//     }
//       get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }

//   get ref() {
//     return firebase.database().ref('messages');
//   }

//   parse = snapshot => {
//     const { timestamp: numberStamp, text, user } = snapshot.val();
//     const { key: _id } = snapshot;
//     const timestamp = new Date(numberStamp);
//     const message = {
//       _id,
//       timestamp,
//       text,
//       user,
//     };
//     return message;
//   };

//   on = callback =>
//     this.ref
//       .limitToLast(20)
//       .on('child_added', snapshot => callback(this.parse(snapshot)));

//   get timestamp() {
//     return firebase.database.ServerValue.TIMESTAMP;
//   }
//   // send the message to the Backend
//   send = messages => {
//     for (let i = 0; i < messages.length; i++) {
//       const { text, user } = messages[i];
//       const message = {
//         text,
//         user,
//         timestamp: this.timestamp,
//       };
//       this.append(message);
//     }
//   };

//   append = message => this.ref.push(message);

//   // close the connection to the Backend
//   off() {
//     this.ref.off();
//   }
// }

// Fire.shared = new Fire();
// export default Fire;
