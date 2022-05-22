import React from 'react'
import usersDB from '../userDB';
import styled from 'styled-components';

const AdminDisplayTodayOrders = (props) => {

    const valueOfToday = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    const todaysOrders = props.bentoOrders.filter(e=>e.dateId==valueOfToday);

    const Wrapper = styled.div`
    position: absolute;
    left: 20%;
    top: 30%;
    right: 20%;
    bottom: 30%;
    background-color: white;
    box-shadow: 0px 0px 30px lightgray;
    padding: 20px;
    `

    const ReportTable = styled.table`
    width: 100%;
    text-align: left;
    `

  return (
      <Wrapper>
        <h1>本日のご注文一覧 ({todaysOrders.length}件)</h1>

          <ReportTable>
              <tr>
                  <th>日付</th>
                  <th>番号</th>
                  <th>氏名</th>
                  <th>種類</th>
                  <th>件数</th>
              </tr>
              
              {
              todaysOrders.map(
                  (item,i)=>
              <tr>
                  <td>{item.dateId}</td>
                  <td>{i+1}件目</td>
                  <td>{usersDB.find(e => e.userId == item.userId).displayName}</td>
                  <td>{item.type == "day" ? "お昼" : "夜勤"}</td>
                  <td>1</td>
                     
              </tr>
              )}

          </ReportTable>
    </Wrapper>
  )
}

export default AdminDisplayTodayOrders