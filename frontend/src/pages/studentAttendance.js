import React, {useState, useEffect, Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MyAppBar from '../components/MyAppBar';
import Calendar from './calendar';


export default function StudentAttendance(props) {
    return (
        <div>
           <MyAppBar 
            loggedInStatus={props.loggedInStatus} 
            handleLogout={props.handleLogout} 
            userInfo={props.userInfo} 
            role={props.role} 
            appBarTitle="Attendance history"
            />
            <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', fontWeight: '600'}}>
                <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                    <Grid item xs={6} md={2} style={{ textAlign: 'right' }}>
                        Classes held:
                    </Grid>
                    <Grid item xs={6} md={2} style={{ textAlign: 'left' }}>
                        27
                    </Grid>
                    <Grid item xs={6} md={2} style={{ textAlign: 'right' }}>
                        Classes attended:
                    </Grid>
                    <Grid item xs={6} md={2} style={{ textAlign: 'left' }}>
                        24
                    </Grid>
                    <Grid item xs={6} md={2} style={{ textAlign: 'right' }}>
                        Attendance:
                    </Grid>
                    <Grid item xs={6} md={2} style={{ textAlign: 'left' }}>
                        88.88% 
                        {/* 
                            Attendance = (attendedClasses/heldClasses)*100
                        */}
                    </Grid>
                </Grid>
            </Box>
            <h4>Date-wise Attendance Record</h4>
            <center><Calendar /></center>
            { props.role==="Student" && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
        </div>
        );
}
