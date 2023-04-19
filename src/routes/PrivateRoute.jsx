import React, {useContext } from 'react';
import { Context } from '../provider/Provider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user , loading } = useContext(Context);
    const location = useLocation();
    console.log(location);
    if(loading){
        return <div>LOding......</div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;