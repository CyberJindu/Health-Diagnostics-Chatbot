import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";
import { analyzeSymptoms } from "../api/gemini"; // SDK-based

function App() {
  const [messages, setMessages] = useState([
    { sender: "FastDoc", text: "Hello! I am FastDoc. How may I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "User", text }]);
    setLoading(true);

    try {
      // Call Gemini SDK for real AI-powered response
      const response = await analyzeSymptoms(text);

      // Add FastDoc response
      setMessages(prev => [...prev, { sender: "FastDoc", text: response }]);
    } catch (err) {
      console.error("Gemini API error:", err);
      setMessages(prev => [
        ...prev,
        { sender: "FastDoc", text: "Sorry, I couldn't diagnose that. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {loading && <Loader />}
        <div ref={chatEndRef} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
