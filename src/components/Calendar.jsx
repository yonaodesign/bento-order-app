import React, { Component } from 'react';
import CalendarDays from './calendar-days';
import './calendar.css';

export default class Calendar extends Component {
  constructor() {
    super();
    this.weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    this.months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.state = {currentDay: new Date()}
  }

  

  changeCurrentDay = (day) => {
    const formatDate = `${day.year}-${day.month+1}-${day.number}`;

    console.warn("composed", formatDate);

    day.date < new Date() || !day.currentMonth ? console.warn("You can't change the past.") : 
    this.props.bentoOrders.find(e=>e.dateId == formatDate) ? 
            this.props.stateChanger(this.props.bentoOrders.filter(orders=>orders.dateId!==formatDate && orders.userId!==this.props.userId))
   : this.props.stateChanger([...this.props.bentoOrders, {userId: this.props.name, dateId: formatDate, type: "day"}])

  //  day.date < new Date() ? console.warn("You can't change the past.") : 
  //  this.props.bentoOrders.find(e=>e.dateId == formatDate) ? 
  //  this.props.stateChanger(this.props.bentoOrders.filter(orders=>orders.dateId!==formatDate && orders.userId!==this.props.userId))
  // : this.props.stateChanger([...this.props.bentoOrders, {userId: this.props.name, dateId: formatDate, type: "night"}])


    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  render() {
    return (

      <div className="calendar">

        {/* {'Selected date: '}{this.state.currentDay.toDateString()} */}

        <div className="calendar-header">
          <h2>{this.state.currentDay.getFullYear()}{'年'}{this.months[this.state.currentDay.getMonth()]}{'月'}</h2>
       <div>   {this.state.currentDay.getMonth()+1}{'月のお弁当の注文回数は'}{Object.keys(this.props.bentoOrders.filter(e=>e.userId == this.props.name && e.dateId.split('-')[0]==this.state.currentDay.getFullYear() && e.dateId.split('-')[1]==this.state.currentDay.getMonth()+1)).length + '回です。'}
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
    )
  }
}