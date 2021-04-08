import React, {useState, useEffect} from 'react';
import axios from "axios";
import MyAppBar from "../components/MyAppBar";
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid"
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import server_url from '../components/ServerLink';

const useStyles = makeStyles((theme) => ({
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  }));


function RegisterStudent(){
    const classes = useStyles();
    const [isSubmitted, setSubmitted] = useState(false);
    const [userExistStatus, setExistStatus] = useState(false);
    const [passwordWarning, setWarning] = useState(false);
    const [emptyWarning, setEmptyWarning] = useState(false);
    const [student, setStudent] = useState({
        admissionNum: "", //will be used as username
        password: "",
        confirmPassword:"",
        role: "Student",
        studentName: "",
        class: "",
        section: "",
        rollNum: "",
        fatherName: "",
        motherName: "",
        parentEmailId: "",
        parentContact: "",
    });

    // //to check if username is already registered
    // function checkUser(){
        
    // }

    function handleChange(event){
        event.preventDefault();
        setExistStatus(false);
        console.log(event.target);
        setStudent((prev)=>{
          return {...prev, [event.target.name]: event.target.value};
        });
      }

      async function handleSubmit(event){
          event.preventDefault();
         
         console.log(student);
         if(student.admissionNum===""|| student.password===""|| student.confirmPassword===""||student.class===""||student.section===""||student.rollNum===""||student.studentName===""||student.fatherName===""||student.motherName===""||student.parentEmailId===""||student.parentContact===""){
             setWarning(false);
             setEmptyWarning(true);
         }
         else if(student.password !== student.confirmPassword){
             setEmptyWarning(false);
             setWarning(true);
         }
         else{
             setWarning(false);
             setEmptyWarning(false);
             //check if username already exists
             //send search request to server.
            const a  = await axios.post(server_url+ "/checkuser", {userName: student.admissionNum})
            .then((response)=>{
                console.log(response.data.message);
                if(response.data.message==="username available"){
                    setExistStatus(false);
                }
                else{
                    setExistStatus(true);
                }
            }, (error) => {
                console.log(error);
            });

             if(!userExistStatus){
                axios.post(server_url+ "/register/student", student)
                .then((response)=>{
                    alert(response.data.message);
                    setSubmitted(true);
                    
                    /////////////////////////////////////////TODO:::then redirect to login page
                }, (error) => {
                    console.log(error);
                });
             }

         }
      }
    return <div>
        <MyAppBar appBarTitle="Student registration"/>
        <Container  component="main" maxWidth="md">
        <CssBaseline />
        <form style={{ width: '100%'}} noValidate>  
        
        <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "50px", padding: "10px 30px"}}>
            
            <Grid item sm >
                    <Typography component="h1" variant="h6">
                        Student
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="studentName"
                        label="Student's full name"
                        name="studentName"
                        autoComplete="studentName"
                        onChange = {handleChange}
                        autoFocus   
                        value = {student.studentName}
                        required
                        
                        />
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                            <FormHelperText>Class</FormHelperText>
                            
                                <Select
                                labelId="class"
                                id="class"
                                name = "class"
                                value = {student.class}
                                onChange={handleChange}
                                className={classes.selectEmpty}
                                required
                                
                                >
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
                        <Grid item xs>
                            <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                            <FormHelperText>Section</FormHelperText>
                            
                                <Select
                                labelId="section"
                                id="section"
                                name = "section"
                                value = {student.section}
                                onChange={handleChange}
                                className={classes.selectEmpty}
                                required
                                
                                >
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
                            
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing = {1}>
                        <Grid item xs>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="admissionNum"
                                label="Admission number"
                                name="admissionNum"
                                autoComplete="admissionNum"
                                onChange = {handleChange}
                                autoFocus   
                                value = {student.admissionNum}
                                required
                                />
                        </Grid> 
                        <Grid item xs>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="rollNum"
                                label="Roll number"
                                name="rollNum"
                                autoComplete="rollNum"
                                onChange = {handleChange}
                                autoFocus   
                                value = {student.rollNum}
                                required
                                />
                        </Grid>
                        
                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Set your password"
                        type="password"
                        id="password"   
                        autoComplete="current-password"
                        onChange = {handleChange}
                        value = {student.password}
                        required
                        />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange = {handleChange}
                        value = {student.confirmPassword}
                        required
                        />
                    {passwordWarning && <FormHelperText style={{color:"red"}}>Passwords don't match. Re-enter password</FormHelperText>}
            </Grid>
            <Grid item sm>
                    <Typography component="h1" variant="h6">
                        Parents
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fatherName"
                        label="Fathers's full name"
                        name="fatherName"
                        autoComplete="fatherName"
                        onChange = {handleChange}
                        autoFocus   
                        value = {student.fatherName}
                        required
                        />
                    
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="motherName"
                        label="Mothers's full name"
                        name="motherName"
                        autoComplete="motherName"
                        onChange = {handleChange}
                        autoFocus   
                        value = {student.motherName}
                        required
                        />
                        <TextField
                        variant="outlined"
                        type="email"
                        margin="normal"
                        required
                        fullWidth
                        id="parentEmailId"
                        label="Parent's email id:"
                        name="parentEmailId"
                        autoComplete="parentEmailId"
                        onChange = {handleChange}
                        autoFocus   
                        value = {student.parentEmailId}
                        required
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="parentContact"
                        label="Parent's contact number"
                        name="parentContact"
                        autoComplete="parentContact"
                        onChange = {handleChange}
                        autoFocus   
                        value = {student.parentContact}
                        required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            style={{padding: "10px", background:"#00B594"}}
                            >
                                Register
                        </Button>
                        {emptyWarning && <FormHelperText style={{color:"red"}}>Some fields were left empty. Kindly fill them.</FormHelperText>}
                        {!isSubmitted && (userExistStatus&& <FormHelperText style={{color:"red"}}>This Admission number has already been registered</FormHelperText>)}
            </Grid>
        </Grid>
        
        
            
        </form>
        </Container>


    </div>
}

export default RegisterStudent;