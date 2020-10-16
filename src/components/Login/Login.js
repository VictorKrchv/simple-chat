import React from "react"
import "./login.css"
import Button from "@material-ui/core/Button"
import { useStateValue } from "../../StateProvider"
import { setCurrentUser } from "../../reducer"
import { authApi } from "../../api"

export const Login = () => {
  const [state, dispatch] = useStateValue()

  const signIn = () => {
    authApi
      .loginWithGoogle()
      .then(result => dispatch(setCurrentUser(result.user)))
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
