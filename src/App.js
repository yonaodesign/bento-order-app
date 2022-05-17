import './App.css';
import {useState} from "react";
import Calendar from './components/Calendar'
import Navbar from './components/Navbar';
import usersDB from './userDB';
import bentoOrdersDB from './bentoOrdersDB'
import AdminDisplayTodayOrders from './components/AdminDisplayTodayOrders';

function App() {
  const [bentoOrders, setBentoOrders] = useState(bentoOrdersDB)
  const [loggedUser, setLoggedUser] = useState({loggedUserId: 253, displayName: "Satoru Jon"})
  const [trigger, setTrigger] = useState(false)
  const myResult = bentoOrders.filter(order => order.userId == loggedUser.loggedUserId)

  return (
    <div className="App">
      <header className="App-header">
        <Navbar name={loggedUser} />
          <div>{usersDB.map((item, i) => <button key={i} onClick={()=>setLoggedUser({loggedUserId: item.userId, displayName: item.displayName})}>{item.userId}{' '}{item.displayName}</button>)}<button onClick={()=>setTrigger(!trigger)}>管理</button></div>
        <Calendar bentoOrders={bentoOrders} stateChanger={setBentoOrders} users={usersDB} name={loggedUser.loggedUserId} value={myResult}/>
        {trigger && <AdminDisplayTodayOrders bentoOrders={bentoOrders} names={usersDB}/>}
      </header>

    </div>
  );
}

export default App;
