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
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles((theme) => ({
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: "100%",
        maxWidth: "500px",
        backgroundColor: theme.palette.background.paper,
        margin: "auto",
        paddingTop:"30px"
     }
  }));


function RegisterTeacher(){

    const classes = useStyles();
    const [counter, setCounter] = useState(0);
    const [isSubmitted, setSubmitted] = useState(false);
    const [disableFlag, setFlag] = useState(true);
    const [isClassTeacher, setClassTeacher] = useState(false);
    const [userExistStatus, setExistStatus] = useState(false);
    const [passwordWarning, setWarning] = useState(false);
    const [emptyWarning, setEmptyWarning] = useState(false);
    const [checkedSubject, setCheckedSubject] = useState([]);
    const subjectList = ["English", "Hindi", "Sanskrit", "Mathematics", "Physics", "Inorganic Chemistry", "Organic Chemistry", "Physical Chemistry", "Biology", "History", "Political Science", "Geography", "Economics", "Accountancy", "Business Studies", "Sociology", "Psychology"];
   
    const [classList, setClassList] = useState([{
        class: "",
        section:""
    }]);

    const [teacher, setTeacher] = useState({
        emailId: "", //will be used as username
        password: "",
        confirmPassword:"",
        role: "Teacher",
        teacherName: "",
        
        mobileNum: "",
        subjects:[],
        classes: [], // single array element=> {class: , section: }
        classTeacherOfClass:"", //check them for empty field only if isClassTeacher
        classTeacherOfSection:""
    });

    // //to check if username is already registered
    // function checkUser(){
        
    // }

    useEffect(()=>{
        if(classList.length===1){
            setFlag(true);
        }
        else{
            setFlag(false);
        }
    },[classList.length])


    function handleClassChange(event){
        
        setExistStatus(false);
        setClassList( (prev)=>{
             const i = event.target.name[5] - '0'; //index of that element
            const temp = [...prev];
             temp[i]=  {
                class: event.target.value,
                section: prev[i].section
            };
            console.log(classList);
            return temp;
        });
        event.preventDefault();
        
    }

    async function handleSectionChange(event){
        
        setExistStatus(false);
        await setClassList( (prev)=>{
            const i = event.target.name[7] - '0'; //index of that element
            const temp = [...prev];
            temp[i] = {
                class: prev[i].class,
                section: event.target.value
            };
            console.log(classList);
            return temp;
        });
        return;
        event.preventDefault();
    }

    function handleCheckbox(event){
        event.preventDefault();
        setClassTeacher(event.target.checked);
        console.log(isClassTeacher);
    }
    
    const handleToggle = (value) => async () => {
        const currentIndex = checkedSubject.indexOf(value);
        const newChecked = [...checkedSubject];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        await setCheckedSubject(newChecked);
        console.log(checkedSubject);
      };

    function handleChange(event){
        event.preventDefault();
        setExistStatus(false);
        console.log(event.target);
        setTeacher((prev)=>{
          return {...prev, [event.target.name]: event.target.value};
        });
      }

      async function handleSubmit(event){
        //   await setTeacher(async (prev)=>{
        //     const t = await {...prev, classes: classList, subjects: subjectList};
        //     return t;
        // });
        teacher.classes = classList;
        teacher.subjects = checkedSubject;
          event.preventDefault();
         
         console.log(teacher);

         if(isClassTeacher && (teacher.classTeacherOfClass===""||teacher.classTeacherOfSection==="")){
            setWarning(false);
            setEmptyWarning(true);
        }
        else if(teacher.emailId===""|| teacher.password===""|| teacher.confirmPassword===""||teacher.teacherName===""||teacher.mobileNum===""||teacher.subjects.length===0||teacher.classes.length===0){
             
             setWarning(false);
             setEmptyWarning(true);
         }
         else if(teacher.password !== teacher.confirmPassword){
             setEmptyWarning(false);
             setWarning(true);
         }
         else{
             setWarning(false);
             setEmptyWarning(false);
             //check if username already exists
             //send search request to server.
            const a  = await axios.post(server_url+ "/checkuser", {userName: teacher.emailId})
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
                 console.log(teacher);
                axios.post(server_url+ "/register/teacher", teacher)
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

       
    function addClass(){
        const tempClass = {
            class:"",
            section:""
        };
        setClassList((prev)=>{
            return [...prev, tempClass];
        });
    }

    function removeClass(id) {
        setClassList(previous => {
          return previous.filter((item, index) => {
            return index !== id;
          });
        });
      }


    function classListBuilder(element){
          const i = classList.indexOf(element);
          return <Grid container spacing={1}>
          <Grid item xs>
              <FormControl fullWidth variant="outlined" required className={classes.formControl}>
              <FormHelperText>Class</FormHelperText>
              
                  <Select
                  labelId={"class"+i}
                  id={"class"+i}
                  name = {"class"+i}
                  value = {element.class}
                  onChange={handleClassChange}
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
                  labelId={"section"+i}
                  id={"section"+i}
                  name = {"section"+i}
                  onChange={handleSectionChange}
                  value = {element.section}
                  className={classes.selectEmpty}
                  style={{  marginRight:"0px"}}
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
          <Grid item xs style={{paddingTop: "auto", paddingLeft:"0px", marginLeft:"0px", maxWidth:"20px"}}>
            <IconButton disabled={disableFlag} id={i} color="secondary"  onClick={async ()=>{
                console.log(i);
                await removeClass(i);
            }} aria-label="delete" style={{ marginLeft:"0px", marginTop:"25px"} }>
                <RemoveCircleIcon />
            </IconButton>
          </Grid>
      </Grid>

      }

      
    return <div>
        <MyAppBar appBarTitle="Teacher registration"/>
        <Container  component="main" maxWidth="md">
        <CssBaseline />
        <form style={{ width: '100%'}} noValidate>  
        
        <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "50px", marginLeft:"auto", marginRight:"auto", padding: "10px 30px"}}>
            
            <Grid item sm >
                    <Typography component="h1" variant="h6">
                        Personal Info
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="teacherName"
                        label="Teacher's full name"
                        name="teacherName"
                        autoComplete="teacherName"
                        onChange = {handleChange}
                        autoFocus   
                        value = {teacher.teacherName}
                        required
                        
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="mobileNum"
                        label="Teacher's mobile number"
                        name="mobileNum"
                        autoComplete="mobileNum"
                        onChange = {handleChange}
                        autoFocus   
                        value = {teacher.mobileNum}
                        required
                        
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="emailId"
                        label="Teacher's Email id"
                        name="emailId"
                        autoComplete="emailId"
                        onChange = {handleChange}
                        autoFocus   
                        value = {teacher.emailId}
                        required
                        
                        />
                        <FormHelperText>Your Email id will be your username for signing in</FormHelperText>
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
                        value = {teacher.password}
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
                        value = {teacher.confirmPassword}
                        required
                        />
                    {passwordWarning && <FormHelperText style={{color:"red"}}>Passwords don't match. Re-enter password</FormHelperText>}
            </Grid>
            <Grid item sm style={{marginLeft:"auto", marginRight:"auto"}}>
                    <Typography component="h1" variant="h6">
                        Responsibilities
                    </Typography>
                    <FormHelperText>Classes in which the teacher teach :</FormHelperText>
                    {classList.map((element)=>{
                        return classListBuilder(element);
                    })}
                    
                    <IconButton onClick={addClass} aria-label="delete" style={{color:"#00B594",fontSize:"large", marginLeft:"0px", marginTop:"auto"}}>
                        <AddBoxIcon />
                    </IconButton>
                        
                    
                    <hr/>
                    <FormControlLabel
                        value="end"
                        checked={isClassTeacher}
                        style={{marginLeft:"0"}}
                        control={<Checkbox color="primary" />}
                        label="I am also a class-teacher."
                        labelPlacement="end"
                        onChange={handleCheckbox}
                    />
                    {isClassTeacher && <FormHelperText>Class-Teacher of :</FormHelperText>}
                    {isClassTeacher && <Grid container spacing={1}>
                        <Grid item xs>
                            <FormControl fullWidth variant="outlined" required className={classes.formControl}>
                            <FormHelperText>Class</FormHelperText>
                            
                                <Select
                                labelId="class"
                                id="classTeacherOfClass"
                                name = "classTeacherOfClass"
                                value = {teacher.classTeacherOfClass}
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
                                id="classTeacherOfSection"
                                name = "classTeacherOfSection"
                                value = {teacher.classTeacherOfSection}
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
                    </Grid>}
                    <hr/>
                    
            </Grid>
            
        </Grid>
        
        
            
        </form>

        <Grid container md spacing={3} className={classes.paper} style={{background:"#ffffff", borderRadius: 10, boxShadow: "20px 20px 50px #e5e5e5", marginTop: "50px", marginLeft:"auto",marginRight:"auto",marginBottom:"10px", paddingBottom: "30px", textAlign:"center"}}>
            
        <List dense className={classes.root}>
        <Typography component="h1" variant="h5">
                Select your subjects
            </Typography>
            <hr/>
            {subjectList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                <ListItem key={value} button>
                    <ListItemText id={labelId} primary={value} />
                    <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checkedSubject.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                    />
                    </ListItemSecondaryAction>
                </ListItem>
                );
            })}
        </List>
        </Grid>
        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                            style={{padding: "10px", background:"#00B594", marginBottom:"50px"}}
                            >
                                <b>Register</b>
                        </Button>
                        {emptyWarning && <FormHelperText style={{color:"red"}}>Some fields were left empty. Kindly fill them.</FormHelperText>}
                        {!isSubmitted && (userExistStatus&& <FormHelperText style={{color:"red"}}>This Username has already been registered</FormHelperText>)}
        </Container>
        


    </div>
}

export default RegisterTeacher;