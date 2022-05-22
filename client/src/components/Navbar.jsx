import React, {useState} from 'react'
import './navbar.css'
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
        {props.name !== undefined ?
        <div>
          {props.name.displayName}{' '}<LogoutIcon/>
          </div>
          : <div>Not Logged</div>}
    </div>

    <Sidebar ay={sidebarState}/>
    </>
  )
}

export default Navbar