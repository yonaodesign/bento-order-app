import React from 'react'
import internetImg from '../internet.png'
import styled from 'styled-components'


const OfflineMessage = () => {


    const InternetOffMessage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;`
    
    const InternetOffImage = styled.img`
    object-fit: contain;
    width: 200px;`


  return (
    <div>
    
    <InternetOffMessage>
                <InternetOffImage src={internetImg}/>
                Please connect to the internet.
    </InternetOffMessage></div>
  )
}

export default OfflineMessage