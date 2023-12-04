import {useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError ,logout } from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import LayoutHead from '../Layouts/LayoutHead';
import LayoutFooter from '../Layouts/LayoutFooter';
export default function UpdatePassword() {
    
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState)
    
    useEffect(() => {
        if(isUpdated) {
            toast('Password updated successfully',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setOldPassword("");
            setPassword("")
            return;
        }
        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[isUpdated, error, dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData));
        dispatch(logout);
    }

    function click() {
        const togglePassword = document.querySelector("#togglePassword");
        const passwordV = document.querySelector("#old_password_field");
        const type = passwordV.getAttribute("type")==="password" ? "text" : "password"
        togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted': document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted'
        passwordV.setAttribute("type",type);
    }

   


    return (
        <div className='loginpage'>
            <div><LayoutHead/></div>
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mt-2 mb-5">Update Password</h1>
                    <div className="form-group">
                        <label htmlFor="old_password_field">Old Password</label>
                        <input
                            type="password"
                            id="old_password_field"
                            className="form-control"
                            placeholder='Old Password'
                            value={oldPassword}
                            onChange={e=>setOldPassword(e.target.value)}
                        />
                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_password_field">New Password</label>
                        <input
                            type="password"
                            id="new_password_field"
                            className="form-control"
                            placeholder='New Password'
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                        <span className='fa fa-eye viewpass mr-4 text-muted' onClick={click} id="togglePassword"></span>
                    </div>

                  <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button> 
                </form>
            </div>
        </div>
        <div><LayoutFooter/></div>
        </div>
    )
}