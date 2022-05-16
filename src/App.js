import './App.css';
import {useState} from "react";
import Calendar from './components/Calendar'
import Navbar from './components/Navbar';
import usersDB from './userDB';

function App() {
  const [bentoOrders, setBentoOrders] = useState([
    {userId: 253, dateId: "2022-5-16", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-17", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-18", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-20", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-20", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-25", type: "day", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-27", type: "night", timestamp: "2022"},
    {userId: 253, dateId: "2022-5-28", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-1", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-2", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-3", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-3", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-20", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-21", type: "day", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-29", type: "night", timestamp: "2022"},
    {userId: 1, dateId: "2022-5-30", type: "day", timestamp: "2022"},
  ])

  const [loggedUser, setLoggedUser] = useState({loggedUserId: 253})
  const whoIs = (who => who.userId == loggedUser.loggedUserId).displayName;

  const myResult = bentoOrders.filter(order => order.userId == loggedUser.loggedUserId)
  console.log("All Orders by LoggedUser:", myResult)



  return (
    <div className="App">
      <header className="App-header">
        <Navbar name={loggedUser.loggedUserId} />
        {/* ROUTER */}
        {/* <button onClick={()=>setLoggedUser({loggedUserId: 1})}>1</button>
        <button onClick={()=>setLoggedUser({loggedUserId: 253})}>253</button>
        <button onClick={()=>setLoggedUser({loggedUserId: 20})}>10</button> */}
        <Calendar bentoOrders={bentoOrders} stateChanger={setBentoOrders} users={usersDB} name={loggedUser.loggedUserId} value={myResult}/>
      </header>

    </div>
  );
}

export default App;
