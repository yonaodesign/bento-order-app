import './App.css';
import {useState, useEffect} from "react";
import Calendar from './components/Calendar'
import Navbar from './components/Navbar';
import usersDB from './userDB';
import AdminDisplayTodayOrders from './components/AdminDisplayTodayOrders';
import styled from 'styled-components'
import { Offline, Online } from "react-detect-offline"
import OfflineMessage from './components/OfflineMessage';


const PrettyButton = styled.button`
padding: 10px;
`


function App() {
const [bentoOrders, setBentoOrders] = useState([]);

const getOrders = async () => {
  try {
    const response = await fetch('http://localhost:8888/api/orders')
    const jsonData = await response.json()

    setBentoOrders(jsonData.rows)
  } catch (e) {
    console.error(e.message)
  }
}
useEffect(() => {
  getOrders();
}, []);
console.table(bentoOrders)

const [loggedUser, setLoggedUser] = useState({loggedUserId: 253, displayName: "Satoru Jon"})
  const [trigger, setTrigger] = useState(false)
  const myResult = bentoOrders.filter(order => order.userid == loggedUser.loggedUserId)

  const SwitcherBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 10px;
  `



  return (
    <div className="App">
      <Online>
      <header>
        <Navbar name={loggedUser} />
          <SwitcherBar>
            <div>
            {usersDB.map((item, i) => <PrettyButton key={i} onClick={()=>setLoggedUser({loggedUserId: item.userId, displayName: item.displayName})}>{item.userId}{' '}{item.displayName}</PrettyButton>)}
            </div>
            <PrettyButton onClick={()=>setTrigger(!trigger)}>本日の注文管理</PrettyButton>

          </SwitcherBar>
        <Calendar bentoOrders={bentoOrders} stateChanger={setBentoOrders} users={usersDB} name={loggedUser.loggedUserId} value={myResult}/>
        {trigger && <AdminDisplayTodayOrders bentoOrders={bentoOrders} names={usersDB}/>}
      </header>
      </Online>
      <Offline>
        <Navbar/>
        <OfflineMessage/>
      </Offline>

    </div>
  );
}

export default App;
