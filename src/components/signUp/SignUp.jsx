import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom'
import './SignUp.css'
import { Context } from '../../provider/Provider';

const SignUp = () => {
    const [error, setError] = useState("")
    const [success, setSucces] = useState('');
    const {createUser } = useContext(Context);
    
    const handlerSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        // form.reset();
        setError(' ')
        setSucces("")
        console.log(email, password, confirmPassword);
        if(password !== confirmPassword){
            setError("Your password did not match");
            return
        }
        else if(password.length <6){
            setError("Password length at least 6 characters must be!!")
            return
        }
        createUser(email, password)
        .then(result =>{
           const login = result.user;
            console.log(login);
            form.reset();
            setSucces("Succesfully Sign Up!!")
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message)
        })

    }
    return (
        <div className='form-container'>
            <form onSubmit={handlerSignUp} action="">
                <h3 className='form-title'>Sign Up</h3>
            <div className="form-control">
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div className="form-control">
                <label htmlFor="">Password</label>
                <input type="password" name="password" id="password" required />
            </div>
            <div className="form-control">
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="confirmPassword" id="" required />
            </div>
            <button className='btn'>Sign Up</button>
            </form>
            <p className='text'><small>Already have an account? <Link to='/login' className='new-account'>Login</Link></small></p>
            <button className='btn-google'>Continue With Google</button>
            <p className='error-text'>{error}</p>
            <p className='success-text'>{success}</p>
        </div>
    );
};

export default SignUp;