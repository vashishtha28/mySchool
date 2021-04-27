import React, {useState, useEffect} from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import axios from "axios";
import SignIn from '../pages/SignIn';
import StudentProfile from "../pages/studentProfile";
import TeacherProfile from "../pages/teacherDesk";
import AdminProfile from "../pages/AdminWelcome";
import RegisterStudent from '../pages/RegisterStudent';
import RegisterTeacher from '../pages/RegisterTeacher';
import UpdateTimeTable from '../pages/updateTimeTable';
import UpdateCurriculum from '../pages/update_curriculum';
import UpdateAttendance from "../pages/updateAttendance";
import GenerateNotice from "../pages/genNotice";
import ViewNotice from "../pages/noticePage";
import UpdateGrades from "../pages/updateGrades";
import StudentGrade from "../pages/StudentGrade";
import StudentAttendance from "../pages/studentAttendance";
import StudentTimeTable from "../pages/timeTable";
import UpdateTeacherTimeTable from "../pages/updateTeacherTimeTable";
import Remove from "../pages/remove";
import server_url from './ServerLink';


const Main = () => {

  const [globalData, setGlobalData] = useState({
    user:{},
    role:"",
    loggedInStatus:"NOT_LOGGED-IN"
  });

  //check cookie data in the beginning
  useEffect(()=>{
    axios.get(server_url+"/checksession")
    .then((response)=>{
      setGlobalData({
        user: response.data.user,
        role: response.data.role,
        loggedInStatus: response.data.loggedInStatus
      });
    })
    .catch((error)=>{
      console.log(error);
    });

  },[]);

  async function handleLogin(data){
    await setGlobalData({
      user: data.userInfo,
      role: data.role,
      loggedInStatus:"LOGGED-IN"
    });

  }
  async function handleLogout(){
    await setGlobalData({
      user: {},
      role:"",
      loggedInStatus:"NOT_LOGGED-IN"
    });

  }

  return (
      <BrowserRouter>
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            {/* following is the list of all the pages and there corresponding routes ..*/}
        <Route 
        exact 
        path='/' 
        
        render = {props =>(
          <SignIn 
            {...props} 
            handleLogin = {handleLogin} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}/>
        <Route 
        exact 
        path='/student/profile' 
        render = {props =>(
          <StudentProfile 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route 
        exact 
        path='/teacher/profile'
        render = {props =>(
          <TeacherProfile 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )} 
        ></Route>
        <Route 
        exact 
        path='/admin/profile'
        render = {props =>(
          <AdminProfile 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )} 
        ></Route>
        <Route 
        exact 
        path='/register/student' 
        render = {props =>(
          <RegisterStudent 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>
        <Route
         exact 
         path="/register/teacher" 
         render = {props =>(
          <RegisterTeacher 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>
        <Route 
        exact 
        path='/remove/user' 
        render = {props =>(
          <Remove 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route 
        exact 
        path='/generate/notice' 
        render = {props =>(
          <GenerateNotice 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route 
        exact 
        path='/view/notice' 
        render = {props =>(
          <ViewNotice 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/update/attendance" 
         render = {props =>(
          <UpdateAttendance 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/update/grades" 
         render = {props =>(
          <UpdateGrades 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/student/grades" 
         render = {props =>(
          <StudentGrade 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/student/attendance" 
         render = {props =>(
          <StudentAttendance 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/student/timetable" 
         render = {props =>(
          <StudentTimeTable 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/update/timetable" 
         render = {props =>(
          <UpdateTimeTable 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/update/teacher/timetable" 
         render = {props =>(
          <UpdateTeacherTimeTable 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>

        <Route
         exact 
         path="/update/curriculum" 
         render = {props =>(
          <UpdateCurriculum 
            {...props} 
            handleLogout={handleLogout} 
            loggedInStatus={globalData.loggedInStatus} 
            userInfo={globalData.user} 
            role={globalData.role}/>
        )}></Route>
        </Switch>

      </BrowserRouter>
  );
}

export default Main;