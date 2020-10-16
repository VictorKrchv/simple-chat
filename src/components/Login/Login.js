import React from "react"
import "./login.css"
import Button from "@material-ui/core/Button"
import { auth, provider } from "../../firebase"
import { useStateValue } from "../../StateProvider"
import { actionTypes } from "../../reducer"

export const Login = () => {
  const [state, dispatch] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch(error => alert(error.message))
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in with google</Button>
      </div>
    </div>
  )
}
