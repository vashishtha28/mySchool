require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
//This is a trial change

//______________________________________DATABASE Setup_____________________________________________
//Set up default mongoose connection
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//_________________________________________________________________________________________________


var Schema = mongoose.Schema;

//Test data
const regSchools = ["KV IITG", "DPS Rajnagar"];
const students =[ {
  schoolName: "KV IITG",
  email: "student@gmail.com",
  password: "123456"
}];

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the mySchool backend</h1>')
});

//___________________________________________________________________________________________

//currently we are not checking for roles
//need proper database for that
app.post("/login", function(req, res){
  const result = students.find(user => user.email == req.body.email);
  if(result){
      if(result.password ==req.body.password){
          res.send({
              message: "Successful login"
          });
      }else{
          res.send({message: "Password Incorrect"});
      }

  }else{
      res.send({message: "user not found"});
  }
  res.send({message: "authenticated dude"})
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});
