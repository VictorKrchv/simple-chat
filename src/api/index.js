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
      uid: user.uid,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  },
  deleteMessages(roomId, messages) {
    const messagesDb = db.collection("rooms").doc(roomId).collection("messages")
    let requests = messages.map(message => messagesDb.doc(message).delete())
    return Promise.all(requests)
  }
}

export const authApi = {
  loginWithGoogle() {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  loginWithFacebook() {
    return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  },
  logout() {
    return auth.signOut()
  }
}
