import React from 'react';
import Navbar from './Navbar';
import rfidImg from '../rfid.png';
import styled from 'styled-components';

const Login = () => {

  const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  text-align: center;
  `

  const RfidImg = styled.img`
  object-fit: contain;
  width: 200px;`


  return (
    <div>
      <Navbar/>
      <Wrapper>
        <div>
          <RfidImg src={rfidImg}/>
          <p>社員カードでログインしてください。</p>
          <p>又は</p><u>社員番号とコードでログインする。</u>
        </div>
        </Wrapper>
    </div>
  )
}

export default Login