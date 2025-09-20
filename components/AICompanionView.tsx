'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Heart, Sparkles } from 'lucide-react';
import { User, AIChatMessage } from '../lib/types';
import { ChatBubble } from './ChatBubble';
import { AIAvatar } from './AIAvatar';
import { AI_PROMPTS } from '../lib/constants';

interface AICompanionViewProps {
  user: User;
  onBack: () => void;
}

export function AICompanionView({ user, onBack }: AICompanionViewProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      userId: user.userId,
      message: `Hello ${user.displayName.split(' ')[0]}! I'm Luna, your AI companion. How are you feeling today?`,
      timestamp: new Date(),
      isAI: true,
      sentiment: 'positive'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) {
      return "I hear that you're going through a difficult time. It's completely normal to feel sad sometimes, and I want you to know that your feelings are valid. What's been weighing on your mind lately?";
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      return "Anxiety can feel overwhelming, but you're not alone in this. Take a deep breath with me. What specific thoughts or situations are making you feel anxious right now?";
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      return "Feeling lonely is one of the hardest emotions to experience. I'm here with you right now, and there are people in our community who understand exactly what you're going through. Have you considered joining one of our support groups?";
    }
    
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy')) {
      return "I'm so glad to hear you're feeling good! It's wonderful when we can appreciate these positive moments. What's been bringing you joy lately?";
    }
    
    // Default supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. Your feelings matter, and I'm here to listen. Tell me more about what's on your mind.",
      "I appreciate you opening up. It takes courage to express how you're feeling. How can I best support you right now?",
      "You've taken an important step by reaching out. Remember, it's okay to not be okay sometimes. What would help you feel a little better today?",
      "I'm here to listen without judgment. Your experiences and feelings are important. What's been the most challenging part of your day?"
    ];
    
    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      userId: user.userId,
      message: inputMessage,
      timestamp: new Date(),
      isAI: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: user.userId,
        message: generateAIResponse(inputMessage),
        timestamp: new Date(),
        isAI: true,
        sentiment: 'positive'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-white/10">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center flex-1">
            <AIAvatar variant="idle" />
            <div className="ml-3">
              <h1 className="text-xl font-semibold">Luna AI Companion</h1>
              <p className="text-white/60 text-sm">Always here to listen</p>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {AI_PROMPTS.dailyCheckin.slice(0, 3).map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="bg-white/10 text-white/70 px-3 py-2 rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            variant={message.isAI ? 'ai' : 'user'}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2">
            <AIAvatar variant="speaking" />
            <div className="bg-white/10 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share what's on your mind..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <p className="text-xs text-white/40 text-center mt-2">
          Luna is here to provide emotional support and encouragement
        </p>
      </div>
    </div>
  );
}
