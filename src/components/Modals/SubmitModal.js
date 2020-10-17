import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import "./SubmitModal.css"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

export default function SubmitModal({ trigger: Trigger, title, onSubmit }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    onSubmit()
    setOpen(false)
  }

  return (
    <div>
      <div onClick={() => handleOpen()}>
        <Trigger />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">{title}</h3>
            <div className="modal-btn">
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Да
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Нет
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
