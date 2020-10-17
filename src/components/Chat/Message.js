import React, { useState } from "react"

export const Message = ({ message, userId }) => {
  return (
    <p
      key={message.uid}
      className={`chat__message ${message.uid === userId && "chat__reciever"}`}
    >
      <span className="chat__name">{message.name}</span>
      {message.message}
      <span className="chat__timestamp">
        {new Date(message.timestamp?.toDate()).toUTCString()}
      </span>
    </p>
  )
}
