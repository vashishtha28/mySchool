import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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


function MyAppBar(){
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" className={classes.title}>
                mySchool
            </Typography>
        </Toolbar>
    </AppBar>;
}

//Add a logout button too
export default MyAppBar;