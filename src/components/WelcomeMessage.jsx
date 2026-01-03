import React from 'react';

function WelcomeMessage({ sendMessage }) {
  const examplePrompts = [
    { title: "Explain a concept", text: "Explain quantum computing in simple terms", prompt: "Explain quantum computing in simple terms" },
    { title: "Write code", text: "Write a Python function to calculate fibonacci numbers", prompt: "Write a Python function to calculate fibonacci numbers" },
    { title: "Brainstorm ideas", text: "Help me brainstorm ideas for a sustainable business", prompt: "Help me brainstorm ideas for a sustainable business" },
    { title: "Summarize information", text: "Summarize the key events of World War II", prompt: "Summarize the key events of World War II" },
  ];

  return (
    <div className="welcome-message">
      <h1 className="welcome-title">AI Assistant</h1>
      <p className="welcome-description">Ask me anything! I can help with writing, analysis, math, coding, and more.</p>
      
      <div className="example-prompts">
        {examplePrompts.map((example, index) => (
          <div
            key={index}
            className="example-prompt"
            onClick={() => sendMessage(example.prompt)}
          >
            <div className="example-prompt-title">{example.title}</div>
            <div className="example-prompt-text">{example.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeMessage;