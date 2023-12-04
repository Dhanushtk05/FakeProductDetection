import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom' 
import Login from './Components/User/Login';
import Landingpage from './Components/Landingpage';
import Register from './Components/User/Register';
import ForgotPassword from './Components/User/ForgotPassword';
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react';
import Suggestions from './Components/Contact/Suggestions'
import { loadUser } from './actions/userActions';
import store from './store';
import ProtectedRoute from './Components/route/ProtectedRoute'
import AddProduct from './Components/admin/AddProduct'
import ProductDetails from './Components/ProductDetails';
import Qrgenerator from './Components/admin/Qrgenerator';
import Profile from './Components/User/Profile';


function App() {
  
  useEffect(()=>{
    store.dispatch(loadUser)
  })
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/contact' element={<Suggestions/>}/>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/addproduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
        <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/productdetails/:id' element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
        <Route path='/product/:id' element={<ProtectedRoute><Qrgenerator/></ProtectedRoute>}/>
      </Routes>   
      <ToastContainer theme='dark'/>
    </div>
    </Router>
  );
}

export default App;

// <Route path='/addproduct' element={<AddProduct/>}/>

