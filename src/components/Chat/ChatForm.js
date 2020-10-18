import React, { useState } from "react"
import { InsertEmoticon, Mic } from "@material-ui/icons"
import { messagesApi } from "../../api"

export const ChatForm = ({ roomId, user }) => {
  const [input, setInput] = useState("")

  const sendMessage = e => {
    e.preventDefault()
    if (input === "") return
    messagesApi.addMessage({ roomId, user, message: input })
    setInput("")
  }

  return (
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
  )
}
