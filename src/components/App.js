import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "../components/Login"
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <Router>
        <AuthProvider>
          <Switch>
          <Route path="/chats" component={Chats} />
          <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
