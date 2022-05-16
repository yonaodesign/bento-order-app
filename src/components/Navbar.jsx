import React from 'react'
import './navbar.css'

const Navbar = (props) => {
  return (
    <div className="navbar">
        <div>Menu</div>
        <div>Logo</div>
        <div>{props.name}</div>
    </div>
  )
}

export default Navbar