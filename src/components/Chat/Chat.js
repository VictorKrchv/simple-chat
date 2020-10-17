import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Avatar, IconButton } from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { InsertEmoticon, Mic } from "@material-ui/icons"
import { useStateValue } from "../../StateProvider"
import "./chat.css"
import { messagesApi, roomApi } from "../../api"

export const Chat = () => {
  const { roomId } = useParams()
  const history = useHistory()
  const [{ user }] = useStateValue()
  const [seed, setSeed] = useState(0)
  const [input, setInput] = useState("")
  const [roomName, setRoomName] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (roomId) {
      roomApi.roomById(roomId).onSnapshot(snapshot => {
        const data = snapshot.data()
        if (data) {
          setRoomName(data.name)
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
      setInput("")
      setRoomName("")
      setSeed(0)
    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    messagesApi.addMessage({ roomId, user, message: input })
    setInput("")
  }

  return (
    <div className="chat">
      {roomName && (
        <div className="chat__header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>
              Last seen an{" "}
              {messages[messages.length - 1]?.timestamp &&
                new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
            </p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <DonutLargeIcon />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      )}
      <div className="chat__body">
        {messages.map((message, idx) => (
          <p
            key={idx}
            className={`chat__message ${
              message.uid === user.uid && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {roomName && (
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
          </form>
          <Mic />
        </div>
      )}
    </div>
  )
}
