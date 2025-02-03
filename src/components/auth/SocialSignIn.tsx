'use client';


import  fbapp  from '@/lib/api/firebase';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, User } from 'firebase/auth';
import Image from 'next/image';

interface SocialSignInProps {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export default function SocialSignIn({ onSuccess, onError }: SocialSignInProps) {
  const auth = getAuth(fbapp);
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider('apple.com');

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess?.(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
      onError?.(error as Error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      onSuccess?.(result.user);
    } catch (error) {
      console.error('Apple sign-in error:', error);
      onError?.(error as Error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center gap-3 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <Image
          src="/google-icon.svg"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <button
        onClick={handleAppleSignIn}
        className="flex items-center justify-center gap-3 w-full px-4 py-2 text-white bg-black border border-gray-300 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
        Continue with Apple
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">Or</span>
        </div>
      </div>
    </div>
  );
}
