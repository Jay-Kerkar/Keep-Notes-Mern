import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert'

function App() {
  const [alert, setAlert] = useState("")
  const displayAlert = (message, type) => {
    setAlert({
      alertMessage: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar displayAlert={displayAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home displayAlert={displayAlert} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/signin" element={<SignIn displayAlert={displayAlert} />} />
          <Route exact path="/signup" element={<SignUp displayAlert={displayAlert} />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  )
}

export default App
