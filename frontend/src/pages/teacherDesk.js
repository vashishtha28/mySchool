import React from 'react';
import './../infobar.css';
import { useStyles } from './../components/MyAppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { infoStyles } from './../components/InfoBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MyAppBar from "../components/MyAppBar";

function TeacherDesk() {
    const classes = useStyles();
    const infoclasses = infoStyles();

    return (
       <div>
           <MyAppBar/>
            <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md">
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12} sm={5} style={{ alignContent: 'right', float: 'left' }}>
                        <img src="https://i.ibb.co/1649P7S/teacher.png" alt="teacher" border="0" />
                    </Grid>
                    <Grid item xs={12} sm={7} style={{ justifyContent: 'center' }}>
                    <table>
                        <tr>
                            <td>Teacher Name:</td>
                            <td>xxxxxxxxxxx xxxxxxxxxxx</td>
                        </tr>
                        <tr>
                            <td>Subjects:</td>
                            <td>Sub1, Sub2, Sub3, Sub4</td>
                        </tr>
                        <tr>
                            <td>Phone No:</td>
                            <td>1234567890</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>ektohmailid@gmail.com</td>
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
       </div>
    );
}

export default TeacherDesk;