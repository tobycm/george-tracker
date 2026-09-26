
const sqlite3 = require('sqlite3').verbose();
let sql;
//connect to DB
const db = new sqlite3.Database('./db/george_sightings.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
})
// create table: location, date, time, notes, image
function createTable() {
    sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, location, date, notes, image)';
    db.run(sql);
}
//createTable();
// drop table
// db.run('DROP TABLE users');

// insert data into database
// sql = `INSERT INTO users(location, date, time, notes, image) VALUES(?,?,?,?,?)`;
// db.run(sql, 
//     ['Cornett', 'May 18 2007', '18:00', 'n/a', 'imagelink'], 
//     (err) => {
//         if (err) return console.error(err.message);
//     }
// )
function newSighting(location, date, notes, image) {
    sql = `INSERT INTO users(location, date, notes, image) VALUES(?,?,?,?)`;
    db.run(sql,
        [location, date, notes, image],
        (err) => {
            if (err) return console.error(err.message);
        }
    )
}
//newSighting('Cornett', 'May 18 2007', 'n/a', 'imagelink');

function getSightings() {
    sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach((row) => {
            console.log(row);
        })
    })
}
function getSighting(id) {
    sql = 'SELECT * FROM users WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) return console.error(err.message);
        console.log(row);
    })
}
//getSightings();
//getSighting(1);


// delete data
function deleteSighting(id) {
    sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [id], (err) => {
        if (err) return console.error(err.message);
    })
}
// deleteSighting(1);
// getSightings();
