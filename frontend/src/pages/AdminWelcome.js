import React, {useState, useEffect} from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { AppBar } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MyAppBar from '../components/MyAppBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import server_url from "../components/ServerLink";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid:{
      marginTop: theme.spacing(10),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "white",
    background:
      "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
  },
}));


export default function AdminPage() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
    
      <MyAppBar appBarTitle="Welcome to MySchool"/>

      <Container component="main" maxWidth="md" style={{ marginTop: "10%"}}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: "#00B594"}} >Add Student</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: "#E96565"}}>Remove Student</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: "#00B594"}}>Add Teacher</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} style={{ background: "#E96565"}}>Remove teacher</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ background: "#0097EC"}}>Update Teacher's Time Table</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ background: "#0097EC"}}>Update Students's Time Table</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ background: "#0097EC"}}>Update Curriculum</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ background: "#010207"}}>Generate Notice</Paper>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}