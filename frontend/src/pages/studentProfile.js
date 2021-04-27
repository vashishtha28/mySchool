import React from 'react';
import {Redirect, useHistory, NavLink} from "react-router-dom";
import './../infobar.css';
import MyAppBar, { useStyles } from './../components/MyAppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { infoStyles } from './../components/InfoBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';


function StudentProfile(props) {    
    const classes = useStyles();
    const history = useHistory();
    const infoclasses = infoStyles();

    function handleNotice(event){
        event.preventDefault();
        history.push("/view/notice");
    }
    
    function handleGrades(event){
        event.preventDefault();
        console.log("clicked");
        history.push("/student/grades");
    }

    function handleAttendance(){
        history.push("/student/attendance");
    }

    return (
        <div>
            <MyAppBar 
                loggedInStatus={props.loggedInStatus} 
                handleLogout={props.handleLogout} 
                userInfo={props.userInfo} 
                role={props.role} 
                appBarTitle="Student's Profile"
                
            />
            {/* <h1>{props.userInfo.studentName}</h1> */}
            <div>
            <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md">
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12} sm={5} style={{ alignContent: 'right', float: 'left' }}>
                        <img src="https://i.ibb.co/MffS1m6/student.png" />
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ justifyContent: 'center' }}>
                    <table>
                        <tr>
                            <td>Student Name:</td>
                            <td>{props.userInfo.studentName}</td>
                        </tr>
                        <tr>
                            <td>Class:</td>
                            <td>{props.userInfo.class}th {props.userInfo.section}</td>
                        </tr>
                        <tr>
                            <td>Roll No:</td>
                            <td>{props.userInfo.rollNum}</td>
                        </tr>
                        <tr>
                            <td>Admission No:</td>
                            <td>{props.userInfo.username}</td>
                        </tr>
                        <tr>
                            <td>Father's Name:</td>
                            <td>Mr. {props.userInfo.fatherName}</td>
                        </tr>
                        <tr>
                            <td>Mother's Name:</td>
                            <td>Mrs. {props.userInfo.motherName}</td>
                        </tr>
                        <tr>
                            <td>Parent's Email:</td>
                            <td>{props.userInfo.parentEmailId}</td>
                        </tr>
                        <tr>
                            <td>Parent's Contact:</td>
                            <td>{props.userInfo.parentContact}</td>
                        </tr>
                    </table>
                    </Grid>
                </Grid>
                </Container>
            </Box>
            <Container maxWidth="md" style={{color: 'white', display: 'flex', marginBottom: '21px', marginTop: '12px'}}>
                <Grid container spacing={3} style={{ justifyContent: 'space-evenly', alignContent: 'center', marginTop:"10px"  }}>
                    <Grid item xs={6} sm={4}>
                        <Paper classes={infoclasses.paper} style={{ backgroundColor:"#C293FF", color:'#fff', padding: '15px', fontSize: '20px', fontWeight: '600', borderRadius:"20px"}} onClick = {handleAttendance}>
                            <img src="https://img.icons8.com/color/110/000000/inspection.png"/>
                            <br></br>
                            Attendance
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Paper classes={infoclasses.paper} style={{ backgroundColor:"#E96565", color:'#fff', padding: '15px', fontSize: '20px', fontWeight: '600', borderRadius:"20px" }} onClick = {handleGrades}>
                            <img src="https://img.icons8.com/color/110/000000/warranty-card.png"/>
                            <br></br>
                            Grade Card
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Paper classes={infoclasses.paper} style={{ backgroundColor:"#010207", color:'#fff', padding: '15px', fontSize: '20px', fontWeight: '600', borderRadius:"20px" }} onClick = {handleNotice}>
                            <img src="https://img.icons8.com/color/110/000000/alarm.png"/>
                            <br></br>
                            Notice
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="md" style={{color: 'white', display: 'flex' }}>
                <Grid container spacing={3} style={{ justifyContent: 'space-evenly'}}>
                    <Grid item xs={6} sm={4}>
                        <Paper classes={infoclasses.paper} style={{ backgroundColor:"#00B594", color:'#fff', padding: '15px', fontSize: '20px', fontWeight: '600', borderRadius:"20px" }}>
                            <img src="https://img.icons8.com/color/110/000000/overtime.png"/>
                            <br></br>
                            Time Table
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Paper classes={infoclasses.paper} style={{ backgroundColor:"#F8DE5B", color:'#fff', padding: '15px', fontSize: '20px', fontWeight: '600', borderRadius:"20px" }}>
                            <img src="https://img.icons8.com/color/110/000000/book-shelf.png"/>
                            <br></br>
                            Curriculum
                        </Paper>
                    </Grid>
                </Grid>
            </Container>  
            </div>
            { props.role==="Student" && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
        </div>
    );
}

export default StudentProfile;