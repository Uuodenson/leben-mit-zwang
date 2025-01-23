import { JSX } from "react";
import { Navbartop } from "../components/Bars";
export default function Contact(): JSX.Element {
    return (<>
        <Navbartop></Navbartop>
        <div className="bg-white text-slate-900 rounded-lg w-1/2 flex flex-col flex-1 justify-center items-center">
            <h1>Kontakt</h1>
            <h2>Kevin Augschoell</h2>
            <p>Email: <a>kevin.augschoell@outlook.de</a></p>
        </div>
    </>)
}