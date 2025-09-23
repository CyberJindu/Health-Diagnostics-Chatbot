import React, { useState } from "react";

function ChatInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    sendMessage(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSend}>
      <input
        type="text"
        value={text}
        placeholder="Describe your symptoms..."
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
