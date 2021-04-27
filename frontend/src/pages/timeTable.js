import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AppBar } from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import { infoStyles } from './../components/InfoBar';
import MyAppBar from "../components/MyAppBar";
import tt from '../components/tt.jpg';
import teacherTT from '../components/teacherTimeTable.JPG';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      //color: "white",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function ShowTimeTable(props){

    return <div>
    <MyAppBar 
        loggedInStatus={props.loggedInStatus} 
        handleLogout={props.handleLogout} 
        userInfo={props.userInfo} 
        role={props.role} 
        appBarTitle="Time Table"
        />
    
    <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
        <Container component="main" maxWidth="md">
            <Grid container style={{ justifyContent: 'space-around' }}>
                <Grid item xs={12} sm={5} style={{ alignContent: 'right', float: 'left' }}>
                    <h3>The time-table for your class is shown below:</h3>
                </Grid>
            </Grid>   
        </Container>
    </Box>
    <Container component="main" maxWidth="md" style={{marginTop: "6%"}}>
        {props.role=="Student" ? <img src={tt} width="100%"></img> : <img src={teacherTT} width="100%"></img> }
    </Container>
    { (props.role==="Student" || props.role==="Teacher") && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
    </div>
}