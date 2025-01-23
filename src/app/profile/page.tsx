"use client"
import { db, fbapp } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { Navbartop } from "../components/Bars";

export default function Profile(): JSX.Element {
    interface UserDetails {
    // Define the properties of your user data here
    // For example:
    displayName?: string;
    email?: string;
    photoURL?: string;
    // Add other properties as needed
  }
  
  const [userDetails, setUserDetails]: [UserDetails | undefined, Dispatch<SetStateAction<UserDetails | undefined>>] = useState<UserDetails | undefined>();

    const fetchUserData = async ()=>{
        getAuth(fbapp).onAuthStateChanged(async (user) => {
            console.log(user)
            if(!user) return
            const docRef = doc(db,"users",user.uid)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
            }else{
                console.log("User not logged in!")
            }
        })
    }

    async function handleSignOut(){
        try{
            await getAuth(fbapp).signOut();
            window.location.href = "/leben-mit-zwang/login";
            console.log("User signed out!");
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])
    return <>
    <Navbartop></Navbartop>
    <div className='mt-20 flex items-center justify-center flex-col'>
        {
            userDetails ? (<><p>{userDetails.email}</p><button className="bg-red-500 rounded-xl max-w-fit p-2 hover:bg-red-400" onClick={handleSignOut}>Sign out</button></>) : (<><p>No user found.</p></>)
        }
    </div>
    </>
}