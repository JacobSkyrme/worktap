import firebaseClient from "firebase";
import "firebase/auth";


const CLIENT_CONFIG = {
  apiKey: "AIzaSyDkghzCTId_x9tqAcuJBBfkJCItzL5W1iE",
  authDomain: "worktap-7e14f.firebaseapp.com",
  databaseURL: "https://worktap-7e14f.firebaseio.com",
  projectId: "worktap-7e14f",
  storageBucket: "gs://worktap-7e14f.appspot.com/",
  messagingSenderId: "974788484331",
  appId: "1:974788484331:web:cec42e7a01cc012d94f2ae",
  measurementId: "G-H34FYYPJFC"
};


if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
    (window as any).firebase = firebaseClient;
}

export {
  firebaseClient
};