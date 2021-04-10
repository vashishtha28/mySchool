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
        <Route exact path='/register/student' component={RegisterStudent}></Route>
        <Route exact path="/register/teacher" component={RegisterTeacher}></Route>
        <Route exact path="/update/timetable" component={UpdateTimeTable}></Route>
        <Route exact path="/update/curriculum" component={UpdateCurriculum}></Route>
        </Switch>

      </BrowserRouter>
  );
}

export default Main;