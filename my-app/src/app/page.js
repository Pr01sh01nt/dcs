"use client"

import { useState } from "react";


import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import Head from "next/head";




export default function Home() {
  const [data, setData] = useState(null);
  const { signIn, signUp, user } = UserAuth();

  const [use, setUse] = useState("");

  // console.log(data, "hh");

  const handleSignUp = async () => {
    try {

      const result = await signUp(data.email, data.password);
      // console.log(result.user.uid, "jsfdl");
      // console.log(result, "jsfdl");
      const userid = result.user.uid;

      try {
        await setDoc(doc(db, "users", userid), {

          email: data?.email,
          role: "admin",
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }


    } catch (err) {
      console.log(err);
    }

  }

  const handleSignIn = async () => {

    try {

      const result = await signIn(data.email, data.password);
      // console.log(result, "ijdfhsdiojfhsdjifhsdoij ");
      // console.log(result.user.uid);
      setUse(result.user.uid);
      console.log(use);
    } catch (err) {
      console.log(err);
    }

  }


 
  

  return (

    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
        

      {!user ? <><div className="flex flex-col items-center">
        <div className="mb-2">

          Email : <input type="text" className="rounded bg-gray-500 bg-opacity-50" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
        </div>
        <div>
          Password: <input className="rounded bg-gray-500 bg-opacity-50" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />

        </div>
        <div>
          <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleSignUp}>SignUp</button>
        </div>
      </div>



        <div className="flex flex-col items-center">
          <div className="mb-2">

            Email : <input type="email" className="rounded bg-gray-500 bg-opacity-50" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
          </div>
          <div>
            Password: <input className="rounded bg-gray-500 bg-opacity-50" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />

          </div>
          <div>
            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={handleSignIn}>SignIn</button>
          </div>
        </div>
      </> : <h1>Hello! there 😊😊</h1>

      }


      {/* router.push()
      router.replace()
      router.back()
      router.forward() */}

      {user && <Link href="/details"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Learnings</button></Link>}
    
    

    </main>
  );
}
