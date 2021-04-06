import './App.css';
import SignIn from "./pages/SignIn";
import MyAppBar from "./components/MyAppBar"
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";

function App() {
  return (
    <div className="App">
      {/* <SignIn /> */}
      {/* <RegisterStudent/> */}
      <RegisterTeacher/>
    </div>
  );
}

export default App;
