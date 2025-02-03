'use client'
import fbapp, { db } from "@/lib/api/firebase";
import { createUserWithEmailAndPassword, getAuth, User } from "firebase/auth";
import { ChangeEvent, JSX, useState } from "react";
import { setDoc, doc } from "firebase/firestore"
import Link from "next/link";
import SocialSignIn from "@/components/auth/SocialSignIn";
import { useRouter } from "next/navigation";

export default function Signup(): JSX.Element {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();

    async function handleSubmit(e: ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        setError("");
        
        try {
            const auth = getAuth(fbapp);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
            });
            
            router.push('/profile');
        } catch (error: any) {
            console.error("Error during user creation:", error);
            setError(error.message || "An error occurred during sign up");
        }
    }

    const handleSocialSuccess = async (user: User) => {
        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
                provider: user.providerData[0]?.providerId
            }, { merge: true });
            
            router.push('/profile');
        } catch (error: any) {
            console.error("Error saving user data:", error);
            setError(error.message || "An error occurred while saving user data");
        }
    };

    return (
        <div className="flex flex-row min-h-screen justify-center items-center m-2 text-slate-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                
                <SocialSignIn 
                    onSuccess={handleSocialSuccess}
                    onError={(error) => setError(error.message)}
                />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
