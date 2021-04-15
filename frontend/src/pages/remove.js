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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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

function Remove(props){
    const classes = useStyles();
    const [notFound, setNotFound] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState({
        username:"",
        role:"Student"
    });
    const [open, setOpen] = React.useState(false);
    
    function handleChange(event){
        setNotFound(false);
        setSuccess(false);
        event.preventDefault();
        console.log(event.target);
        setUser((prev)=>{
          return {...prev, [event.target.name]: event.target.value};
        });
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.post(server_url+"/remove/user", user)
        .then((response)=>{
            console.log(response.data.message);
            if(response.data.message==="SUCCESS"){
              setNotFound(false);
              setSuccess(true);
            }
            else{
              setNotFound(true);
              setSuccess(false);
            }
            setOpen(false);

        }, (error)=>{
            console.log(error);
        });

    }

    function handleClickOpen(event){
        event.preventDefault();
        setOpen(true);
      };

    function handleClose(event){
        event.preventDefault();
        setOpen(false);
      };

    return <div>
        <MyAppBar 
        loggedInStatus={props.loggedInStatus} 
        handleLogout={props.handleLogout} 
        userInfo={props.userInfo} 
        role={props.role} 
        appBarTitle=""
        />
        <Container  component="main" maxWidth="xs">
            <CssBaseline />
            <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "100px", mardinLeft:"auto", marginRight:"auto", padding: "1.3157894736842106vh 1.953125vw" }}>
                <form className={classes.form} noValidate>
                <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                  <FormHelperText>Select category:</FormHelperText>
                  
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
            {notFound && <FormHelperText style={{color:"red"}}><strong>USER NOT FOUND</strong></FormHelperText>}
            {success && <FormHelperText style = {{color:"green"}}><strong>SUCCESSFULLY REMOVED USER</strong></FormHelperText>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{background:"#E96565", color:"#ffffff"}}
                className={classes.submit}
                onClick={handleClickOpen}
                >
                REMOVE USER
            </Button>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to remove this user?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                ALL THE USER DATA WILL BE DELETED. Any information related to the removed user will not be accessible to anyone. Do you still want to proceed? 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} style={{background:"#E96565", color:"#ffffff"}}>
                Proceed
            </Button>
            </DialogActions>
        </Dialog>
            
            
                </form>
            </Grid>
        </Container>
        { props.role==="Admin" && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }     
    </div>;

}

export default Remove;