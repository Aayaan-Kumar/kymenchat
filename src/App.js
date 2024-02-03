import React, { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [botMsg, setBotMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const chat = model.startChat({
  //   history: [],
  //   generationConfig: {
  //     maxOutputTokens: 100,
  //   },
  // });

  // chat.sendMessage("From now, You are Kymen - An AI Chatbot. You are here to help users in their queries. Make sure your answer is to the point and don't include any extra text in the reply.")

  async function generateText() {
    setIsLoading(true)

    try {


      const prompt = "You are Kymen - An AI Chatbot. You are here to help users in their queries. Make sure your answer is to the point and don't include any extra text in the reply. Reply to" + inputValue;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setBotMsg(text);

    } catch (error) {
      console.error("Error generating text:", error);
    }
    setIsLoading(false);
  }

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      generateText();
    }
  };


  return (
    <main>
      <section className="header">
        <h1>Mr. Kymen - An AI Chatbot</h1>
        <h4>
          Created using Google PALM LLM API by - <a href="https://kodfolio.vercel.app" target="_blank" rel="noreferrer">@Aayaan</a>
        </h4>
      </section>

      <section className="container">
        <div className="textCon">
          {inputValue && <h4 className="userMsg fade">{inputValue}</h4>}
          {isLoading && <div class="dots"></div>}
          {botMsg && <h4 className="botMsg fade">{botMsg}</h4>}
        </div>

        <div className="inputCon">
          <input
            type="text"
            placeholder="Chat with Mr. Kymen"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <a className="sendBtn" onClick={generateText}>
            <img src="./sent.png" alt="send" />
          </a>
        </div>
      </section>

      <a className="githubLogo" href="https://github.com/Aayaan-Kumar/kymenchat">
        <img src="./github.png" alt="github" />
      </a>

    </main>
  );
}

export default App;
