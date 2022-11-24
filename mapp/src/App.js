import logo from './logo.svg';
import './App.css';
import { Login } from './components/auth/login';
import { Registration } from './components/auth/registration';
import { Home } from './components/Main/home';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AllUser } from './components/Main/allUser';
function App() {
  return (
   <>


    <Router>
      
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Registration />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/alluser" element={<AllUser />} />
     
    </Routes>
    </Router>
   

   {/* <Registration/> */}
   {/* <Login/> */}
  
   </>
  );
}

export default App;
