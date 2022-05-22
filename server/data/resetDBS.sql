DROP TABLE IF EXISTS usersDB;

CREATE TABLE usersDB (
    userId int,
    displayName varchar(255),
    department varchar(255),
    nightShifts BOOLEAN
);

DROP TABLE IF EXISTS ordersDB;
CREATE TABLE ordersDB (
    orderId varchar(255),
    userId int, 
    dateId varchar(20),
    type varchar(255),
    timestamp varchar(255)
)






CREATE TABLE hexdb(
hexid SERIAL PRIMARY KEY,
hex VARCHAR(255) NOT NULL,
userid int NOT NULL,
displayname VARCHAR(255)
)



INSERT INTO hexdb (hex, userid, displayname) VALUES ('3b8f8001804f0ca000000306030001000000006a', 253, 'Jon Satoru');
INSERT INTO hexdb (hex, userid, displayname) VALUES ('3b8f8001804f0ca00000030611003b0000000042', 1, 'Ma Hori');
INSERT INTO hexdb (hex, userid, displayname) VALUES ('3b888001004b51ffb381d1000f', 1000, 'CARDBOSS');
