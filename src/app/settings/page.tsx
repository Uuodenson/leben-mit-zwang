"use client"
import { JSX } from "react";

export default function Settings():JSX.Element{
    return <>
    <div className="flex flex-col justify-center items-center">
    <h2 className="mb-20 text-2xl">Settings Page</h2>
    <button onClick={()=>{window.location.href = "/"}}> B </button>
    </div>
    </>
}