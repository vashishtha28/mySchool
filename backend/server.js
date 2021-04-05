require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
const port = 5000;
//______________________________________App.use___________________________________________________
app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//______________________________________DATABASE Setup_____________________________________________
//Set up default mongoose connection
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//________________________________________ALL SCHEMAS______________________________________________
var Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const attendanceSchema = new mongoose.Schema({
  date: Date,
  isPresent: Boolean,
});

const classSchema = new mongoose.Schema({
  class: String,
  section: String
});

const noticeSchema = new mongoose.Schema({
  date: Date,
  title: String,
  content: String,
  sender: String
});

const testResultSchema = new mongoose.Schema({
  date: Date,
  subject: String,
  testDescription: String,
  maxMarks: String,
  marksObtained: String
});

const studentSchema = new mongoose.Schema({
  username: String,
  role: String,
  //password: String,
  studentName: String,
  class: String,
  section: String,
  rollNum: String,
  fatherName: String,
  motherName: String,
  parentEmailId: String,
  attendanceList: [attendanceSchema],
  gradeCard: [testResultSchema],
  notices: [noticeSchema]
});

const teacherSchema = new mongoose.Schema({
  username: String,
  role: String,
  //password: String,
  teacherName: String,
  mobileNum: String,
  subjects: [String],
  classes: [classSchema],
  classTeacherOf: classSchema,
  notices: [noticeSchema]
});

//_____________________________________________app.get()____________________________________
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the mySchool backend</h1>')
});

//___________________________________________________________________________________________

//MANUALLY ADDED SOME USERS

// User.register({username:"Admin" }, "123456" , function(err, user){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully Registered ");
//   }
// });

//__________________________________________________app.post()__________________________________________________


app.post("/login", function(req, res){
  console.log(req.body);
  
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err){
      if(err){
        console.log(err);
      }
      else{
        passport.authenticate("local")(req, res, function(){
          console.log("Admin logged in.");
        });//after authentication, send userInfo as a response.
      }
    });
});

app.post("/logout", function(req, res){
  req.logout();
  res.redirect("/");
  //send confirmation to frontend and redirect to homepage.
});




app.listen(port, () => {
  console.log("Server running on port ", port);
});
