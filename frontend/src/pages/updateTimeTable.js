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


export default function TimeTable(props) {
  const classes = useStyles();
  const history =useHistory();
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
        appBarTitle="Update Time-Table"
        />
        <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md">
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}>
                        <h3>Select the Class and Section to update its Time Table</h3>
                    </Grid>
                </Grid>
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}  style={{ alignContent: 'right', float: 'left' }}>
                    <FormControl className={classes.formControl}>
                    <InputLabel id="class">Class</InputLabel>
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
                        <MenuItem value={"1"}>1</MenuItem>
                        <MenuItem value={"2"}>2</MenuItem>
                        <MenuItem value={"3"}>3</MenuItem>
                        <MenuItem value={"4"}>4</MenuItem>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"6"}>6</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"8"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"11"}>11</MenuItem>
                        <MenuItem value={"12"}>12</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="section">Section</InputLabel>
                      <Select
                        labelId="section"
                        id="section"
                        name = "section"
                        value={currentClass.section}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                        required
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"B"}>B</MenuItem>
                        <MenuItem value={"C"}>C</MenuItem>
                        <MenuItem value={"D"}>D</MenuItem>
                        <MenuItem value={"E"}>E</MenuItem>
                        <MenuItem value={"F"}>F</MenuItem>
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