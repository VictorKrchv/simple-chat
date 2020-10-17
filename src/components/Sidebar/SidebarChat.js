import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@material-ui/core"
import { messagesApi, roomApi } from "../../api"
import "./sidebarChat.css"
import { useStateValue } from "../../StateProvider"

export const SidebarChat = ({ addNewChat, id, name, logo }) => {
  const [{ user }] = useStateValue()
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (id) {
      messagesApi
        .messagesInRoom(id)
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        )
    }
  }, [id])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")
    if (roomName) {
      roomApi.rooms().add({
        name: roomName,
        authorId: user.uid,
        logo: Math.floor(Math.random() * 5000)
      })
    }
  }
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${logo}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  )
}
