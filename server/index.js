const express = require("express");
const usersDB = require("./data/userDB");
const bentoOrders = require("./data/bentoOrdersDB");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const pcsclite = require("@pokusew/pcsclite");
const pcsc = pcsclite();

const app = express();
const PORT = 8888;

const { Pool } = require("pg");
const connectionString = process.env.PGSTRING;
const pool = new Pool({ connectionString });

const cardsDB = [

];

const newArray = [];
const sessionsDB = [{ timestamp: "2022-05-22T05:56:26.766Z", user: "253" }];

//READER 24/7 => MOVE TO ONE ROUTE
pcsc.on("reader", (reader) => {
  console.log("🔼　Current reader " + reader.name + ".");
  reader.on("error", (err) => {
    console.log(reader.name, ": ", err.message);
  });
  reader.on("status", (status) => {
    // console.log('💡　Status of', reader.name, ':', status);
    const changes = reader.state ^ status.state;
    if (!changes) {
      console.log("❔");
      return;
    }
    if (
      changes & reader.SCARD_STATE_EMPTY &&
      status.state & reader.SCARD_STATE_EMPTY
    ) {
      console.log("💳　Iddle.");
      reader.disconnect(reader.SCARD_LEAVE_CARD, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Session ended.");
      });
    } else if (
      changes & reader.SCARD_STATE_PRESENT &&
      status.state & reader.SCARD_STATE_PRESENT
    ) {
      console.log("💳　Card detected.");
      reader.connect(
        { share_mode: reader.SCARD_SHARE_SHARED },
        (err, protocol) => {
          if (err) {
            console.log("❔ Failed to Connect.", err.message);
            return;
          }
          // console.log('❔ Protocol ', reader.name, '):', protocol);
          reader.transmit(
            Buffer.from([0x00, 0xb0, 0x00, 0x00, 0x20]),
            40,
            protocol,
            (err, data) => {
              if (err) {
                console.log(err);
                return;
              }
              newArray.push({
                timestamp: new Date(),
                atr: status.atr.toString("hex"),
              });
              // console.log('💡 Data received', data, status);
              // console.table(newArray)

              const discoveredUser = cardsDB.find(
                (e) => e.hexid == newArray[newArray.length - 1].atr
              );
              discoveredUser == undefined
                ? console.warn(newArray[newArray.length - 1])
                : "";
              sessionsDB.push({
                timestamp: new Date(),
                user:
                  discoveredUser !== undefined
                    ? discoveredUser.user
                    : "Unknown User",
              });
              console.table(sessionsDB);
              // reader.close();
              // pcsc.close();
            }
          );
        }
      );
    }
  });
  reader.on("end", () => {
    console.log("Reader", reader.name, "removed");
  });
});
pcsc.on("error", (err) => {
  console.log("❔ PCSC error", err.message);
});

app.use(cors());
app.options("*", cors());

app.listen(PORT, () => {
  console.log("🔌 Serving @ http://localhost:" + PORT + ".");
});

app.get("/api/users", async (req, res) => {
  const { rows } = await pool.query("select * from usersDB");
  console.table(rows);
  res.send({ rows: rows });
});

app.get("/api/users/:userId", async (req, res) => {
  res.send(usersDB.find((e) => e.userId == req.params.userId));
});

app.get("/api/orders", async (req, res) => {
  const { rows } = await pool.query("select * from ordersDB");
  console.table(rows);
  res.send({ rows: rows });
});

app.get("/api/orders/date/:dateId", async (req, res) => {
  const { rows } = await pool.query(
    "select * from ordersDB where dateId = $1",
    [req.params.userId]
  );
  res.send({ users: rows });
});

app.get("/api/orders/:userId", async (req, res) => {
  const { rows } = await pool.query(
    "select * from ordersDB where orderId = $1",
    [req.params.userId]
  );
  res.send({ users: rows });
});

app.get("/test", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/", async (req, res) => {
  res.send("Welcome to the app.");
});

//BACK-END ROUTES

app.get("/login", async (req, res) => {
  await pool.query(
    "INSERT INTO bentosessions (timestamp, userid) VALUES ($1, $2) RETURNING *",
    [
      sessionsDB[sessionsDB.length - 1].timestamp,
      sessionsDB[sessionsDB.length - 1].user,
    ]
  );
  res.redirect("/auth");
});

app.get("/auth", async (req, res) => {
  const results = await pool.query("SELECT * FROM bentosessions");
  res.json(results.rows[results.rows.length - 1]);
});

app.get("*", async (req, res) => {
  res.send("No such route. Error 404.");
});

module.exports = app;
