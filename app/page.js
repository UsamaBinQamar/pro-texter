"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function SentenceRephraser() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "AIzaSyDFLbRDL-_obXy6qn2U5xXhqaWEcn1pQVU";

  const handleToneChange = async (tone) => {
    if (!inputText.trim()) {
      alert("Please enter some text first!");
      return;
    }

    setIsLoading(true);
    setOutputText("");

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const tonePrompts = {
        funny: `Rephrase this sentence in a hilarious, witty tone: "${inputText}"`,
        professional: `Rephrase this sentence in a formal, corporate professional tone: "${inputText}"`,
        sarcastic: `Rephrase this sentence with maximum sarcasm and subtle mockery: "${inputText}"`,
        poetic: `Transform this sentence into a lyrical, metaphorical poetic expression: "${inputText}"`,
        motivational: `Rewrite this sentence as an inspiring, empowering motivational statement: "${inputText}"`,
        casual: `Rephrase this sentence in a relaxed, friendly, conversational way: "${inputText}"`,
        academic: `Rephrase this sentence in a scholarly, intellectually rigorous academic tone: "${inputText}"`,
        dramatic: `Dramatically amplify this sentence with intense emotional language: "${inputText}"`,
        minimalist: `Distill this sentence to its most essential, concise form: "${inputText}"`,
        empathetic: `Rephrase this sentence with deep emotional understanding and compassion: "${inputText}"`,
      };

      const prompt = tonePrompts[tone];
      if (!prompt) {
        throw new Error("Invalid tone selected");
      }

      const result = await model.generateContent(prompt);
      setOutputText(result.response.text());
    } catch (error) {
      console.error("Error:", error);
      setOutputText("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sentence Tone Transformer
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your text and choose a tone to transform it
        </p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here"
          className="w-full min-h-[100px] p-4 text-lg border border-gray-300 rounded-lg mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { tone: "funny", color: "pink" },
            { tone: "professional", color: "blue" },
            { tone: "sarcastic", color: "purple" },
            { tone: "poetic", color: "green" },
            { tone: "motivational", color: "yellow" },
            { tone: "casual", color: "indigo" },
            { tone: "academic", color: "red" },
            { tone: "dramatic", color: "orange" },
            { tone: "minimalist", color: "gray" },
            { tone: "empathetic", color: "teal" },
          ].map(({ tone, color }) => (
            <button
              key={tone}
              onClick={() => handleToneChange(tone)}
              disabled={isLoading || !inputText.trim()}
              className={`bg-${color}-500 hover:bg-${color}-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 text-sm`}
            >
              {isLoading
                ? "Transforming..."
                : `${tone.charAt(0).toUpperCase() + tone.slice(1)} Tone`}
            </button>
          ))}
        </div>
        {isLoading && (
          <div className="text-center text-gray-500 mb-4">
            Transforming your text...
          </div>
        )}
        {outputText && (
          <div className="w-full">
            <p className="text-gray-800 text-lg p-4 bg-gray-100 rounded-lg animate-fade-in">
              {outputText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
