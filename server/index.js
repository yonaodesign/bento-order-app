const express = require('express');
const usersDB = require('./data/userDB');
const bentoOrders = require('./data/bentoOrdersDB');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');


const app = express();
const PORT = 8888;

const { Pool } = require('pg');
const connectionString = process.env.PGSTRING;
const pool = new Pool({connectionString})


app.use(cors())
app.options('*', cors()) 

app.listen(PORT, ()=>{
    console.log('🔌 Serving @ http://localhost:' + PORT + '.')
})

app.get('/api/users', async (req,res)=>{
    const {rows} = await pool.query("select * from usersDB")
    console.table(rows)
    res.send({"rows": rows})
});

app.get('/api/users/:userId', async (req,res)=>{
    res.send(usersDB.find(e=>e.userId==req.params.userId))
});

app.get('/api/orders', async (req,res)=>{
    const {rows} = await pool.query("select * from ordersDB")
    console.table(rows)
    res.send({"rows": rows})
});

app.get('/api/orders/date/:dateId', async (req,res)=>{
    const {rows} = await pool.query("select * from ordersDB where dateId = $1", [req.params.userId],)
    res.send({"users": rows})
});

app.get('/api/orders/:userId', async (req,res)=>{
    const {rows} = await pool.query("select * from ordersDB where orderId = $1", [req.params.userId],)
    res.send({"users": rows})
});

app.get('/test', async (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/', async (req,res)=>{
    res.send('Welcome to the app.')
})

app.get('*', async (req,res)=>{
    res.send('No such route. Error 404.')
})

module.exports = app;