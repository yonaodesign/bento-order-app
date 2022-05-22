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