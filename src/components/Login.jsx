import React from 'react'
import Navbar from './Navbar'

const Login = () => {
  return (
    <div>
      <Navbar/>
        <div className="loginWrapper">
          <img src="#"></img>
          <p>Login with a RFID card.</p>
          <p>Or login with your <u>employee number and birthday.<u/></p>
        </div>
    </div>
  )
}

export default Login