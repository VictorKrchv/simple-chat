import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useStateValue } from "../../StateProvider"
import "./chat.css"
import { messagesApi, roomApi } from "../../api"
import { ChatForm } from "./ChatForm"
import { ChatHeader } from "./ChatHeader"
import { MessagesList } from "./MessageList"

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
      messagesApi.messagesInRoom(roomId).onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        )
      )
    } else {
      setMessages([])
      setRoom(null)
    }
  }, [roomId, history])

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
      {<MessagesList messages={messages} />}
      {room && <ChatForm roomId={roomId} user={user} />}
    </div>
  )
}
