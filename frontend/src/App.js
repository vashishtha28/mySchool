import './App.css';
import SignIn from "./pages/SignIn";
import MyAppBar from "./components/MyAppBar"
import RegisterStudent from "./pages/RegisterStudent";
import AdminPage from "./pages/AdminWelcome"

function App() {
  return (
    <div className="App">
     {/*<SignIn />*/}
      {/* <RegisterStudent/> */}
      <AdminPage />
    </div>
  );
}

export default App;
