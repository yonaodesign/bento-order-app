function CalendarDays(props) {
    const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
  
    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }
  
      let calendarDay = {
        currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
        year: firstDayOfMonth.getFullYear()
      }
  
      currentDays.push(calendarDay);
    }

    console.log(props.orders.orders)
  
    return (
      <div className="table-content">
        {
          currentDays.map((day) => {
            const thisDayString = day.year + "-" + day.month + "-" + day.number;
            const thisDayObject = props.orders.orders.find(e=>e.dateId==thisDayString)

            return (
              <div className={"calendar-day" + ((thisDayObject !== undefined ? " "+(thisDayObject.type) : "")) + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} id={(day.year + "-" + (day.month) + "-" + day.number)}
                    onClick={() => props.changeCurrentDay(day)}>
                <p>{day.month + '月' + day.number + '日'}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  export default CalendarDays;