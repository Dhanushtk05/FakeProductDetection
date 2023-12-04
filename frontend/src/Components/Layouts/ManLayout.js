import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import axios from 'axios';
const ManLayout = () => {
    const [user,setUser] = useState("");
    const navigate = useNavigate();
    const logoutHandler = async () => {
        await axios.get(`/api/v1/logout`);
    }
    const {id:userid} = useParams();

    useEffect(()=>{
      async function getuser(id){
          const data2 = await axios.get(`/api/v1/getManufacturer/${id}`)
          setUser(data2.data.user)
          console.log(data2)
      }
      getuser(userid)
  },[userid]);
    return (
    <nav className="navbar row" >
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/home">
              <img width="50px" alt='Logo' src="/images/logo1.png" />
            </Link>
            </div>
        </div>
  
       
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
              <Dropdown className='d-inline' >
                  <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                    <figure className='avatar avatar-nav'>
                      <img width="50px" alt ="il " src={user.avatar??'/images/default_avatar.png'}  />
                    </figure>
                    <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
        </div>
    </nav>
    )
}

export default ManLayout
