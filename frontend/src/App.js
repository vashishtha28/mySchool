import './App.css';
import SignIn from "./pages/SignIn";
import MyAppBar from "./components/MyAppBar"
import RegisterStudent from "./pages/RegisterStudent";
import Curriculum from './pages/update_curriculum';
import TimeTable from './pages/updateTimeTable'
import AdminPage from './pages/AdminWelcome'


function App() {
  return (
    <div className="App">
     <TimeTable />
    </div>
  );
}

export default App;