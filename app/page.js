"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function SentenceRephraser() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const apiKey = "AIzaSyDFLbRDL-_obXy6qn2U5xXhqaWEcn1pQVU"; // Replace with your actual API key

  const handleToneChange = async (tone) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt;
      if (tone === "funny") {
        prompt = `you are AI rephraser just convert this sentence into funny tone don't convert into long sentence here is sentence "${inputText}"`;
      } else if (tone === "professional") {
        prompt = `you are AI rephraser just convert this sentence into professional tone don't convert into long sentence here is sentence "${inputText}"`;
      } else {
        return; // Handle invalid tone
      }

      const result = await model.generateContent(prompt);
      setOutputText(result.response.text());
    } catch (error) {
      console.error("Error:", error);
      setOutputText("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sentence Rephraser
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your text and choose a tone to rephrase it
        </p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here"
          className="w-full min-h-[100px] p-4 text-lg border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleToneChange("funny")}
            // disabled={isLoading || !inputText.trim()}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            {/* {isLoading ? "Loading..." : "Funny Tone"} */}
          </button>
          <button
            onClick={() => handleToneChange("professional")}
            // disabled={isLoading || !inputText.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
          >
            {/* {isLoading ? "Loading..." : "Professional Tone"} */}
          </button>
        </div>
        <div className="w-full">
          {/* {error && (
            <p className="text-red-500 text-center mb-2">
              {error.message || "An error occurred. Please try again."}
            </p>
          )} */}
          {outputText && (
            <p className="text-gray-800 text-lg p-4 bg-gray-100 rounded-lg animate-fade-in">
              {outputText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
