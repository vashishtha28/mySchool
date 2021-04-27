require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const serverGlobalData = {
  user:{},
  role:"",
  loggedInStatus:"NOT_LOGGED-IN"
};
//TODO : : =>
//THIS WILL HAVE TO CHANGE OTHERWISE IT FAILS WHEN MULTIPLE USERS USE IT AT ONCE.
//WILL HAVE TO FETCH USER DATA BY COOKIES AND ALL.

const app = express();
const port = 5000;
//______________________________________App.use___________________________________________________
app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 60*60*1000
}
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
const Class = new mongoose.model("Class", classSchema);

const noticeSchema = new mongoose.Schema({
  date: String,
  title: String,
  content: String,
  sender: String,
});
const Notice = new mongoose.model("Notice", noticeSchema);

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
  parentContact: String,
  attendanceList: [attendanceSchema],
  gradeCard: [testResultSchema],
  notices: [noticeSchema]
});
const StudentInfo = new mongoose.model("StudentInfo", studentSchema);

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
const TeacherInfo = new mongoose.model("TeacherInfo", teacherSchema);

//_____________________________________________app.get()____________________________________
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the mySchool backend</h1>')
});

app.get('/checksession', function(req, res){
  // console.log(req.session);
  // if(req.isAuthenticated()){
  //   const serverGlobalData = {
  //     user:req.user,
  //     loggedInStatus:"LOGGED-IN"
  //   };
  //   console.log(req.user);
  //   res.send(serverGlobalData);
  // }
  // else{
  //   console.log(req.user);
  //   console.log("no user Signed in");
  //   const serverGlobalData = {
  //     user:{},
  //     role:"",
  //     loggedInStatus:"NOT_LOGGED-IN"
  //   };
  //   res.send(serverGlobalData);
  // }
  console.log(serverGlobalData);
  res.send(serverGlobalData);
  

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

app.post("/register/teacher", async function(req, res){
  console.log(req.body);
  //register from passport in USERs
  await User.register({username: req.body.emailId}, req.body.password, async function(err, user){
    if(err){
      console.log(err);
    }
    else{
      console.log("Teacher successfully registered");
      const newClass = new Class({
        class: req.body.classTeacherOfClass,
        section: req.body.classTeacherOfSection
      });

      const newTeacher = new TeacherInfo({
        username: req.body.emailId,
        role: "Teacher",
        teacherName: req.body.teacherName,
        mobileNum: req.body.mobileNum,
        classes: req.body.classes,
        classTeacherOf:newClass, //pending,
        subjects: req.body.subjects,
        notices: []
      });

      newTeacher.save(function(err){
       if(err){
         console.log(err);
       }
       else{
         console.log("Teacher info saved successfuly");
         res.send({message: "registered and saved Teacher"});
       }
     });
    }
  });
});

app.post("/register/student", async function(req, res){
  //register from passport in USERs
  await User.register({username: req.body.admissionNum}, req.body.password, async function(err, user){
    if(err){
      console.log(err);
    }
    else{
      console.log("Student successfully registered");
      const newStudent = new StudentInfo({
        username: req.body.admissionNum,
        role: "Student",
        studentName: req.body.studentName,
        class: req.body.class,
        section: req.body.section,
        rollNum: req.body.rollNum,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        parentEmailId: req.body.parentEmailId,
        parentContact: req.body.parentContact,
        attendanceList:[],
        gradeCard: [],
        notices: []
      });

      newStudent.save(function(err){
       if(err){
         console.log(err);
       }
       else{
         console.log("Student info saved successfuly");
         res.send({message: "registered and saved student"});
       }
     });
    }
  });
});

app.post("/login", function(req, res){
  // console.log(req.body);
  // console.log(req.session);
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    User.exists({username: req.body.username}, function (err, doc) {
      if (err){
          console.log(err)
      }else{
          if(!doc){
            //USER DOES NOT EXIST
            res.send({message:"USER NOT FOUND", role:"", userInfo:{}});
          }
          else{
            //REST ALL HAPPENS HERE
            req.login(user, function(err){
              if(err){
                console.log(err);
                res.send({message:"LOGIN-FAILED", role:"", userInfo:{}});
              }
              else{
                passport.authenticate("local")(req, res, function(){                  
                  
                  //after authentication, send userInfo as a response (if its not admin)
                  if(req.body.role==="Student"){
                    StudentInfo.exists({username: req.body.username}, function(errorr, studDoc){
                      if(errorr)console.log(errorr);
                      else{
                        if(studDoc){
                          //=> such student exists
                          StudentInfo.find({ username: req.body.username}, function (err, docs) {
                            if(err){
                              console.log(err);
                            }
                            else{
                              console.log(docs);
                              console.log(req.user);
                              serverGlobalData.user = docs[0];
                              serverGlobalData.role = "Student";
                              serverGlobalData.loggedInStatus = "LOGGED-IN";
                              //console.log(req.isAuthenticated());///////////////////////////////////////////////////////////////
                              console.log(req.body.role+ " logged in.");
                              res.send({message: "LOGGED-IN", role:"Student", userInfo: docs[0]});
                            }
                          });
                        }else{
                          res.send({message:"LOGIN FAILED: ROLE MISMATCH"});
                        }
                      }
                    });
                  }
                  else if(req.body.role==="Teacher"){
                    TeacherInfo.exists({username: req.body.username}, function(errorr, teacherDoc){
                      if(errorr)console.log(errorr);
                      else{
                        if(teacherDoc){
                          TeacherInfo.find({ username: req.body.username}, function (err, docs) {
                            if(err){
                              console.log(err);
                            }
                            else{
                              console.log(docs);
                              serverGlobalData.user = docs[0];
                              serverGlobalData.role = "Teacher";
                              serverGlobalData.loggedInStatus = "LOGGED-IN";
                              console.log(req.body.role+ " logged in.");
                              res.send({message: "LOGGED-IN", role:"Teacher", userInfo: docs[0]});
                            }
                          });
                        }else{
                          res.send({message:"LOGIN FAILED: ROLE MISMATCH"});
                        }
                      }
                    })
                  }
                  else if(req.body.role==="Admin"){
                    StudentInfo.exists({username: req.body.username}, function(E, stuDOC){
                      if(E)console.log(E);
                      else{
                        if(!stuDOC){
                          TeacherInfo.exists({username: req.body.username}, function(ERROR, teaDocs){
                            if(ERROR)consle.log(ERROR);
                            else{
                              if(!teaDocs){
                                //=> IT IS NONE OTHER THAN the ADMIN
                                serverGlobalData.user = {};
                                serverGlobalData.role = "Admin";
                                serverGlobalData.loggedInStatus = "LOGGED-IN";
                                console.log(req.body.role+ " logged in.");
                                res.send({message:"LOGGED-IN", role:"Admin", userInfo: {}});
                                
                              }else{//It was a Teacher
                                res.send({message:"LOGIN FAILED: ROLE MISMATCH"});
                              }
                            }
                          });

                        }else{//It was a student
                          res.send({message:"LOGIN FAILED: ROLE MISMATCH"});
                        }
                      }
                    });
                      
                        
                  }
        
                });
              }
            });

          }
      }
  });
    
  
});

app.post("/logout", async function(req, res){
  //console.log(req.isAuthenticated());//////////////////////////////////////////////////////////////////////////////////
  await req.logout();
  serverGlobalData.user = {};
  serverGlobalData.role = "";
  serverGlobalData.loggedInStatus = "NOT_LOGGED-IN";
  console.log("Logged out user");
  res.send({message:"Successfully logged out"});
});

app.post("/checkuser", function(req, res){
  console.log(req.body);
  User.find({ username: req.body.userName}, function (err, docs) {
    if(err){
      console.log(err);
    }
    else{
      if(!docs){
        res.send({message: "username available"});
      }
      else{
        res.send({message: "user already registered"});
      }
    }
  });
  
});

app.post("/remove/user", function(req, res){
  console.log(req.body);
  User.exists({username:req.body.username}, function (err, doc) {
    if (err){
        console.log(err)
    }
    else{
      if(!doc) res.send({message: "USER NOT FOUND"});
      else{
        if(req.body.role==="Student"){
        StudentInfo.exists({username:req.body.username}, function(err, studDoc){
          if(!studDoc){
            res.send({message: "There is no such student."});
          }
          else{
            StudentInfo.deleteOne({ username: req.body.username }).then(function(){
              console.log("Student Info deleted"); // Success
              //also delete user credentials
              User.deleteOne({ username: req.body.username }).then(function(){
                console.log("student credentials deleted"); // Success
                res.send({message: "SUCCESS"});
              }).catch(function(error){
                console.log(error); // Failure
              });
            }).catch(function(error){
              console.log(error); // Failure
          });
          }
        })

      }

      else if(req.body.role==="Teacher"){
        TeacherInfo.exists({username:req.body.userName}, function(err, teaDoc){
          if(!teaDoc){
            res.send({message: "There is no such teacher."});
          }
          else{
            TeacherInfo.deleteOne({ username: req.body.userName }).then(function(){
              console.log("Teacher Info deleted"); // Success
              //also delete user credentials
              User.deleteOne({ username: req.body.userName }).then(function(){
                console.log("Teacher credentials deleted"); // Success
                res.send({message: "SUCCESS"});
              }).catch(function(error){
                console.log(error); // Failure
              });
            }).catch(function(error){
              console.log(error); // Failure
            });
          }
        });
      }
    }
  }

      });
});

app.post("/class/student/list", function(req, res){
  console.log(req.body);
  StudentInfo.find({class: req.body.class, section: req.body.section}, function(err, students){
    if(err){console.log(err);
      res.send({message:"FAILED", studentList:[]});
    }
    else{
      res.send({message:"SUCCESS", studentList:students});
    }

  });

});

app.post("/generate/student/notice", async function(req, res){
  console.log(req.body);
  const notice = new Notice;
  notice.date = req.body.date;
  notice.title = req.body.title;
  notice.content = req.body.body;
  notice.sender = req.body.sender;

  if(req.body.class==="All"){
    StudentInfo.updateMany({}, 
      { $addToSet: { notices: notice} }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
  });
  }
  else if(req.body.section==="All"){
    StudentInfo.updateMany({class: req.body.class}, 
      { $addToSet: { notices: notice} }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
  });
  }

  else{
    StudentInfo.updateMany({class: req.body.class, section: req.body.section}, 
      { $addToSet: { notices: notice} }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
  });
  }
  res.send({message: "received notice"});
});

app.post("/update/attendance", function(req, res){
  const selectedDate = req.body.date;
  const presentList = req.body.list;
  const attendanceData = {
    date: selectedDate,
    isPresent: true
  }
  presentList.forEach((student)=>{
    StudentInfo.updateOne({_id:student._id}, { $addToSet: { attendanceList: attendanceData} }, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated Docs : ", docs);
      }
    });
  });
  res.send({message:"received attendance data"});
});


app.listen(port, () => {
  console.log("Server running on port ", port);
});
