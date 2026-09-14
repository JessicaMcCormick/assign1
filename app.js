const express = require("express");
const mysql = require("mysql2");

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "webuser",
  password: "webpass",
  database: "assign1",
  connectionLimit: 5,
});

//*** Middleware */
app.use(express.json());
app.use(express.static('public'));

//** Web API */
app.get("/users", function (req, res) {
  const sql = "SELECT * FROM users";
  pool.execute(sql, function (err, result, fields) {
    if(err){
      console.error(err);
      return res.status(500).json({
        error: "Database erro"
      });
    }
    res.json(result);
  });
});


app.listen(3000, function () {
  console.log("Listening on port 3000..");
});

app.post("/users", function(req, res){
    const{
      username,
      lastname,
      firstname,
      passwd,
      email,
      urole
    } = req.body;

    if (!username){
      return res.status(400).jason({
        error: "Username is required"
      });

    }
    
    const sql = ` INSERT INTO users (
      username,
      lastname,
      firstname,
      passwd,
      email,
      urole
    ) VALUES (?,?,?,?,?,?)`;

    const values = [
      username,
      lastname,
      firstname,
      passwd,
      email,
      urole
    ];

    pool.execute(sql, values, function (err, results){
      if (err){
        console.error(err);
        
        return res.status(500).json({
          error: "Unable to add user"
        });
      }

      res.status(201).json({
        message: "User added successfully",
        userID: result.insertId
      });
    });
});

    app.listen(300, function(){
      console.log("Listening on port 3000...");
    });
