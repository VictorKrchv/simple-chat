import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Chat } from "./components/Chat/Chat"
import { Login } from "./components/Login/Login"
import { useStateValue } from "./StateProvider"
import { auth } from "./base"
import { setCurrentUser } from "./reducer"
import "./App.css"
import CircularProgress from "@material-ui/core/CircularProgress"

function App() {
  const [{ user }, dispatch] = useStateValue()
  const [pending, setPending] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      dispatch(setCurrentUser(user))
      setPending(false)
    })
  }, [])

  return (
    <div className="app">
      {pending ? (
        <CircularProgress />
      ) : !user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
