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
    marginTop: theme.spacing(8),
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

export default function SignIn() {
  
  const classes = useStyles();
//___________________________________Processing__________________________________________________
  
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "Student"
  });

  function handleChange(event){
    setUser((prev)=>{
      return {...prev, [event.target.name]: event.target.value};
    });
  }
  function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:5000/login', user)
    .then((response) => {
      alert(response.data.message);
    }, (error) => {
      console.log(error);
    });
    console.log(user);
  }
  //____________________________________________________________________________________________

  return (
    <div>
      <MyAppBar/>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
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
                      value={user.role}
                      onChange={handleChange}
                      className={classes.selectEmpty}
                      
                      
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange = {handleChange}
              autoFocus
              value = {user.email}
              
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


