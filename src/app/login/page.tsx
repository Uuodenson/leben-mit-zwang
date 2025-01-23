'use client'
import { fbapp } from "@/firebase";
import { signInWithEmailAndPassword, getAuth, User } from "firebase/auth";
import { ChangeEvent, Dispatch, JSX, SetStateAction, useState } from "react";
export default function Login(): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser]: [User | undefined, Dispatch<SetStateAction<User | undefined>>] = useState()
    async function handleSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const auth = getAuth(fbapp);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user))
                console.log("User logged in", user);
                window.location.href = "/leben-mit-zwang/profile";
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <div className="flex flex-row min-h-screen justify-center items-center m-2 text-slate-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {
                    user && <h2 className="text-2xl font-bold text-center mb-6">Logging In as {user.email}</h2>
                }
                <form onSubmit={handleSubmit} action="" method="get" className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block mb-2">
                            Email:
                        </label>
                        <input
                            onChange={(value) => {
                                setEmail(value.target.value)
                            }}
                            type="text"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className
                            ="block mb-2">
                            Password:
                        </label>
                        <input
                            onChange={(value) => {
                                setPassword(value.target.value)
                            }}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Log in
                    </button>
                    <p className="text-center text-gray-600">
                        No Accountt?{" "}
                        <a href="/singup" className="text-blue-500 hover:underline">
                            Signup
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
