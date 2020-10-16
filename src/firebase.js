import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBqowIwuz2lk0im2EIVsW1tGGZJ8Xr-Kqg",
  authDomain: "whatsapp-c0dc8.firebaseapp.com",
  databaseURL: "https://whatsapp-c0dc8.firebaseio.com",
  projectId: "whatsapp-c0dc8",
  storageBucket: "whatsapp-c0dc8.appspot.com",
  messagingSenderId: "441473831979",
  appId: "1:441473831979:web:5f3379d23227f0cdcd866e",
  measurementId: "G-VSWVEGM5R1"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
