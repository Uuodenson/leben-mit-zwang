'use client'
import fbapp from "@/lib/api/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbartop } from "../components/Bars";
import SocialSignIn from "@/components/auth/SocialSignIn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const auth = getAuth(fbapp);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error: any) {
      console.error("Login error:", error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Ungültige E-Mail-Adresse.');
          break;
        case 'auth/user-disabled':
          setError('Dieser Account wurde deaktiviert.');
          break;
        case 'auth/user-not-found':
          setError('Kein Account mit dieser E-Mail-Adresse gefunden.');
          break;
        case 'auth/wrong-password':
          setError('Falsches Passwort.');
          break;
        default:
          setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSocialSuccess = () => {
    router.push('/profile');
  };

  const handleSocialError = (error: Error) => {
    setError('Fehler bei der Anmeldung mit Social Media. Bitte versuchen Sie es später erneut.');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbartop />
      <div className="flex justify-center items-center px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Willkommen zurück</h1>
            <p className="text-gray-600 mt-2">
              Melden Sie sich an, um fortzufahren
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-800 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-2 px-4 rounded-lg text-white font-medium
                ${loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Anmeldung...
                </span>
              ) : (
                'Anmelden'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Oder melden Sie sich an mit
                </span>
              </div>
            </div>

            <div className="mt-6">
              <SocialSignIn
                onSuccess={handleSocialSuccess}
                onError={handleSocialError}
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Noch kein Konto?{' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Jetzt registrieren
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
