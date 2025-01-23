"use client"
import { geminiCode } from "@/gemini";
import { JSX,  useState } from "react";
import { Navbartop } from "./components/Bars";



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
      <Navbartop></Navbartop>
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
