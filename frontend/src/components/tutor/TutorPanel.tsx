'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendTutorMessage, TutorMessage } from '@/services/tutorApi';
import { useCircuit } from '@/contexts/CircuitContext';

export function TutorPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([
    { 
      id: 'welcome',
      role: 'assistant', 
      content: 'Hi! I am Quanta, your AI tutor. I can explain circuit results, quantum concepts, or help you debug your experiment.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { circuit, result } = useCircuit();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      id: Date.now().toString(),
      role: 'user', 
      content: userQuery,
      timestamp: new Date().toISOString()
    }]);
    setIsLoading(true);

    try {
      const response = await sendTutorMessage(userQuery, messages);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(),
        role: 'assistant', 
        content: response.message,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(),
        role: 'assistant', 
        content: 'Sorry, I encountered an error connecting to my knowledge base.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white border-[var(--border)] shadow-md flex flex-col h-[500px] overflow-hidden">
      <div className="p-4 bg-indigo-900 border-b border-indigo-800 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-300" />
          <h3 className="font-bold text-sm">Quanta AI Tutor</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 items-end`}>
              
              <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px]
                ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                {msg.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
              </div>
              
              <div className={`px-4 py-2.5 rounded-2xl text-sm
                ${msg.role === 'user' 
                  ? 'bg-[var(--primary)] text-white rounded-br-sm' 
                  : 'bg-white border border-[var(--border)] text-[var(--foreground)] rounded-bl-sm shadow-sm'}`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] flex-row gap-2 items-end">
              <div className="w-6 h-6 shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Bot className="h-3 w-3" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-[var(--border)] text-[var(--foreground)] rounded-bl-sm shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-[var(--border)] shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the results..."
            className="flex-1 bg-gray-50 border border-[var(--input)] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isLoading}
            className="rounded-full shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
