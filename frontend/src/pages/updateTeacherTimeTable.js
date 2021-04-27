import React, {useState, useEffect} from 'react';
import {Redirect, useHistory} from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function TeacherTimeTable(props) {
  const history = useHistory();
  const classes = useStyles();
  const infoclasses = infoStyles();
  const [currentClass, setClass] = useState({
      class : "",
      section : "",
  });
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setClass((prev)=>{
        return {...prev, [event.target.name]: event.target.value};
    });
  };
  function handleSubmit(event){
    history.push("/");
   }

  return (
    <div>
        <MyAppBar 
        loggedInStatus={props.loggedInStatus} 
        handleLogout={props.handleLogout} 
        userInfo={props.userInfo} 
        role={props.role} 
        appBarTitle="Update Teacher's Time-Table"
        />
        <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md">
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}>
                        <h3>Select the Teacher to update their corresponding Time Table</h3>
                    </Grid>
                </Grid>
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}  style={{ alignContent: 'right', float: 'left' }}>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="class">Teacher</InputLabel>
                      <Select
                        labelId="class"
                        id="class"
                        name = "class"
                        value={currentClass.class}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"1"}>Teacher 1</MenuItem>
                        <MenuItem value={"2"}>Teacher 2</MenuItem>
                        <MenuItem value={"3"}>Teacher 3</MenuItem>
                        <MenuItem value={"4"}>Teacher 4</MenuItem>
                        <MenuItem value={"5"}>Teacher 5</MenuItem>
                        <MenuItem value={"6"}>Teacher 6</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                </Grid>
                </Container>
            </Box>
            <br></br><br></br>
        <div>
          <p>Please Upload the Corresponding file:    
          <input
            accept="pdf/*"
            className={classes.input}
            style={{ display: 'none' }}
            id="contained-button-file"
            multiple
            type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="secondary" size="medium" component="span" style={{marginLeft:"20px"}}>
                Upload
                </Button>
            </label>
          </p>
        </div>
        <Container component="main" maxWidth="md">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          style={{padding: "10px", background:"#00B594", width:"30%", margin:"0.625rem"}}
          onClick = {handleSubmit}
        >
                Submit
        </Button>
        </Container>   
        { props.role==="Admin"&&props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
    </div>
  );
}