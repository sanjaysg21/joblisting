const res = require("express/lib/response");
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(express.json());

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sanjay',
  database: 'nbyula',
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// Parse request body as JSON
app.use(bodyParser.json());
app.post('/register', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const pwd = req.body.pwd;
  console.log(name)

  const query = 'INSERT INTO login (name, email, pwd) VALUES (?, ?, ?)';
  connection.query(query, [name, email, pwd], function(error, results, fields) {
    if (error) throw error;

    // Redirect to the login page
    res.redirect('/login');
  });
});



// Handle the login form submission
app.post('/login', (req, res) => {
  // const { mail, password } = req.body;

  const mail = req.body.email
  const password = req.body.password
  
  console.log(mail)

  const sql = 'SELECT * FROM login WHERE email = ?';
  const values = [mail];
  connection.query(sql, values, (err, results) => {
    if (err) {  
      console.error('Error retrieving user data from database:', err);
      res.status(500).send('Internal server error!!!');
    } else if (results.length === 0) {
      res.status(401).send('Invalid email');
    } else {
      const user = results[0];
      if(password === user.pwd) {
        res.redirect('/index')
      } else {
        res.status(401).send('Invalid Password!')
      }
    }
  });
});
// Start the server
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

app.get('/index',(req,res)=>{
    res.render("index.ejs")
})
app.get('/login',(req,res)=>{
    res.render("login.ejs")
})
app.get('/register',(req,res)=>{
    res.render("register.ejs")
})
app.get('/form',(req,res)=>{
  res.render("form.ejs")
})