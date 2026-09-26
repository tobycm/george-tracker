
const sqlite3 = require('sqlite3').verbose();
let sql;
//connect to DB
const db = new sqlite3.Database('./db/test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})
// create table: location, date, time, notes, image
// sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, location, date, time, notes, image)';
// db.run(sql);

// drop table
//db.run('DROP TABLE users');

// insert data into database
// sql = `INSERT INTO users(location, date, time, notes, image) VALUES(?,?,?,?,?)`;
// db.run(sql, 
//     ['Cornett', 'May 18 2007', '18:00', 'n/a', 'imagelink'], 
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// )
function newSighting(location, date, time, notes, image) {
    sql = `INSERT INTO users(location, date, time, notes, image) VALUES(?,?,?,?,?)`;
    db.run(sql,
        [location, date, time, notes, image],
        (err) => {
            if (err) return console.error(err.message);
        }
    )
}

// update data
// sql = 'UPDATE users SET location = ? WHERE id = ?';
// db.run(sql, ['Jake', 1], (err) => {
//     if (err) return console.error(err.message);
// })

// delete data
sql = 'DELETE FROM users WHERE id = ?';
db.run(sql, [1], (err) => {
    if (err) return console.error(err.message);
})


// query the database
sql = 'SELECT * FROM users';
db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    })
});