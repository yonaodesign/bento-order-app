import './App.css';
import {useState} from "react";
import Calendar from './components/Calendar'
import Navbar from './components/Navbar';
import usersDB from './userDB';
import bentoOrdersDB from './bentoOrdersDB'
import AdminDisplayTodayOrders from './components/AdminDisplayTodayOrders';
import styled from 'styled-components'

function App() {
  const [bentoOrders, setBentoOrders] = useState(bentoOrdersDB)
  const [loggedUser, setLoggedUser] = useState({loggedUserId: 253, displayName: "Satoru Jon"})
  const [trigger, setTrigger] = useState(false)
  const myResult = bentoOrders.filter(order => order.userId == loggedUser.loggedUserId)

  const SwitcherBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 10px;`

  const PrettyButton = styled.button`
  padding: 10px;`

  return (
    <div className="App">
      <header className="App-header">
        <Navbar name={loggedUser} />
          <SwitcherBar>
            {
            usersDB.map((item, i) => <PrettyButton key={i} onClick={()=>setLoggedUser({loggedUserId: item.userId, displayName: item.displayName})}>{item.userId}{' '}{item.displayName}</PrettyButton>)
            }
            <PrettyButton onClick={()=>setTrigger(!trigger)}>本日の注文管理</PrettyButton></SwitcherBar>
        <Calendar bentoOrders={bentoOrders} stateChanger={setBentoOrders} users={usersDB} name={loggedUser.loggedUserId} value={myResult}/>
        {trigger && <AdminDisplayTodayOrders bentoOrders={bentoOrders} names={usersDB}/>}
      </header>

    </div>
  );
}

export default App;
