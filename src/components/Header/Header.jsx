import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { Context } from '../../provider/Provider';

const Header = () => {
    const {user , logOut} = useContext(Context);
    console.log(user);
    const handlerSignOut =() =>{
        logOut()
        .then(result =>{ })
        .catch(error =>{
            console.log(error);
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signUP">Sign Up</Link>
                {
                    user && <span className='text-white'> Welcome {user.email} <button onClick={handlerSignOut} className='button'>Sign Out</button></span>
                }
            </div>
        </nav>
    );
};

export default Header;