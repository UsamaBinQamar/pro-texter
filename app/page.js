"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleToneChange = async (tone) => {
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDFLbRDL-_obXy6qn2U5xXhqaWEcn1pQVU"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      let prompt;
      if (tone === "funny") {
        prompt = `hey convert this sentence into funny tone don't convert into long here is sentence "${inputText}"`;
      } else if (tone === "professional") {
        prompt = `hey convert this sentence into professional tone don't convert into long here is sentence "${inputText}"`;
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
    <div>
      <h1>Sentence Refraser</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here"
      />
      <button onClick={() => handleToneChange("funny")}>Funny Tone</button>
      <button onClick={() => handleToneChange("professional")}>
        Professional Tone
      </button>
      <p>{outputText}</p>
    </div>
  );
}

export default App;
