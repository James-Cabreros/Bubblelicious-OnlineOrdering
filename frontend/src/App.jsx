import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/loginPage';
import Signup from './pages/Signup/signup';

function App() {
  return (
    <div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
