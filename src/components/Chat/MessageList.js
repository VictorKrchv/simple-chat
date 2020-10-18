import React, { useState } from "react"
import { Message } from "./Message"
import { useStateValue } from "../../StateProvider"
import { toggleSelectMessage } from "../../reducer"

export const MessagesList = ({ messages }) => {
  const [{ user, selectedMessages }, dispatch] = useStateValue()

  const onSelect = messageId => {
    dispatch(toggleSelectMessage(messageId))
  }

  return (
    <div className="chat__body">
      {messages.map(message => (
        <Message
          isSelected={selectedMessages.some(id => id === message.id)}
          onClick={() => onSelect(message.id)}
          key={message.id}
          message={message}
          userId={user.uid}
        />
      ))}
    </div>
  )
}
