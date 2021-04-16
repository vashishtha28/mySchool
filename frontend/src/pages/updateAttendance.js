import React, {useState, useEffect} from 'react';
import {Redirect, useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MyAppBar from "../components/MyAppBar";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid"
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { StylesProvider } from "@material-ui/core/styles";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import server_url from '../components/ServerLink';

const useStyles = makeStyles((theme) => ({
    
    form: {
      width: '100%', 
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      //color: "white",
    },
    root: {
        width: "100%",
        maxWidth: "500px",
        backgroundColor: theme.palette.background.paper,
        margin: "auto",
        paddingTop:"30px",
        flexGrow: 1,
     },
     formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

  }));

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#F50157',
      },
    }
    
  });

 
export default function Attendance(props){

    const classes = useStyles();
    const [studentInfoList, setStudentInfoList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [classTeacherOf, setClassTeacherOf] = useState({class:"", section:""});
    const [checkedStudent, setCheckedStudent] = useState([]); // Dekh lena isko

    useEffect(async ()=>{
      await setClassTeacherOf((prev)=>{
        const temp = prev;
        temp.class = props.userInfo.classTeacherOf.class;
        temp.section = props.userInfo.classTeacherOf.section;
        return temp;
      });
      axios.post(server_url+"/class/student/list", classTeacherOf)
      .then((response)=>{
        console.log(response.data.studentList);
        setStudentInfoList(response.data.studentList);
        setCheckedStudent(response.data.studentList);
      },(error) => {
        console.log(error);
      });

    }, []);



    const handleToggle = (value) => async () => {
        const currentIndex = checkedStudent.indexOf(value);
        const newChecked = [...checkedStudent];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        await setCheckedStudent(newChecked);
        console.log(checkedStudent);
      };

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
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    function handleSubmit(event){
      event.preventDefault();
      console.log("Success");
     }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    return <div>
        <MyAppBar 
        loggedInStatus={props.loggedInStatus} 
        handleLogout={props.handleLogout} 
        userInfo={props.userInfo} 
        role={props.role} 
        appBarTitle="Update Attendance"
        />
        <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                <Container component="main" maxWidth="md">
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}>
                        <h3>Please select the Class, Section and Date to update the attendance!</h3>
                    </Grid>
                </Grid>
                <Grid container style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={12}  style={{ alignContent: 'right', float: 'left' }}>                
                    <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.formControl}
                      margin="normal"
                      variant="inline"
                      id="date-picker-dialog"
                      label="Attendance for Date"
                      format="dd/MM/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria': 'change date',
                        'color': "primary"
                    }}
                    />

                    </MuiPickersUtilsProvider></ThemeProvider>
                    </Grid>
                </Grid>
                </Container>
            </Box>
            <br></br><br></br>
        <div>
        <Container>
         <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "50px", marginLeft:"auto",marginRight:"auto",marginBottom:"10px", paddingBottom: "30px", textAlign:"center"}}>
            
            <List dense className={classes.root}>
            <Typography component="h1" variant="h5">
                    Please update the attendance!
                </Typography>
                <hr/>
                {studentInfoList.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                    <ListItem key={value} button>
                    
                        <ListItemText id={labelId} primary={value.rollNum} />
                        <ListItemText id={labelId} primary={value.studentName} />
                        <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checkedStudent.indexOf(value) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                        />
                        </ListItemSecondaryAction>
                    </ListItem>
                    );
                })}
            </List>
            </Grid>
            </Container>
            </div>
      <div>
      <Container component="main" maxWidth="md">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          style={{padding: "10px", background:"#00B594", width:"30%", margin:"0.625rem"}}
        >
                Save
        </Button>
        <Button
          type="submit"
          //fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          style={{padding: "10px", background:"#E96565", width:"30%", margin:"0.625rem"}}
        >
                Discard
        </Button>
        </Container>   
      </div>
      
      { props.role==="Teacher" && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> } 
    </div>

}