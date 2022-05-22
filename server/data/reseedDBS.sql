INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (253, 'Satoru Jon', 'sales', false);
INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (1, 'Ma Hori', 'CEO',  false);
INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (20, 'Nakama Joe', 'hardWorkers',  true);
INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (333, 'Nakata Ken', 'hardWorkers',  true);
INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (111111, 'BOSS', 'hardWorkers',  true);
INSERT INTO usersDB (userId, displayName, department, nightShifts) VALUES (2, 'Tanaka Minami', 'hardWorkers',  true);

INSERT INTO ordersDB (orderId, userId, dateId, type, timestamp) VALUES 
(uuid_generate_v4(), 253, '2022-5-16', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-17', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-18', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-20', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-20', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-25', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-27', 'day', '2022'),
(uuid_generate_v4(), 253, '2022-5-28', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-1', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-3-2', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-3', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-3', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-1-20', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-21', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-29', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-30', 'day', '2022'),
(uuid_generate_v4(), 1, '2022-5-18', 'day', '2022'),
(uuid_generate_v4(), 20, '2022-5-18', 'day', '2022'),
(uuid_generate_v4(), 333, '2022-5-18', 'day', '2022');