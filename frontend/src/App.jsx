import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/loginPage';
import Signup from './pages/Signup/signup';
import Menu from './pages/Menu/Menu';
import Account from './pages/Account/account';
import PlaceOrder from './pages/PlaceOrder/placeOrder';

function App() {
  return (
    <div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/Menu' element = {<Menu/>} />
        <Route path='/Account' element = {<Account/>} />
        <Route path='/placeorder' element = {<PlaceOrder/>} />
      </Routes>
    </div>
  );
}

export default App;
