import { createContext, useState, useEffect, useContext } from 'react'

import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword

} from "firebase/auth";
import { auth } from '@/lib/firebase/config';


const AuthContext = createContext("");


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const googleSignIn = async() => {
  
      try{
        
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      }catch(err){
        console.log(err)}


    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }, [user]);

    
    const signUp = (email, password)=>{
      return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password)=>{
      return signInWithEmailAndPassword(auth, email, password);
    };


      return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, signUp, signIn }}>
          {children}
        </AuthContext.Provider>
      );

};


export const UserAuth = () => {
    return useContext(AuthContext);
  };