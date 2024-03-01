"use client";

import { UserAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";



const detail = () => {
    const [data, setData] = useState({});
    const { user } = UserAuth();
    const [dbData, setDbData] = useState([]);

    const dateObj = new Date();
    const date = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const docRef = await addDoc(collection(db, "details"), {
                topic: data?.name,
                detail: data?.detail,
                date: date,
                user:user.uid

            });
            // console.log("Document written with ID: ", docRef.id);

            setDbData([ {
                id: docRef.id, topic: data?.name,
                detail: data?.detail,
                date: date,
            },...dbData]);

        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }
 
    
    useEffect(()=>{
        
        const handleGet = async () => {
            if(!user ) return undefined;
            try {
    
                // const querySnapshot = await getDocs(collection(db, "details"));
                
                const q = query(collection(db, "details"), where("user", "==", `${user?.uid}`));

                const querySnapshot = await getDocs(q);
                let sdata = [];
                querySnapshot.docs.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc);
                    sdata.push({ id: doc.id, ...doc.data() });
                    // console.log(doc.id, " => ", doc.data());
                });
    
                // console.log("result from firestor", querySnapshot);
                // console.log(typeof (querySnapshot));
    
                setDbData(sdata);
    
            } catch (err) {
                console.log("error in getting data \n", err);
            }
        }
        handleGet();
    },[user])


    return !user ? <h1>Login First </h1> : (
        <>
            <h1>

                Learned Topic
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center m-4">

                <input placeholder="name" onChange={(e) => { setData({ ...data, name: e.target.value }) }} className="m-2 text-black" />
                <input placeholder="detail" onChange={(e) => { setData({ ...data, detail: e.target.value }) }} className="m-2 text-black" />
                <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit" >Add</button>
            </form>
            
            
            

            <div className="flex justify-center overflow-x-auto ">

                <table className="min-w-fit divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center  text-xl font-bold text-gray-950 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-gray-950 uppercase tracking-wider">
                                Topic
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-gray-950 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        {dbData.map(dValue => {
                            return <tr key={dValue.id}>
                                <td className="px-6 py-4 whitespace-wrap text-gray-900 overflow-x-auto">
                                    {dValue.date}

                                </td>
                                <td className="px-6 py-4 whitespace-wrap text-gray-900 overflow-x-auto">

                                    {dValue.topic}
                                </td>
                                <td className="px-6 py-4 whitespace-wrap text-gray-900 overflow-y-auto min-w-5">

                                    {dValue.detail.substr(0,100)}
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>

            </div>





        </>)

}

export default detail
