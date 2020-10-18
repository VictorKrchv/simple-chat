import React from "react"

export const Message = ({ message, userId, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      key={message.uid}
      className={`chat__message ${isSelected ? "is-selected" : ""}`}
    >
      <div
        className={`chat__message-wrap ${
          message.uid === userId ? "chat__reciever" : ""
        }`}
      >
        <span className="chat__name">{message.name}</span>
        {message.message}
        <span className="chat__timestamp">
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
      </div>
    </div>
  )
}
