"use client"
import { fbapp, db } from "@/firebase";
import { geminiCode } from "@/gemini";
import { getAuth } from "firebase/auth";
import { JSX, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { type } from "os";

function useIsMobile(){
  return useMediaQuery({ query: '(max-width: 782px)' });
}





export function NavBar(): JSX.Element {
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
          <a href="/" className="text-white text-lg font-bold">
            Leben mit Zwang
          </a>
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
            <a href="/about" className="block text-white py-2 px-4 hover:bg-gray-700">
              Über uns
            </a>
            <a href="/services" className="block text-white py-2 px-4 hover:bg-gray-700">
              Angebote
            </a>
            <a href="/contact" className="block text-white py-2 px-4 hover:bg-gray-700">
              Kontakt
            </a>
          </div>
        )}
      </nav>
      {(!loggedIn && hasMounted) && (<>
      <button className="fixed bottom-0 right-1/2" onClick={()=>{window.location.href = "/login"}}>Log in</button>
      </>)}
    </>
  );
}



export default function Home():JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [geminiResult, setGeminiResult] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    const result = await geminiCode(inputValue);
    setGeminiResult(result);
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your prompt here..."
          />
          <button onClick={handleButtonClick} className="bg-blue-600 hover:bg-blue-700 font-bold py-3 px-6 rounded-md transition duration-300">
            Generate
          </button>
        </div>
        {geminiResult && <div className="bg-gray-100 p-4 rounded-md shadow-md whitespace-pre-wrap text-black">{geminiResult}</div>}
      </div>
    </> 
  );
}
