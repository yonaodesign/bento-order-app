import React from 'react'
import styled from 'styled-components'
import Restaurant from '@mui/icons-material/Restaurant';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';



const Sidebar = (props) => {
    const Wrapper = styled.div`
    position: absolute;
    width: 250px;
    left: 0px;
    top: 60px;
    bottom: 0px;
    transition: 3s;
    background: white;
    z-index: 5;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 30px rgb(214, 214, 214);
    `

    const MenuItem = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 10px;`

  return (
    <div>{props.ay ? "" :
    <Wrapper>
        <MenuItem><CurrencyYenIcon/> <p>今月費用見通し: 2000円</p></MenuItem>
        <MenuItem><Restaurant/> <p>お弁当を注文する</p></MenuItem>
        <MenuItem><DoNotDisturbAltIcon/>すめての注文をキャンセル</MenuItem>
    </Wrapper>}
    </div>
  )
}

export default Sidebar