import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import rfidImg from '../rfid.png';
import styled from 'styled-components';

import {logUser, logIn } from "../features/logUser/logUserSlice"
import {store} from '../app/store';
const state = store.getState();


const Login = () => {

  const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  text-align: center;
  `

  const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `

  const RfidImg = styled.img`
  object-fit: contain;
  width: 200px;
  margin: 30px;`

  const [bufferUser, setBufferUser] = useState("Not Auth")

  const getBufferedUsed = async () => {
    try {
      const response = await fetch('http://localhost:8888/login')
      const jsonData = await response.json()
  
      setBufferUser(jsonData.userid)
    } catch (e) {
      console.error(e.message)
    }
  }
  useEffect(() => {
    getBufferedUsed();
  }, []);



  return (
    <div>
      <Navbar/>

      <Wrapper>
        <TextWrapper>          
          
          <RfidImg src={rfidImg}/>
          <Link to="/dashboard" onClick={()=> store.dispatch(logIn({userid: bufferUser}))}>
            <h1> Proceed as employee No. {bufferUser} </h1>
            </Link>
          <p>社員カードでログインしてください。</p><Link to="/dashboard">社員番号とコードでログインする。</Link>
        </TextWrapper>

        </Wrapper>
    </div>
  )
}

export default Login