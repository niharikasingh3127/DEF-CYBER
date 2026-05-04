import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'; // We will create this styling next

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "/// SYSTEM INITIALIZED ///\nWelcome to UNIT-772 Command AI.\nHow can I assist with your operation today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // 2. Simulate Bot Response (Simple Logic)
    setTimeout(() => {
      let botResponse = "Access Denied. Insufficient clearance level.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) botResponse = "Connection established. Identify yourself.";
      if (lowerInput.includes('report') || lowerInput.includes('virus')) botResponse = "To report a virus, please use the 'Forensics' tab on your dashboard.";
      if (lowerInput.includes('status')) botResponse = "All systems operational. Satellite uplinks are stable.";
      if (lowerInput.includes('help')) botResponse = "Available Commands: REPORT, STATUS, SCAN, UPLINK.";

      const botMsg = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {/* Background Overlay */}
      <div className="cyber-grid-bg"></div>

      <div className="chat-interface">
        <div className="chat-header">
          <h3>NEURAL LINK v4.0 // SECURE CHANNEL</h3>
          <div className="status-light"></div>
        </div>

        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="msg-content">
                {msg.sender === 'bot' && <span className="sender-tag">[AI-CORE]:</span>}
                {msg.sender === 'user' && <span className="sender-tag">[OPERATOR]:</span>}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="input-area">
          <span className="prompt">{'>'}</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command or query..."
            autoFocus
          />
          <button type="submit">TRANSMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;