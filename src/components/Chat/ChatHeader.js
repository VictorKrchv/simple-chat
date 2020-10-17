import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Avatar, IconButton } from "@material-ui/core"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import makeStyles from "@material-ui/core/styles/makeStyles"
import { useStateValue } from "../../StateProvider"
import { roomApi } from "../../api"
import SubmitModal from "../Modals/SubmitModal"

export const ChatHeader = ({ timestamp, logo, roomName, authorId, roomId }) => {
  const [{ user }] = useStateValue()
  const history = useHistory()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    history.push("/rooms")
    roomApi.roomById(roomId).delete()
  }

  return (
    <div className="chat__header">
      <Avatar src={`https://avatars.dicebear.com/api/human/${logo}.svg`} />
      <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        {timestamp ? (
          <p>
            Last seen an
            {new Date(timestamp.toDate()).toUTCString()}
          </p>
        ) : null}
      </div>
      <div className="chat__headerRight">
        <IconButton>
          <DonutLargeIcon />
        </IconButton>
        <IconButton>
          <ChatIcon />
        </IconButton>
        {authorId === user.uid && (
          <div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              className={classes.menu}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Edit chat</MenuItem>
              <SubmitModal
                trigger={() => (
                  <MenuItem onClick={handleClose}>Delete chat</MenuItem>
                )}
                title="Вы действительно хотите удалить комнату?"
                onSubmit={() => handleDelete()}
              />
            </Menu>
          </div>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  menu: {
    marginTop: "50px"
  }
}))
