import React, { useState } from 'react';
import LayoutHead from './Layouts/LayoutHead'
import './Home.css';
import LayoutFooter from './Layouts/LayoutFooter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Qrcode from './Qrcode';

const Home = () => {
  const navigate = useNavigate();
  const [account , setAccount ] = useState("");
  const findaccount = () =>{
    if(window.ethereum){
      window.ethereum.request({method : 'eth_requestAccounts'})
      .then(result =>{
        setAccount(result[0])
      })
    }
  }
  const { user }  = useSelector(state => state.authState);
  return (
    <div className='homepage'>
       <div className='homeheader'>
        <LayoutHead/>
       </div>
      
       <div className='homecontainer'>
        <div className='cont1'>
          <div className='cont1_1'>
            <h1>Block Chain Technology to Detect Fake Product</h1>
          </div>
          <div className='cont1_2'>
            <Qrcode/>
          </div>
        <div  className='cont1_3'>
         {user.role === 'Manufacturer' && <button className='prod_btn' onClick={()=>{findaccount();
                                                window.alert(`Connected to Metamask Address ${account}`);
                                                navigate('/addproduct');}
                                                } 
                                          >
               ADD PRODUCT
        </button>}
        </div>
        </div>

        <div className='cont2'>
         <img src='/homeimg1.jpg' alt='servives'></img>
        </div>
        
       </div>
       <div className='homefooter'>
        <LayoutFooter/>
       </div>
    </div>
  );
};


export default Home;
