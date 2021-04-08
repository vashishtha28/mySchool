import './App.css';
import SignIn from "./pages/SignIn";
import MyAppBar from "./components/MyAppBar"
import RegisterStudent from "./pages/RegisterStudent";
import Curriculum from './pages/update_curriculum';
import TimeTable from './pages/updateTimeTable'
import AdminPage from './pages/AdminWelcome'
// import SignIn from "./pages/SignIn";
// import MyAppBar from "./components/MyAppBar"
// import RegisterStudent from "./pages/RegisterStudent";
// import RegisterTeacher from "./pages/RegisterTeacher";
import Main from "./components/Main";


function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}
  
export default App;
