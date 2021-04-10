import React from 'react';
import './../infobar.css';
import { useStyles } from './../components/MyAppBar';
import {Redirect} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { infoStyles } from './../components/InfoBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MyAppBar from "../components/MyAppBar";

function TeacherDesk(props) {
    const classes = useStyles();
    const infoclasses = infoStyles();
    const subjectList = props.userInfo.subjects;
    const classList = props.userInfo.classes;

    return (
       <div style={{fontFamily:"Rosario"}}>
           <MyAppBar 
            loggedInStatus={props.loggedInStatus} 
            handleLogout={props.handleLogout} 
            userInfo={props.userInfo} 
            role={props.role} 
            appBarTitle="Teacher's Profile"
            />
            {/* <h1>{props.loggedInStatus}</h1> */}
            <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md" >
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12} sm={5} style={{ alignContent: 'right', float: 'left' }}>
                        <img src="https://i.ibb.co/1649P7S/teacher.png" alt="teacher" border="0" />
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ justifyContent: 'center' }}>
                    <table >
                        <tr>
                            <td>Name:</td>
                            <td>{props.userInfo.teacherName}</td>
                        </tr>
                        
                        <tr>
                            <td>Subject(s):</td>
                            {/* TODO: Handle this */}
                            <td>
                                {subjectList.map((sub)=>{
                                    return <tr><td>{sub}</td></tr>
                                })}
                            </td>
                        </tr>

                        <tr>
                            <td>Classes:</td>
                            {/* TODO: Handle this */}
                            <td>
                                {classList.map((c)=>{
                                    return <tr><td>{c.class}th {c.section}</td></tr>
                                })}
                            </td>
                        </tr>
                        {props.userInfo.classTeacherOf.class!=="" && props.userInfo.classTeacherOf.section!=="" && <tr>
                            <td>Class-teacher of:</td>
                            <td>{props.userInfo.classTeacherOf.class}th {props.userInfo.classTeacherOf.section}</td>
                        </tr>}

                        <tr>
                            <td>Phone No:</td>
                            <td>{props.userInfo.mobileNum}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{props.userInfo.username}</td>
                        </tr>
                        
                    </table>
                    </Grid>
                </Grid>
                </Container>
            </Box>
            <Container maxWidth="sm" style={{ color: 'white', marginTop: '20px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '500px', fontSize: '17px' }}>
                        Update Attendance
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#E96565', width: '500px', fontSize: '17px' }}>
                        Update Grades
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#00B594', width: '500px', fontSize: '17px' }}>
                        Teacher's Time Table
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#0097EC', width: '500px', fontSize: '17px' }}>
                        Curriculum
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#070107', width: '500px', fontSize: '17px' }}>
                        View Notices
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" style={{ color: 'white', backgroundColor: '#F8DE5B', width: '500px', fontSize: '17px' }}>
                        Generate Notice
                    </Button>
                    </Grid>
                </Grid>
            </Container>
            { props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
       </div>
    );
}

export default TeacherDesk;