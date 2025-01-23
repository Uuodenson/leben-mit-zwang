'use client'
import { fbapp, db } from "@/firebase";
import { createUserWithEmailAndPassword, getAuth, User } from "firebase/auth";
import { ChangeEvent, Dispatch, JSX, SetStateAction, useState } from "react";
import { setDoc, doc } from "firebase/firestore"
export default function Signup(): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser]: [User | undefined, Dispatch<SetStateAction<User | undefined>>] = useState()

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        const auth = getAuth(fbapp);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setUser(user);
                console.log("User created:", user);
                if (user) {
                    setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        
                    })
                }
            })
            .catch((error) => {
                const errorCode = error.
                    code;
                const errorMessage = error.message;
                console.error("Error during user creation:", errorCode, errorMessage);
            });
        return;

    }
    return (
        <div className="flex flex-row min-h-screen justify-center items-center m-2 text-slate-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up, {JSON.stringify(user)}</h2>
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
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600">
                        Already registered?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}