import React, { useState } from 'react';
import {Redirect, useHistory} from "react-router-dom";
import MyAppBar from './../components/MyAppBar';
import Box from '@material-ui/core/Box';
import { FormControl, InputLabel, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: '60%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100vh',
    },
}));

const subjectList = ["English", "Hindi", "Sanskrit", "Mathematics", "Physics", "Inorganic Chemistry", "Organic Chemistry", "Physical Chemistry", "Biology", "History", "Political Science", "Geography", "Economics", "Accountancy", "Business Studies", "Sociology", "Psychology"];

{/* Date    Test Description    Maximum Marks   Marks Scored    Percentage  */}
const columns = [    
    { id: 'date',     label: 'Date',             minWidth: '200', },
    { id: 'desc',     label: 'Test Description', minWidth: '170', },
    { id: 'maxmarks', label: 'Maximum Marks',    minWidth: '170',align: 'right', format: (value) => value.toFixed(2), },
    { id: 'scores',   label: 'Marks Scored',     minWidth: '170',align: 'right', format: (value) => value.toFixed(2), },
    { id: 'prcnt',    label: 'Percentage Marks', minWidth: '170',align: 'right', format: (value) => value.toFixed(2), },
];


function createData(date, desc, maxmarks, scores) {
    const prcnt = (scores/maxmarks)*100;
    return { date, desc, maxmarks, scores, prcnt };
}


function createdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;//January is 0!`

    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
}

    // var data = ["09/06/2015", "25/06/2015", "22/06/2015", "25/07/2015", "18/05/2015"];

    // data.sort(function(a,b) {
    //     a = a.split('/').reverse().join('');
    //     b = b.split('/').reverse().join('');
    //     return a > b ? 1 : a < b ? -1 : 0;
    // };

var date = createdate();

const rows = [
    createData(date, 'UnitTest1', 50, 46),
    createData(date, 'HalfYearly1', 100, 80),
    createData(date, 'ClassTest1', 10, 10),
    createData('20/04/2021', 'PracticalExam1', 10, 9),
    createData(date, 'UnitTest2', 50, 50),
    createData(date, 'PreBoards', 100, 90),
    createData('2/04/2021', 'FullYearly', 100, 97),
    createData(date, 'FullYearly', 100, 97),
    createData(date, 'ClassTest2', 10, 9),
    createData(date, 'PracticalExam2', 10, 10),
    createData(date, 'ClassTest2', 10, 9),
    createData(date, 'PracticalExam2', 10, 10),
];

export default function GradeCard(props) {
    const classes = useStyles();
    const [subject, setSubject] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    function handleSubjectChange(event) {
        event.preventDefault();
        setSubject(event.target.value);
    }

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    return (
        <div>
            <MyAppBar appBarTitle="View Grade Card"/>
            <Box style={{ backgroundColor: '#00ADB5', padding: '3.679890560875513vh', fontWeight: '600' }}>
                <form className={classes.formControl} noValidate style={{ marginTop: '0px', marginLeft: '0px' }}>
                    <Grid container spacing={10} style={{ justifyContent: 'center' }}>
                        <Grid item xs={12} sm={3}>
                            <FormControl variant="filled" className={classes.form}>
                                <InputLabel id="simple-subject-filled-label">Choose Subject</InputLabel>
                                <Select labelId="simple-subject-filled-label" id="dsimple-subject-filled" vallue={subject} onChange={handleSubjectChange} style={{ textAlign: 'left' }}>
                                    {subjectList.map((sub) => {
                                        const labelId = `subject-${sub}-label`;
                                        return (
                                            <MenuItem value={sub}>{sub}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <h3>Date-wise Result Report</h3>
            <Container maxWidth="lg" style={{ marginBottom: '20px'  }}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {   columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 'bold', textDecoration: 'underline' }}>
                                                {column.label}
                                            </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.desc}> {/*add key={rows.date + student_id + rows.desc}*/}
                                            { columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value==="number" ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        /> */}
                </Paper>
            </Container>

            { props.role==="Student" && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }

        </div>  
    );
}