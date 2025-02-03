"use client"
import fbapp from "@/lib/api/firebase";
import { getAuth, User } from "firebase/auth";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

function useIsMobile() {
  return useMediaQuery({ query: '(max-width: 782px)' });
}

export function Navbartop(): JSX.Element {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const auth = getAuth(fbapp);
    return auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth(fbapp);
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-white hover:text-gray-100 transition-colors"
          >
            <span className="text-xl font-bold tracking-wide">Leben mit Zwang</span>
          </Link>

          {/* Desktop Navigation */}
          {(!isMobile && hasMounted) && (
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-gray-200 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-gray-200 transition-colors">
                Über uns
              </Link>
              <Link href="/services" className="text-white hover:text-gray-200 transition-colors">
                Angebote
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
                Kontakt
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/profile"
                    className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {user.email?.[0].toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <span>Profil</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Abmelden
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Anmelden
                </Link>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {(isMobile && hasMounted) && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {(isOpen && isMobile && hasMounted) && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Über uns
            </Link>
            <Link
              href="/services"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Angebote
            </Link>
            <Link
              href="/contact"
              className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </Link>
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profil
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Anmelden
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}