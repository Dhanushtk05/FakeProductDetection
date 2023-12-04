import { useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { sendSuggestion } from '../../actions/userActions'
import './Suggestions.css'
import { useDispatch } from 'react-redux';

export default function Suggestions() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        company: "",
        industry:""
    });

   const navigate = useNavigate();
   const dispatch = useDispatch();
    const onChange = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value })
    }

   

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('phonenumber', userData.phonenumber)
        formData.append('company', userData.company)
        formData.append('industry', userData.industry)
        dispatch(sendSuggestion(formData))
        navigate('/login')
    }

   
    return (
       <div className='registerpage'>
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-3">BOOK A DEMO</h1>

            <div className="form-group">
                <label htmlFor="email_field">FULL Name</label>
                <input name='name' onChange={onChange} type="name" id="name_field" placeholder='Name' className="form-control" />
            </div>

            
                <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                    type="email"
                    id="email_field"
                    name='email' 
                    placeholder='Email'
                    onChange={onChange}
                    className="form-control"
                  
                />
                </div>

                <div className="form-group">
                <label htmlFor="email_field">Phone Number</label>
                <input
                    type="text"
                    id="email_field"
                    name='phonenumber' 
                    placeholder='Phone Number'
                    onChange={onChange}
                    className="form-control"
                />

                </div>
                <div className="form-group">
                <label htmlFor="email_field">Company Name</label>
                <input
                    type="text"
                    id="email_field"
                    name='company' 
                    placeholder='Company Name'
                    onChange={onChange}
                    className="form-control"
                />

                </div>
                <div className="form-group">
                <label htmlFor="email_field">Industry Type</label>
                <input
                    type="text"
                    id="email_field"
                    name='industry' 
                    placeholder='Company Name'
                    onChange={onChange}
                    className="form-control"
                />
                </div>

                <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                >
                SUBMIT
                </button>
            </form>
            </div>
        </div>
    </div>
    )
}