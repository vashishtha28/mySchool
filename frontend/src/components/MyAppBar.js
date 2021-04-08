import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

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
    const signedInUser = props.user;
    //const history = useHistory();
    function handleLogout(){

    }
    // function handleLogout(event){
    // //   event.preventDefault();
    // //   await axios.post('http://localhost:5000/logout', signedInUser)
    // //   .then((response) => {
    // //     alert(response.data.message);
    // //   }, (error) => {
    // //     console.log(error);
    // //   });
    // // console.log(user);

    // //TO DO : SEND LOGOUT REQUEST TO SERVER TO SE ISSIGNEDIN TO FALSE

    // history.push('/');//NOW GO TO THE HOME PAGE: DONE

    // }
    
    return <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "#222831" }}>
              <Toolbar style = {{justifyContent: 'space-between'}}>
                  <Typography variant="h5" className={classes.title}>
                      mySchool
                  </Typography>
                  <Typography variant="h4" className={classes.title}>
                      {props.userName}
                  </Typography>
                  <Button variant="outlined"  color="inherit" onClick={handleLogout}>Logout</Button>
              </Toolbar>
          </AppBar>

      </div> ;
}
export default MyAppBar;