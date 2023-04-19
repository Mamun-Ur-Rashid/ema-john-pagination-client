import React, {createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.confic'
const auth = getAuth(app);
export const Context = createContext(null);

const Provider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // create user email
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // sign in user
    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // sign out 
    const logOut = () =>{
        return signOut(auth);
    }
    // observe auth provider change
  useEffect( () =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
    });
    return unsubscribe;
  } ,[])

    const authInfo = {user, createUser, signIn, logOut, loading }
    return (
        <div>
            <Context.Provider value={authInfo}>
                {children}
            </Context.Provider>
        </div>
    );
};

export default Provider;