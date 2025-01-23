"use client"
import { fbapp } from "@/firebase";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
function useIsMobile(){
    return useMediaQuery({ query: '(max-width: 782px)' });
  }
export function Navbartop(): JSX.Element {
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const fetchUserData = async ()=>{
      getAuth(fbapp).onAuthStateChanged(async (user) => {
          console.log(user)
          if(user) setLoggedIn(true)
      })
  }
    useEffect(() => {
      // Set hasMounted to true after the component has mounted
      setHasMounted(true);
      fetchUserData()
    }, []);
    return (
      <>
  {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:497104064. */}
        <nav className="bg-gray-800 p-4 rounded-b-2xl">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-lg font-bold">
              Leben mit zwang
            </Link>
            <div>
              {
                (isMobile&&hasMounted) && (
                  <div className="flex items-center">
                    <button className="text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        />
                      </svg>
                    </button>
                  </div>
                )
              }
              {(!isMobile && hasMounted) && (
                <>
                  <div className="flex items-center space-x-4">
                    <a href="/about" className="text-white hover:text-gray-300">
                      Über uns
                    </a>
                    <a href="/services" className="text-white hover:text-gray-300">
                      Angebote
                    </a>
                    <a href="/contact" className="text-white hover:text-gray-300">
                      Kontakt
                    </a>
                  </div>
                </>
              )}
  
            </div>
          </div>
          {(isOpen && isMobile && hasMounted) && (
            <div className="md:hidden">
              <Link href="/about" className="block text-white py-2 px-4 hover:bg-gray-700">
                Über uns
              </Link>
              <Link href="/services" className="block text-white py-2 px-4 hover:bg-gray-700">
                Angebote
              </Link>
              <Link href="/contact" className="block text-white py-2 px-4 hover:bg-gray-700">
                Kontakt
              </Link>
            </div>
          )}
        </nav>
        {(!loggedIn && hasMounted) && (<>
        <button className="fixed bottom-0 right-1/2" onClick={()=>{window.location.href = "/login"}}>Log in</button>
        </>)}
      </>
    );
  }