import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import './navbar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import {store} from '../app/store';
import {LogUser} from '../features/logUser/LogUser'
const state = store.getState();


const Navbar = (props) => {
const [sidebarState, setSidebarState] = useState(true)

  return (
    <>
    <div className="navbar">
        <div><MenuIcon onClick={()=>setSidebarState(!sidebarState)}/></div>
        <div><h1><Link to="/dashboard">お弁当注文</Link></h1></div>
        {/* {props.name !== undefined ? <div> {state.logUser.value.displayName}{' '}<LogoutIcon/>        </div>
          : <div>Not Logged</div>} */}
          <LogUser/>
    </div>
    

    <Sidebar ay={sidebarState}/>
    </>
  )
}

export default Navbar