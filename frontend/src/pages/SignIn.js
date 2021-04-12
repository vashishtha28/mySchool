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
import {Redirect, useHistory} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © mySchool '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    marginTop:"auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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

export default function SignIn(props) {
  
  const classes = useStyles();
  const history = useHistory();
//___________________________________Processing__________________________________________________
  
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "Student"
  });

  useEffect(()=>{
    if(props.loggedInStatus==="LOGGED-IN"){
      console.log(props.userInfo);
      history.push("/"+ props.role + "/profile");
    }

  }, [props.loggedInStatus]);
  
  async function handleSuccessfulLogin(data){
    //DONE: Update parent component
    await props.handleLogin(data);

    //Redirect
    console.log(props.loggedInStatus);
    console.log(props.userInfo);
    if(props.loggedInStatus==="LOGGED-IN")history.push("/"+ user.role + "/profile");

  }

  function handleChange(event){
    event.preventDefault();
    console.log(event.target);
    setUser((prev)=>{
      return {...prev, [event.target.name]: event.target.value};
    });
  }
  function handleSubmit(event){
    event.preventDefault();
    axios.post(server_url+ "/login", user)
    .then((response) => {
      console.log(response);
      if(response.data.message ==="LOGGED-IN") handleSuccessfulLogin(response.data);
      else if(response) alert(response.data.message);
    }, (error) => {
      console.log(error);
      alert("INCORRECT PASSWORD");
    });
  }
  //______________________________________________________________________ ______________________

  return (
    <div>
      <MyAppBar 
        loggedInStatus={props.loggedInStatus} 
        handleLogout={props.handleLogout} 
        userInfo={props.userInfo} 
        role={props.role} 
        appBarTitle="Sign in page"
        />
        
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "100px", mardinLeft:"auto", marginRight:"auto", padding: "1.3157894736842106vh 1.953125vw" }}>
        <div className={classes.paper} >
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            
            {/* FOR SELECTING ROLES :-- */}
            <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                  <FormHelperText>Enter your role in the school:</FormHelperText>
                  
                    <Select
                      labelId="role"
                      id="role"
                      name = "role"
                      value = {user.role}
                      onChange={handleChange}
                      className={classes.selectEmpty}
                      autoFocus
                      
                    >
                        <MenuItem value={"Student"}>Student</MenuItem>
                        <MenuItem value={"Teacher"}>Teacher</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                  
              </FormControl>
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label={user.role=="Student" && "Admission number" ||user.role=="Teacher" && "Email Id" || user.role=="Admin" && "username"}
              name="username"
              autoComplete="username"
              onChange = {handleChange}
              
              value = {user.username}
              
            />
            
            
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {handleChange}
              value = {user.password}
            />

            
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        </Grid>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}




//Remaining: Handle submit
//           Authentication
//           Edge cases and message display
//           Redirect after successful login with user data


