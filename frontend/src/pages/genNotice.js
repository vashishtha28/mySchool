import React, {useState, useEffect, Component} from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MyAppBar from '../components/MyAppBar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel, makeStyles } from '@material-ui/core';
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

export default function GenerateNotice() {
    const [clas, setClas] = useState('');
    const [section, setSection] = useState('');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const [date, setDate] = useState(today);
    const classes = useStyles();

    function handleClassChange(event) {
        event.preventDefault();
        setClas(event.target.value);
    }

    function handleSectionChange(event) {
        event.preventDefault();
        setSection(event.target.value);
    }

    const handleDateChange = (date) => {
        setDate(date);
    };

    return (
        <div>
            <MyAppBar appBarTitle="Generate Notice"/>
            <form className={classes.formControl} noValidate style={{ marginTop: '0px', marginLeft: '0px' }}>
                <Box style={{ backgroundColor: "#00ADB5", padding: '3.679890560875513vh', }}>
                    <Grid container spacing={3} style={{ justifyContent: 'space-around' }}>
                        <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" className={classes.form}>
                                <InputLabel id="simple-class-filled-label">Class</InputLabel>
                                <Select labelId="simple-class-filled-label" id="dsimple-class-filled" value={clas} onChange={handleClassChange} style={{ textAlign: 'left'}} >
                                    <MenuItem value={"1"}>1</MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3</MenuItem>
                                    <MenuItem value={"4"}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl variant="filled" className={classes.form}>
                                <InputLabel id="simple-section-filled-label">Section</InputLabel>
                                <Select labelId="simple-section-filled-label" id="dsimple-section-filled" value={section} onChange={handleSectionChange} style={{ textAlign: 'left' }}>
                                    <MenuItem value={"A"}>A</MenuItem>
                                    <MenuItem value={"B"}>B</MenuItem>
                                    <MenuItem value={"C"}>C</MenuItem>
                                    <MenuItem value={"D"}>D</MenuItem>
                                </Select>
                            </FormControl>
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
                    <Grid container spacing={3} style={{ justifyContent: 'space-around' }}>
                        <Grid item xs={12}>
                            <TextField id="filled-basic" label="Notice Title" variant="filled" style={{ width: '100%' }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize aria-label="Body" placeholder="Notice Body" style={{ backgroundColor: '#DCDCDC', fontSize: '16px', padding: '16px', border: 'none', minWidth: '78vw', minHeight: '40vh' }}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" style={{ backgroundColor: '#E96565', width: '50%', color: 'white' }}>
                                Discard
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" style={{ backgroundColor: '#00B594', width: '50%', color: 'white' }}>
                                Send
                            </Button>                   
                        </Grid>
                    </Grid>
                </Container>
            </form>
            
        </div>
    );
}