import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import { logout } from '../../actions/userActions';

const LayoutHead = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
      dispatch(logout);
    }
    const { user }  = useSelector(state => state.authState);

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

export default LayoutHead
