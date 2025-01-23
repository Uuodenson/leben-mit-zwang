import { JSX } from "react";
import { NavBar } from "../page";
export default function contact(): JSX.Element {
    return (<>
        <NavBar></NavBar>
        <div className="bg-white text-slate-900 rounded-lg w-1/2 flex flex-col flex-1 justify-center items-center">
            <h1>Kontakt</h1>
            <h2>Kevin Augschoell</h2>
            <p>Email: <a>kevin.augschoell@outlook.de</a></p>
        </div>
    </>)
}