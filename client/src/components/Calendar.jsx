import React, { Component, Fragment } from 'react';
import CalendarDays from './calendar-days';
import './calendar.css';
import {store} from '../app/store';
const state = store.getState();

export default class Calendar extends Component {
  constructor() {
    super();
    this.weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    this.months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.state = {currentDay: new Date()}
  }

  changeCurrentDay = (day) => {

    const formatDate = `${day.year}-${day.month+1}-${day.number}`;
    console.log(`👏 ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}: Clicked at date ${formatDate}, by ${this.props.name}`)

    if (day.date < new Date() || !day.currentMonth) {
      console.error("⏰ You can't change the past.");
    } else {
      if (this.props.bentoOrders.find(e => e.dateId == formatDate && e.userId == this.props.name)) {
        console.log('👆 Firing: Removing the date from the DB.');
        this.props.stateChanger(this.props.bentoOrders.filter(orders => !(orders.dateId == formatDate && orders.userId == this.props.name)))
      } else 
      {
        console.log('👆 Firing: Adding the date to the DB.');
        this.props.stateChanger([...this.props.bentoOrders, { userId: this.props.name, dateId: formatDate, type: "day" }])
        // INSERT INTO ordersDB (orderId, userId, dateId, type, timestamp) VALUES (uuid_generate_v4(), 253, '2022-5-16', 'day', '2022'),
      }
    }


    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  render() {
    return (
      <>
      <div className="calendar">
        <div className="calendar-header">
          <h2>{this.state.currentDay.getFullYear()}{'年'}{this.months[this.state.currentDay.getMonth()]}{'月'}</h2>
          <div>{this.state.currentDay.getMonth()+1}{'月のお弁当の注文回数は'}{Object.keys(this.props.bentoOrders.filter(e=>e.userId == this.props.name && e.dateId.split('-')[0]==this.state.currentDay.getFullYear() && e.dateId.split('-')[1]==this.state.currentDay.getMonth()+1)).length + '回です。'}
        {'見通しの価格は'}{Object.keys(this.props.bentoOrders.filter(e=>e.userId == this.props.name && e.dateId.split('-')[0]==this.state.currentDay.getFullYear() && e.dateId.split('-')[1]==this.state.currentDay.getMonth()+1)).length*200+'円です。'}
        </div>
        </div>     

        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday" key={weekday}><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarDays orders={this.props.value} day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
      </>)
  }
}