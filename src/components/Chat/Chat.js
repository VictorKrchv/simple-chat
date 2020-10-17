import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useStateValue } from "../../StateProvider"
import "./chat.css"
import { messagesApi, roomApi } from "../../api"
import { Message } from "./Message"
import { ChatForm } from "./ChatForm"
import { ChatHeader } from "./ChatHeader"

export const Chat = () => {
  const { roomId } = useParams()
  const history = useHistory()
  const [{ user }] = useStateValue()
  const [room, setRoom] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (roomId) {
      roomApi.roomById(roomId).onSnapshot(snapshot => {
        const data = snapshot.data()
        if (data) {
          setRoom(data)
        } else {
          return history.push("/rooms")
        }
      })
      messagesApi
        .messagesInRoom(roomId)
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        )
    } else {
      setMessages([])
      setRoom(null)
    }
  }, [roomId])

  return (
    <div className="chat">
      {room && (
        <ChatHeader
          roomName={room?.name}
          logo={room?.logo}
          timestamp={messages[messages.length - 1]?.timestamp}
          authorId={room?.authorId}
          roomId={roomId}
        />
      )}
      <div className="chat__body">
        {messages.map(message => (
          <Message
            key={message.timestamp}
            message={message}
            userId={user.uid}
          />
        ))}
      </div>
      {room && <ChatForm roomId={roomId} user={user} />}
    </div>
  )
}
