import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, logOut } from './logUserSlice'
import LogoutIcon from '@mui/icons-material/Logout';

export function LogUser() {
  const logUser = useSelector((state) => state.logUser.value)
  const dispatch = useDispatch()
  
  const getNewUser = async () => {
    try {
      const response = await fetch('http://localhost:8888/login')
      const jsonData = await response.json()
      dispatch(logIn(jsonData))
    
    } catch (e) {
      console.error(e.message)
    }
  }
 
  return (
    <div>
      <div>
      <span>{logUser.userid ? logUser.userid : ""}</span>
      {logUser.userid ?  <Link to="/login"><LogoutIcon onClick={() => dispatch(logOut({userid: '', displayName: 'Noone'}))}></LogoutIcon></Link> : ""}
      {!logUser.userid ? <Link to="/login"> Log In </Link> : ""}
        
      </div>
    </div>
  )
}

