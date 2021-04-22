import React, {useState, useEffect, Component} from 'react';
import {useHistory, Redirect} from "react-router-dom";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MyAppBar from '../components/MyAppBar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText, InputLabel, makeStyles, Typography } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import server_url from '../components/ServerLink';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: '40%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    }
}));

export default function GenerateNotice(props) {
    const history = useHistory();
    const [isEmpty, setEmpty] = useState(false);
    const [submitted, setSubmit] = useState(false);
    const [clas, setClas] = useState("All");
    const [section, setSection] = useState("All");
    const [notice, setNotice] = useState({
        title: "",
        body: ""
    });
    

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const [date, setDate] = useState(today);
    const classes = useStyles();
    const [noticeData, setNoticeData] = useState({
        class: "All",
        section: "All",
        date: date,
        title: "",
        body: "",
        sender: props.role

    });

    function handleClassChange(event) {
        event.preventDefault();
        setEmpty(false);
        setSubmit(false);
        setClas(event.target.value);
        setNoticeData((prev)=>{
            return {...prev, class: event.target.value}
        });
    }

    function handleSectionChange(event) {
        event.preventDefault();
        setEmpty(false);
        setSubmit(false);
        setSection(event.target.value);
        setNoticeData((prev)=>{
            return {...prev, section: event.target.value}
        });
    }

    const handleDateChange = (date) => {
        setDate(date);
    };

    function handleNoticeChange(event){
        event.preventDefault();
        console.log(noticeData);
        setEmpty(false);
        setSubmit(false);
        setNotice((prev)=>{
            return {...prev, [event.target.name]: event.target.value};
        });
        setNoticeData((prev)=>{
            return {...prev, [event.target.name]: event.target.value};
        })
    }

    function handleCancel(){
        setEmpty(false);
        setSubmit(false);
        setNotice({
            title:"",
            body:""
        });
        setNoticeData({
            class: "All",
            section: "A",
            date: today,
            title: "",
            body: "",
            sender: props.user
        });
        history.push("/admin/profile");

    }

    function handleSubmit(event){
        event.preventDefault();
        if(noticeData.title==="" || noticeData.body===""){
            setEmpty(true);
        }
        else{
            setEmpty(false);
            axios.post(server_url+"/generate/student/notice", noticeData)
            .then((response)=>{
                console.log(response.data);
                setSubmit(true);
                setNotice({
                    title:"",
                    body:""
                });
                setNoticeData({
                    class: "",
                    section: "",
                    date: today,
                    title: "",
                    body: "",
                    sender: props.role
                });

            }, (error)=> {
                console.log(error);
            });

        }
        console.log(noticeData);
        

    }

    return (
        <div>
            <MyAppBar 
            loggedInStatus={props.loggedInStatus} 
            handleLogout={props.handleLogout} 
            userInfo={props.userInfo} 
            role={props.role} 
            appBarTitle="Generate Notice for students"
            />
            <form className={classes.formControl} noValidate style={{ marginTop: '0px', marginLeft: '0px' }}>
                <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                    <Grid container spacing={3} style={{ justifyContent: 'space-around' }}>
                        <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" className={classes.form}>
                                <InputLabel id="simple-class-filled-label">Class</InputLabel>
                                <Select labelId="simple-class-filled-label" id="dsimple-class-filled" value={clas} onChange={handleClassChange} style={{ textAlign: 'left'}} >
                                <MenuItem value={"All"}>All</MenuItem>
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
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {clas!=="All" && <FormControl variant="filled" className={classes.form}>
                                <InputLabel id="simple-section-filled-label">Section</InputLabel>
                                <Select labelId="simple-section-filled-label" id="dsimple-section-filled" value={section} onChange={handleSectionChange} style={{ textAlign: 'left' }}>
                                    <MenuItem value={"All"}>All</MenuItem>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                    <MenuItem value={"C"}>C</MenuItem>
                                    <MenuItem value={"D"}>D</MenuItem>
                                    <MenuItem value={"E"}>E</MenuItem>
                                    <MenuItem value={"F"}>F</MenuItem>
                                    <MenuItem value={"G"}>G</MenuItem>
                                    <MenuItem value={"H"}>H</MenuItem>
                                    <MenuItem value={"I"}>I</MenuItem>
                                    <MenuItem value={"J"}>J</MenuItem>
                                    <MenuItem value={"K"}>K</MenuItem>
                                    <MenuItem value={"L"}>L</MenuItem>
                                    <MenuItem value={"M"}>M</MenuItem>
                                    <MenuItem value={"N"}>N</MenuItem>
                                    <MenuItem value={"O"}>O</MenuItem>
                                    <MenuItem value={"P"}>P</MenuItem>
                                    <MenuItem value={"Q"}>Q</MenuItem>
                                    <MenuItem value={"R"}>R</MenuItem>
                                    <MenuItem value={"S"}>S</MenuItem>
                                    <MenuItem value={"T"}>T</MenuItem>
                                    <MenuItem value={"U"}>U</MenuItem>
                                    <MenuItem value={"V"}>V</MenuItem>
                                    <MenuItem value={"W"}>W</MenuItem>
                                    <MenuItem value={"X"}>X</MenuItem>
                                    <MenuItem value={"Y"}>Y</MenuItem>
                                    <MenuItem value={"Z"}>Z</MenuItem>
                                </Select>
                            </FormControl>}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.formControl}>
                                <KeyboardDatePicker
                                // disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date"
                                value={date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.form}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </Box>
                <Container maxWidth="lg" style={{ marginTop: '12px', maarginBottom: '12px' }}>
                    <Grid container spacing={3} style={{ justifyContent: 'space-around',}}>
                                
                    {isEmpty && <Typography style={{color:"red"}}>** FAILED: Some fields were left empty. Please fill them. **</Typography>}
                    {submitted && <Typography variant="h5" style={{color:"Green"}}><strong>Notice Sent</strong></Typography>}
                        <Grid item xs={12}>
                            <TextField id="filled-basic" label="Notice Title" name="title" value = {notice.title} onChange = {handleNoticeChange} variant="filled" style={{ width: '100%' }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize aria-label="Body" placeholder="Notice Body" name="body" value = {notice.body} onChange = {handleNoticeChange} style={{ backgroundColor: '#DCDCDC', fontSize: '16px', padding: '16px', border: 'none', minWidth: '70vw', minHeight: '40vh' }}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" style={{ backgroundColor: '#E96565', width: '50%', color: 'white' }} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" style={{ backgroundColor: '#00B594', width: '50%', color: 'white' }} onClick = {handleSubmit}>
                                Send
                            </Button>                   
                        </Grid>
                    </Grid>
                </Container>
            </form>
            { (props.role==="Admin" || props.role==="Teacher") && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
            
        </div>
    );
}