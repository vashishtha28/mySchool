import React, { useEffect, useState } from 'react';
import {Redirect, useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyAppBar from './../components/MyAppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: '800',
    },
    accordionHeader: {
        backgroundColor: '#00ADB5',
    }
  }));

export default function ViewNotice(props) {
    const classes = useStyles();
    const [noticeList, setNoticeList] = useState([]);

    useEffect(async ()=>{
        await setNoticeList(props.userInfo.notices);
    }, []);



    function noticeBuilder(notice){
        return <Accordion style={{ backgroundColor: '#00ADB5', marginTop: '12px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="notice-admin-12_2021" id="notice-admin-12_2021-header" style={{ justifyContent: 'space-around' }}>
            {/* aria-controls will be of the form notice-{from}-{date.format("DD_YYYY")} */}
            {/* id will be of the form notice-{from}-{date}-header */}
            <Grid container style={{ justifyContent: 'space-between'}}>
                <Grid item>
                    <Typography> {notice.date} </Typography>
                </Grid>
                
                <Grid item>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>{notice.title}</Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>From : {notice.sender}</Typography>
                </Grid>
                
            </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: 'white', textAlign:"left" }}>
            <Typography>
               {notice.content}
            </Typography>
        </AccordionDetails>
    </Accordion>

    }

    return (
        <div>
            <MyAppBar 
            loggedInStatus={props.loggedInStatus} 
            handleLogout={props.handleLogout} 
            userInfo={props.userInfo} 
            role={props.role} 
            appBarTitle="Notices"
            />
            {/** From: {sender}                            Date:{date}  DOWNBTN **/}
            {/*                              Title                               */}
            {/*                      Content of the notice                       */}
            <Container component="main" maxWidth="lg">
                <div className={classes.root}>
                    {noticeList.slice(0).reverse().map((notice)=>{
                        return noticeBuilder(notice);
                    })}
                </div>
            </Container>
            { (props.role==="Student" || props.role==="Teacher") && props.loggedInStatus==="LOGGED-IN" ? null : <Redirect to="/" /> }
        </div>
    );
};