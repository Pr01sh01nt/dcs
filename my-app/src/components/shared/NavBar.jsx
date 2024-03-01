"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { UserAuth } from '@/context/AuthContext';

const NavBar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  // console.log(user,"from navbar");

  const handleSignIn = async () => {
    // console.log(typeof(googleSignIn));
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    // console.log("logout runs");
    try {
      await logOut();
      // console.log("he");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);



  return (
    <>
  
  
      <nav className='flex justify-between'>
        <Link href="/">
          <button className="p-2 pl-4">Home</button>
        </Link>
        {loading ? null : 
        !user ? 
        <button onClick={handleSignIn}>Google   LogIn</button>
          : <button onClick={handleSignOut}>LogOut</button>
      }

        <Link href="/">
          {!user?null:<button>{user.displayName}</button>}
        </Link>

      </nav>
      <hr/>


      </>
 
 
 
  )
}

export default NavBar;
