import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@material-ui/core"
import "./sidebarChat.css"
import { messagesApi, roomApi } from "../../api"

export const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState(0)
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

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")
    if (roomName) {
      roomApi.rooms().add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
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
