import React from 'react';
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

export default function ViewNotice() {
    const classes = useStyles();

    return (
        <div>
            <MyAppBar appBarTitle="View Notices" />
            {/** From: {sender}                            Date:{date}  DOWNBTN **/}
            {/*                              Title                               */}
            {/*                      Content of the notice                       */}
            <Container component="main" maxWidth="lg">
                <div className={classes.root}>
                    <Accordion style={{ backgroundColor: '#00ADB5', marginTop: '12px', }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="notice-admin-12_2021" id="notice-admin-12_2021-header" style={{ justifyContent: 'space-around' }}>
                            {/* aria-controls will be of the form notice-{from}-{date.format("DD_YYYY")} */}
                            {/* id will be of the form notice-{from}-{date}-header */}
                            <Grid container style={{ justifyContent: 'space-between'}}>
                                <Grid item>
                                    <Typography style={{ fontWeight: 'bold' }}>From : Administrator</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> 12/04/2021 </Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', textAlign:"left" }}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor: '#00ADB5', marginTop: '12px', }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="notice-admin-12_2021" id="notice-admin-12_2021-header" style={{ justifyContent: 'space-around' }}>
                            {/* aria-controls will be of the form notice-{from}-{date.format("DD_YYYY")} */}
                            {/* id will be of the form notice-{from}-{date}-header */}
                            <Grid container style={{ justifyContent: 'space-between'}}>
                                <Grid item>
                                    <Typography style={{ fontWeight: 'bold' }}>From : Administrator</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> 12/04/2021 </Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', textAlign:"left" }}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor: '#00ADB5', marginTop: '12px', }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="notice-admin-12_2021" id="notice-admin-12_2021-header" style={{ justifyContent: 'space-around' }}>
                            {/* aria-controls will be of the form notice-{from}-{date.format("DD_YYYY")} */}
                            {/* id will be of the form notice-{from}-{date}-header */}
                            <Grid container style={{ justifyContent: 'space-between'}}>
                                <Grid item>
                                    <Typography style={{ fontWeight: 'bold' }}>From : Administrator</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography> 12/04/2021 </Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', textAlign:"left" }}>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Container>
        </div>
    );
};