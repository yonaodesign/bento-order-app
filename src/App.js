import logo from './logo.svg';
import './App.css';
import {Fragment, useState} from "react";
import Calendar from './components/Calendar'


function App() {

  const usersDB = [ {userId: 253, displayName: "Volny Jonas", department: "sales"},
                    {userId: 1, displayName: "Horiuchi Mayuko", department: "CEO"},
                  ]

  // const [bentoOrders, setBentoOrders] = useState([{userId: 253, dateId: "2022-5-20", type: "day", timestamp: "2022"}])
  const [loggedUser, setLoggedUser] = useState({loggedUserId: 253})
  const [orders, setOrders] = useState([
    {
      userId: 253,
      displayName: "Volny Jonas",
        orders: [
          {dateId: "2022-5-20", type: "day"},
          {dateId: "2022-5-23", type: "day"},
          {dateId: "2022-5-24", type: "night"},
          {dateId: "2022-5-25", type: "night"},
          {dateId: "2022-5-29", type: "day"},
        ]
    },
    {
      userId: 1,
      displayName: "堀内 真由子",
      orders: [
        {dateId: "2022-5-2", type: "night"},
        {dateId: "2022-5-3", type: "day"},
        {dateId: "2022-5-4", type: "day"},
        {dateId: "2022-5-21", type: "night"},
        {dateId: "2022-5-29", type: "night"},
      ]
    }
  ])

  const myResult = orders.find(order => order.userId == loggedUser.loggedUserId)
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <h2>{<span>お疲れ様です</span>} {myResult.displayName}</h2> */}
        <ul>
          {myResult.orders.map(e=><li key={e.dateId} className={e.type}>{e.dateId}{' '}{e.type}</li>)}
        </ul>
        <button onClick={()=>setLoggedUser({loggedUserId: 1})}>Switch</button>
        <Calendar value={myResult}/>
      </header>

    </div>
  );
}

export default App;
