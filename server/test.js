const express = require('express');
const app = express();
const pcsclite = require('@pokusew/pcsclite');
const pcsc = pcsclite();



const cardsDB = [
    {hex: "xxxx", user: '253'}
];
const newArray = [];
const sessionsDB = [
    {"timestamp":"2022-05-22T05:56:26.766Z","user":"253"},
];





//READER 24/7 => MOVE TO ONE ROUTE
pcsc.on('reader', (reader) => {
    console.log('🔼　Current reader '+reader.name+'.');
    reader.on('error', err => {console.log(reader.name, ': ', err.message);});
    reader.on('status', (status) => {
        // console.log('💡　Status of', reader.name, ':', status);
        const changes = reader.state ^ status.state;
        if (!changes) {
            console.log('❔');
            return;}
        if ((changes & reader.SCARD_STATE_EMPTY) && (status.state & reader.SCARD_STATE_EMPTY)) {
            console.log("💳　Iddle.");
            reader.disconnect(reader.SCARD_LEAVE_CARD, err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Session ended.');
            });
        }
        else if ((changes & reader.SCARD_STATE_PRESENT) && (status.state & reader.SCARD_STATE_PRESENT)) {

            console.log("💳　Card detected.");
            reader.connect({ share_mode: reader.SCARD_SHARE_SHARED }, (err, protocol) => {
                if (err) {console.log('❔ Failed to Connect.', err.message);
                    return;}
                // console.log('❔ Protocol ', reader.name, '):', protocol);
                reader.transmit(Buffer.from([0x00, 0xB0, 0x00, 0x00, 0x20]), 40, protocol, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;}
                    newArray.push({timestamp: new Date(), atr:status.atr.toString('hex')})
                    // console.log('💡 Data received', data, status);
                    // console.table(newArray)
                    const discoveredUser = cardsDB.find(e=>e.hex == newArray[newArray.length-1].atr);
                    discoveredUser == undefined ? console.warn(newArray[newArray.length-1]) : ""
                    sessionsDB.push({timestamp: new Date(), user:discoveredUser !== undefined ? discoveredUser.user : "Unknown User"})
                    console.table(sessionsDB)
                    // reader.close();
                    // pcsc.close();
                });
            });
        }
    });
    reader.on('end', () => {
        console.log('Reader', reader.name, 'removed');
    }); 
});
pcsc.on('error', err => {
    console.log('❔ PCSC error', err.message);
});










//BACK-END ROUTES
app.get('/login', async (req, res)=>{
    await pool.query("INSERT INTO bentosessions (timestamp, userid) VALUES ($1, $2) RETURNING *",
    [sessionsDB[sessionsDB.length-1].timestamp, sessionsDB[sessionsDB.length-1].user])
    res.redirect('/auth')
});

app.get('/auth', async (req, res)=>{
    const results = await pool.query("SELECT * FROM bentosessions")
    res.json(results.rows[results.rows.length-1].userid)
});




app.get('*', (req, res)=>{
    res.send('Requested resource not found.')
});





//GOOOOOOO
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log('🔼　Application server running on http://localhost:'+PORT+'.')
})