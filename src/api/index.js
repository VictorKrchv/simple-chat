import { auth, db } from "../base"
import * as firebase from "firebase"

export const roomApi = {
  rooms() {
    return db.collection("rooms")
  },
  roomById(roomId) {
    return db.collection("rooms").doc(roomId)
  }
}

export const messagesApi = {
  messagesInRoom(roomId) {
    return db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  },
  addMessage({ roomId, message, user }) {
    return db.collection("rooms").doc(roomId).collection("messages").add({
      message,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }
}

export const authApi = {
  loginWithGoogle() {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  logout() {
    return auth.signOut()
  },
  loginWithToken() {
    return auth.to
  }
}
