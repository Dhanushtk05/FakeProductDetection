import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated ,user } = useSelector(state => state.authState);


    const  submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    function click() {
        const togglePassword = document.querySelector("#togglePassword");
        const passwordV = document.querySelector("#password_field");
        const type = passwordV.getAttribute("type")==="password" ? "text" : "password"
        togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted': document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted'
        passwordV.setAttribute("type",type);
    }

    useEffect(() => {
      
        if(isAuthenticated) {
            navigate(`/home`);
        }
        
        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose :2000,
                className :"toast-notify",
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    
    },[error, user,isAuthenticated, dispatch, navigate])
    
    return (
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 id='logpt' className="mb-3">Login</h1>
                      
                     <div className="form-group">
                        <label htmlFor="email_field">User Name</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                            placeholder='User Name'
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                            
                        />
                         <span className='fa fa-eye viewpass mr-4 text-muted' onClick={click} id="togglePassword"></span>
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}
                        >
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
            
    
    )
}