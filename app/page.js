"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function SentenceRephraser() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_GEMINI_API_KEY;

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
        funny: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence.  Rephrase this sentence in a hilarious, witty tone here is sentence "${inputText}"`,
        professional: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Rephrase this sentence in a formal, corporate professional tone here is sentence "${inputText}"`,
        sarcastic: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Rephrase this sentence with maximum sarcasm and subtle mockery here is sentence "${inputText}"`,
        poetic: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Transform this sentence into a lyrical, metaphorical poetic expression here is sentence "${inputText}"`,
        motivational: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Rewrite this sentence as an inspiring, empowering motivational statement here is sentence "${inputText}"`,
        casual: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Rephrase this sentence in a relaxed, friendly, conversational way here is sentence "${inputText}"`,
        academic: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Rephrase this sentence in a scholarly, intellectually rigorous academic tone here is sentence "${inputText}"`,
        dramatic: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Dramatically amplify this sentence with intense emotional language here is sentence "${inputText}"`,
        minimalist: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Distill this sentence to its most essential, concise form here is sentence"${inputText}"`,
        empathetic: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentenceRephrase this sentence with deep emotional understanding and compassion: "${inputText}"`,
        grammerly: `You are AI my assistant that can change the tone of the sentence. Don't change the meaning of the sentence. Only change the tone of the sentence. don't convert too much length of the sentence and give only one sentence Correct and improve the grammar, sentence structure, and clarity of this text. Ensure it is grammatically perfect while maintaining the original meaning here is sentence "${inputText}"`,
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6  justify-items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Text Transformer
        </h1>
        {/* <p className="text-center text-gray-600 mb-6">
          Transform your text by selecting a desired tone.
        </p> */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here"
          className="min-w-96 min-h-[100px] p-4 text-lg border border-gray-300 rounded-lg mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { tone: "funny", color: "pink" },
            { tone: "professional", color: "cyan" },
            { tone: "sarcastic", color: "purple" },
            { tone: "poetic", color: "green" },
            { tone: "motivational", color: "yellow" },
            { tone: "casual", color: "yellow" },
            { tone: "academic", color: "red" },
            { tone: "dramatic", color: "orange" },
            { tone: "minimalist", color: "cyan" },
            { tone: "empathetic", color: "teal" },
            { tone: "grammerly", color: "cyan" },
          ].map(({ tone, color }) => (
            <button
              key={tone}
              onClick={() => handleToneChange(tone)}
              disabled={isLoading || !inputText.trim()}
              style={{ backgroundColor: color, color: "black" }}
              className={`  font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 text-sm`}
            >
              <span style={{ backgroundColor: color, color: "black" }}>
                {isLoading
                  ? "Transforming..."
                  : `${tone.charAt(0).toUpperCase() + tone.slice(1)}  `}
              </span>
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
