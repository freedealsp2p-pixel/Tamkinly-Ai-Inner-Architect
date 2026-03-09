import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToTamkinly } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      content: "I'm here when you want to think things through.",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToTamkinly(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mini Avatar Component - Idle State: Deep Breath (24s)
  const MiniCrystalAvatar = () => (
    <div className="w-8 h-8 relative flex-shrink-0 flex items-center justify-center opacity-60 mt-2 mr-4 self-start hidden md:flex animate-deep-breath">
      <div className="absolute w-4 h-4 border border-violet-400/20 rotate-45 rounded-[1px]"></div>
      <div className="absolute w-1 h-1 bg-violet-300/40 rounded-full"></div>
    </div>
  );

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 space-y-8 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full animate-gentle-rise ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && <MiniCrystalAvatar />}
            
            <div
              className={`max-w-[90%] md:max-w-[70%] text-base md:text-[1.05rem] relative group ${
                msg.role === 'user'
                  ? 'tamkinly-user-message'
                  : 'tamkinly-agent-message'
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
              
              <button
                onClick={() => handleCopyMessage(msg.content, msg.id)}
                className={`absolute top-2 right-2 p-1.5 rounded-md bg-violet-900/40 text-violet-300 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-800/60 ${copiedMessageId === msg.id ? 'opacity-100 text-emerald-300' : ''}`}
                title="Copy reflection"
              >
                {copiedMessageId === msg.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
        
        {/* Thinking State - Contemplative Void (No bouncing dots) */}
        {isLoading && (
          <div className="flex justify-start w-full animate-gentle-rise">
             <MiniCrystalAvatar />
             <div className="tamkinly-agent-message py-4 px-6 min-w-[120px] relative overflow-hidden group">
                {/* Slow wave-like shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/5 to-transparent bg-[length:200%_100%] animate-void-shimmer"></div>
                
                {/* Subtle static pulsing core */}
                <div className="flex items-center space-x-2 opacity-50">
                  <span className="text-xs tracking-[0.2em] font-light text-violet-300 uppercase">Reflecting</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-6" />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-12 sticky bottom-0 z-10">
         {/* Gradient fade above input */}
        <div className="absolute top-[-50px] left-0 right-0 h-[50px] bg-gradient-to-t from-[#05020a] to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[#05020a]/80 backdrop-blur-sm -z-10"></div>
        
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Explore your thoughts here..."
            className={`tamkinly-agent-input transition-all duration-700 ease-out
              ${isInputFocused 
                ? 'scale-[1.005] border-violet-400/40 shadow-[0_0_40px_rgba(139,92,246,0.05)] animate-listening-pulse' 
                : 'scale-100 border-violet-500/20 shadow-none'
              }
            `}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`absolute right-4 p-2 transition-all duration-700 ${
              input.trim() ? 'text-violet-200 opacity-100' : 'text-violet-400/30 opacity-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        <div className="text-center mt-4 opacity-40 transition-opacity duration-1000 hidden md:block">
            <span className="text-[9px] text-violet-300/80 uppercase tracking-[0.3em] font-light">Reflect • Clarify • Choose</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;