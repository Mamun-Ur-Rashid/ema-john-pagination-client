import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../provider/Provider';

const Login = () => {
    const [error, setError] = useState(null);
    const [success, setSucces] = useState(null);
    const [show , setShow] = useState(false);
    const {signIn} = useContext(Context);
    const Navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const from = location.state?.from?.pathname || '/';
    const handlerLogin = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setSucces("")
        setError(" ")
        if(password.length <6){
            setError("Is not a valid password");
            return;
        }
        // console.log(email, password)
        signIn(email, password)
        .then(result =>{
            const loged = result.user;
            console.log(loged);
            form.reset();
            Navigate(from , {replace: true})
            setSucces("SucessFully login in our emajohn!!!")
        })
        .catch(error =>{
            console.log(error.message);
            setError(error.message)
        })
    }
    return (
        <div className='form-container'>
            <form onSubmit={handlerLogin} action="">
                <h3 className='form-title'>Login</h3>
            <div className="form-control">
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div className="form-control">
                <label htmlFor="">Password</label>
                <input type={show ? "text" : "password"} name="password" id="password" required />
                <p onClick={() => setShow (!show)}><small>
                    {
                        show ? <span>Hide password</span>
                        : <span>Show Password</span>
                    }
                    </small></p>
            </div>
            <button className='btn'>Login</button>
            </form>
            <p className='text'><small>New to Ema-John? <Link to='/signUp' className='new-account'>Create New Account</Link></small></p>
            <button className='btn-google'>Continue With Google</button>
            <p className='error-text'>{error}</p>
            <p className='success-text'>{success}</p>
        </div>
    );
};

export default Login;