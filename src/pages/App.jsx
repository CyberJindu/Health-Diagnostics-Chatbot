import React, { useState, useRef, useEffect } from "react";
import "../styles/chat.css";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";
import { analyzeSymptoms } from "../api/gemini";

function App() {
  const [messages, setMessages] = useState([
    { sender: "FastDoc", text: "Hello! I am FastDoc. How may I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "User", text }]);
    setLoading(true);

    try {
      const response = await analyzeSymptoms(text);

      let displayedText = "";
      const chunkSize = 40;
      for (let i = 0; i < response.length; i += chunkSize) {
        displayedText = response.slice(0, i + chunkSize);
        setMessages((prev) => {
          const msgs = [...prev];
          if (msgs[msgs.length - 1]?.sender === "FastDocTemp") {
            msgs[msgs.length - 1].text = displayedText;
          } else {
            msgs.push({ sender: "FastDocTemp", text: displayedText });
          }
          return msgs;
        });
        await new Promise((r) => setTimeout(r, 200));
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.sender === "FastDocTemp" ? { sender: "FastDoc", text: m.text } : m
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "FastDoc",
          text: "Sorry, something went wrong. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h2>
          <span className="brand-fast">Fast</span>
          <span className="brand-doc">Doc</span>
        </h2>
        <p className="brand-slogan">Your Health, Explained in Seconds.</p>
      </div>


      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <Loader />}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
