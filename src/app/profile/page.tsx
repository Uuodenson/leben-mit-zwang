"use client"
import { db, fbapp } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { JSX, useEffect, useState } from "react";
import { NavBar } from "../page";

export default function profile(): JSX.Element {
    const [userDetails, setUserDetails]: [any, Function] = useState(null)
    const fetchUserData = async ()=>{
        getAuth(fbapp).onAuthStateChanged(async (user) => {
            console.log(user)
            if(!user) return
            const docRef = doc(db,"users",user.uid)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setUserDetails(docSnap.data())
            }else{
                console.log("User not logged in!")
            }
        })
    }

    async function handleSignOut(){
        try{
            await getAuth(fbapp).signOut();
            window.location.href = "/login";
            console.log("User signed out!");
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])
    return <>
    <NavBar></NavBar>
    <div className='mt-20 flex items-center justify-center flex-col'>
        {
            userDetails ? (<><p>{userDetails.email}</p><button className="bg-red-500 rounded-xl max-w-fit p-2 hover:bg-red-400" onClick={handleSignOut}>Sign out</button></>) : (<><p>No user found.</p></>)
        }
    </div>
    </>
}