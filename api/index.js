const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

let db = mysql.createConnection({
    host: "localhost",//when dev with local mysql
    host: "mysql_srv",//when start with docker mysql
    user: "root",
    password: "root",
    database: "contacts",
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("Connected to Database");
        console.log("Creating database table")
        let tableName = 'contact_db';

        // Query to create table
        let query = `CREATE TABLE ${tableName} 
        (id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, contact VARCHAR(255) NOT NULL
        )`;

        db.query(query, (err, rows) => {
            if (err) {
                console.log("Table Exist");
            } else {
                console.log(`Successfully Created Table - ${tableName}`)
            }
        })
    }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json("Testing Node.js Server")
});

app.get("/api", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>React App</title>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <table>
        <thead>
          <tr>
            <th>api</th>
            <th>url</th>
            <th>desc</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Get contacts</td>
            <td><a href="http://localhost:5000/api/get">http://localhost:5000/api/get</a></td>
            <td>Get contacts</td>
          </tr>
          <tr>
            <td>Get contact by id</td>
            <td><a href="http://localhost:5000/api/get/input_your_contact_id">http://localhost:5000/api/get/input_your_contact_id</a></td>
            <td>Get contact by id</td>
          </tr>
          <tr>
            <td>Post a contact</td>
            <td><a href="http://localhost:5000/api/post">http://localhost:5000/api/post</a></td>
            <td>Post a contact</td>
          </tr>
          <tr>
            <td>Update a contact by id</td>
            <td><a href="http://localhost:5000/api/update/input_your_contact_id">http://localhost:5000/api/update/input_your_contact_id</a></td>
            <td>Post a contact by id, and a Form data to post</td>
          </tr>
          <tr>
            <td>Delete a contact by id</td>
            <td><a href="http://localhost:5000/api/remove/input_your_contact_id">http://localhost:5000/api/remove/input_your_contact_id</a></td>
            <td>Delete a contact by id</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `)
});

app.get("/api/get", (req, res) => {

    const sqlGet = "SELECT * from contact_db";
    db.query(sqlGet, (err, result) => {
        res.send(result)
    })
})

app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    if (!name && !email)
      res.send("Please input data");
  
    const sqlInsert = "INSERT INTO contact_db(id, name, email, contact) VALUES(?,?,?,?)";
    try {
      db.query(sqlInsert, [new Date().getMilliseconds(), name, email, contact], (error, result) => {
        if (error)
          res.send(error);
        res.send(result);
      });
    } catch (error) {
      res.send({ error });
    }
})

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error)
      res.send(error);
    res.send(result);
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * from contact_db WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err)
      res.send(err);
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  let { name, email, contact } = req.body;
  
  // get first:
  const sqlGet = "SELECT * from contact_db WHERE id = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) res.send(err);

    if (result && typeof result === 'object' && Array.isArray(result)) {
      const data = result[0];
      
      if (!name) {name = data.name};
      if (!email) {email = data.email};
      if (!contact) {contact = data.contact};
      
      // update:
      const sqlUpdate = "UPDATE contact_db SET name= ?, email= ?, contact= ? WHERE id=?";
      const updatedData = db.query(sqlUpdate, [name, email, contact, id], (err, result) => {
        if (err) res.send(err);
        res.send({...result, status: "Updated"});
      });
    }
  });
})

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000 or api: http://localhost:5000/api")
});