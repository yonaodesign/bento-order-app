import React, {Fragment, useState} from 'react'
import './navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const Navbar = (props) => {
const [sidebarState, setSidebarState] = useState(true)

  return (
    <>
    <div className="navbar">
        <div><MenuIcon onClick={()=>setSidebarState(!sidebarState)}/></div>
        <div><h1>お弁当注文</h1></div>
        <div>{props.name.displayName}{'　'}<LogoutIcon/></div>
    </div>

    <Sidebar ay={sidebarState}/>
    </>
  )
}

export default Navbar