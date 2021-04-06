import React from 'react';
import './../infobar.css';
import { useStyles } from './../components/MyAppBar';
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { infoStyles } from './../components/InfoBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function AdminDesk() {
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#222831" }}>
                <Toolbar>
                    <Typography variant="h6">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" style={{ marginTop: '150px', backgroundColor: 'black', display: 'flex' }}>
                <Grid container spacing={2} style={{ justifyContent: 'space-around' }}>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#00B594', width: '200px', fontSize: '17px' }}>
                            Add Student
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '200px', fontSize: '17px' }}>
                            Remove Student
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#00B594', width: '200px', fontSize: '17px' }}>
                            Add Teacher
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '200px', fontSize: '17px' }}>
                            Remove Teacher
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '490px', fontSize: '17px' }}>
                            Update Teacher's Time table
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '490px', fontSize: '17px' }}>
                            Update Student's Time table
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '490px', fontSize: '17px' }}>
                            Update Curriculum
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" style={{ color: 'white', backgroundColor: '#DF93FF', width: '490px', fontSize: '17px' }}>
                            Generate Notice
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div> 
    );
}

export default AdminDesk;