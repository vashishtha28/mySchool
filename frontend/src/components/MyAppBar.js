import React, {useState} from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import server_url from "../components/ServerLink";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    gradientStyle : {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
  }));


  function MyAppBar(props){
    const classes = useStyles();
    const userinfo = props.userInfo;
    const role = props.role;
    const [user, setUser] = useState({username: ""});
    const history = useHistory();
    function handleLogout(){

    }

  async function handleSuccessfulLogout(event){
    event.preventDefault();
    //do all only when loggedInStatus===LOGGED-IN
    if(props.loggedInStatus==="LOGGED-IN"){
        if(props.role==="Student"){
          await setUser({username: props.userInfo.admissionNum});
        }
        else if(props.role==="Teacher"){
          await setUser({username: props.userInfo.emailId});
        }
        else if(props.role==="Admin"){
          await setUser({username: props.userInfo.username});
        }
    
        await axios.post(server_url+ "/logout", user)
        .then(async (response)=>{
          console.log(response.data.message); //Successfully LoggedOut
          await props.handleLogout();
          //redirect to signin page
          history.push("/");
        }, (error)=>{
          console.log(error);
        });
    }
  }

    
    return <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "#222831" }}>
              <Toolbar style = {{justifyContent: 'space-between'}}>
                  <Typography variant="h5" className={classes.title}>
                      mySchool
                  </Typography>
                  <Typography variant="h4" className={classes.title}>
                      {props.appBarTitle}
                  </Typography>
                  <Button variant="outlined"  color="inherit" onClick={handleSuccessfulLogout}>Logout</Button>
              </Toolbar>
          </AppBar>

      </div> ;
}
export default MyAppBar;