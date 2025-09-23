import React from "react";

function ChatBubble({ sender, text, timestamp }) {
  const isUser = sender === "User";

  const renderText = () => {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const elements = [];
    let currentList = null;
    let buffer = [];

    const flushBuffer = () => {
      if (!buffer.length) return;

      if (currentList === "ul") {
        elements.push(
          <ul key={elements.length}>
            {buffer.map((b, i) => (
              <li key={i}>{formatText(b)}</li>
            ))}
          </ul>
        );
      } else if (currentList === "ol") {
        elements.push(
          <ol key={elements.length}>
            {buffer.map((b, i) => (
              <li key={i}>{formatText(b)}</li>
            ))}
          </ol>
        );
      } else {
        buffer.forEach((b) =>
          elements.push(<p key={elements.length}>{formatText(b)}</p>)
        );
      }

      buffer = [];
      currentList = null;
    };

    // helper to apply *italic* and **bold**
    const formatText = (line) => {
      const parts = [];
      const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
      let lastIndex = 0;

      line.replace(regex, (match, _, offset) => {
        if (offset > lastIndex) {
          parts.push(line.slice(lastIndex, offset));
        }

        if (match.startsWith("**")) {
          parts.push(<strong key={parts.length}>{match.slice(2, -2)}</strong>);
        } else {
          parts.push(<em key={parts.length}>{match.slice(1, -1)}</em>);
        }

        lastIndex = offset + match.length;
      });

      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      return parts.length ? parts : line;
    };

    lines.forEach(line => {
      if (/^\*\s+/.test(line)) {
        if (currentList !== "ul") flushBuffer();
        currentList = "ul";
        buffer.push(line.replace(/^\*\s+/, ""));
      } else if (/^\d+\.\s+/.test(line)) {
        if (currentList !== "ol") flushBuffer();
        currentList = "ol";
        buffer.push(line.replace(/^\d+\.\s+/, ""));
      } else {
        if (currentList) flushBuffer();
        buffer.push(line);
      }
    });

    flushBuffer();
    return <div>{elements}</div>;
  };

  return (
    <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>
      {renderText()}
      {timestamp && <span className="timestamp">{timestamp}</span>}
    </div>
  );
}

export default ChatBubble;
