import React from "react";

function ChatBubble({ sender, text }) {
  const isUser = sender === "User";
  return (
    <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>
      {!isUser && <strong>FastDoc: </strong>}
      {text}
    </div>
  );
}

export default ChatBubble;
