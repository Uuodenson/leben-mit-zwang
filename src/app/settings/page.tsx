"use client"
import { JSX } from "react";
import { Navbartop } from "../components/Bars";
export default function Settings():JSX.Element{
    return <>
    <Navbartop key={'222'}></Navbartop>
    <div className="flex flex-col justify-center items-center">
    <h2 className="mb-20 text-2xl">Settings Page</h2>
    </div>
    </>
}