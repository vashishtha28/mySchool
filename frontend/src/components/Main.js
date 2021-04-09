import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import StudentProfile from "../pages/studentProfile";
import TeacherProfile from "../pages/teacherDesk";
import AdminProfile from "../pages/AdminWelcome";
import RegisterStudent from '../pages/RegisterStudent';
import RegisterTeacher from '../pages/RegisterTeacher';
import GenerateNotice from './../pages/genNotice';
import StudentAttendance from './../pages/studentAttendance';
import GradeCard from './../pages/StudentGrade';

const Main = () => {
  return (
      <BrowserRouter>
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            {/* following is the list of all the pages and there corresponding routes ..*/}
          <Route exact path='/' component={SignIn}></Route>
          <Route exact path='/student/profile' component={StudentProfile}></Route>
          <Route exact path='/teacher/profile' component={TeacherProfile}></Route>
          <Route exact path='/admin/profile' component={AdminProfile}></Route>
          <Route exact path='/register/student' component={RegisterStudent}></Route>
          <Route exact path="/register/teacher" component={RegisterTeacher}></Route>
          <Route exact path='/admin/generateNotice' component={GenerateNotice}></Route>
          <Route exact path='/student/attendance' component={StudentAttendance}></Route>
          <Route exact path='/student/gradeCard' component={GradeCard}></Route>
        </Switch>

      </BrowserRouter>
  );
}

export default Main;