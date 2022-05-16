import React, { Component } from 'react';
import CalendarDays from './calendar-days';
import './calendar.css';

export default class Calendar extends Component {
  constructor() {
    super();
    this.weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', '6', '7', '8', '9', '10', '11', '12'];
    this.state = {currentDay: new Date()}
  }

  

  changeCurrentDay = (day) => {
    const formatDate = `${day.year}-${day.month}-${day.number}`;
    day.date < new Date() ? alert("YOU CANT CHANGE PAST") : 
    this.props.bentoOrders.find(e=>e.dateId == formatDate) ? 
    this.props.stateChanger(this.props.bentoOrders.filter(orders=>orders.dateId!==formatDate && orders.userId!==this.props.userId))
   : this.props.stateChanger([...this.props.bentoOrders, {userId: this.props.name, dateId: formatDate, type: "night"}])

   console.log("WHAt HAPPANED LOL", this.props.bentoOrders)
    
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  render() {
    return (

      <div className="calendar">
        <div className="calendar-header">
          <h2>{this.props.users.find(e=>e.userId == this.props.name).displayName}{'の'}{this.state.currentDay.getFullYear()}{'年'}{this.months[this.state.currentDay.getMonth()]}{'月'}</h2>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarDays orders={this.props.value} day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </div>
      </div>
    )
  }
}