import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Send, Mic, MicOff, Bot, User, Sparkles, X } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const designResponses: { [key: string]: string } = {
  color: "For interior colors, consider: warm neutrals (beige, cream) create cozy spaces, cool tones (blue, gray) feel modern, and accent colors add personality. The 60-30-10 rule works great: 60% dominant color, 30% secondary, 10% accent.",
  small: "To maximize small spaces: use light colors to expand visually, incorporate mirrors, choose multi-functional furniture, go vertical with storage, and maintain clear sightlines. Floating furniture and glass elements help too!",
  modern: "Modern interior design features: clean lines, minimal ornamentation, neutral palettes with bold accents, natural materials (wood, stone, metal), open floor plans, and emphasis on functionality. Think 'less is more'.",
  budget: "Budget-friendly design tips: repaint walls for instant transformation, update hardware/fixtures, use statement lighting, add plants, DIY artwork, shop secondhand, and focus on high-impact items like rugs and curtains.",
  lighting: "Lighting layers are key: ambient (general overhead), task (focused work areas), accent (highlighting features), and decorative (statement pieces). Consider natural light first, then add artificial layers. Dimmers are essential!",
  sustainable: "Sustainable interior design includes: reclaimed/recycled materials, energy-efficient appliances, LED lighting, low-VOC paints, natural textiles, upcycled furniture, and indoor plants for air quality. Consider longevity over trends!",
  default: "I'd be happy to help with your interior design questions! I can assist with color schemes, space planning, furniture selection, lighting design, sustainable materials, budget optimization, and style recommendations. What specific aspect would you like to explore?"
};

const AIChat: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: t('chat_welcome'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('color') || lowerMessage.includes('paint') || lowerMessage.includes('palette')) {
      return designResponses.color;
    }
    if (lowerMessage.includes('small') || lowerMessage.includes('space') || lowerMessage.includes('tiny')) {
      return designResponses.small;
    }
    if (lowerMessage.includes('modern') || lowerMessage.includes('contemporary') || lowerMessage.includes('minimalist')) {
      return designResponses.modern;
    }
    if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('afford') || lowerMessage.includes('cost')) {
      return designResponses.budget;
    }
    if (lowerMessage.includes('light') || lowerMessage.includes('lamp') || lowerMessage.includes('bright')) {
      return designResponses.lighting;
    }
    if (lowerMessage.includes('eco') || lowerMessage.includes('sustain') || lowerMessage.includes('green') || lowerMessage.includes('environment')) {
      return designResponses.sustainable;
    }
    
    return designResponses.default;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-copper text-primary-foreground shadow-copper hover:shadow-lg-soft hover:scale-110 transition-all duration-300 flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
      >
        <Bot className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] sm:w-[420px] h-[600px] max-h-[80vh] bg-card rounded-3xl shadow-lg-soft border border-border/50 flex flex-col overflow-hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border bg-gradient-copper text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{t('chat_title')}</h3>
                <p className="text-xs opacity-80">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-primary/10' : 'bg-sage/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-sage" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-md'
                    : 'bg-muted text-foreground rounded-tl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-sage/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-sage" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('chat_placeholder')}
                className="w-full px-4 py-3 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleListening}
              className={`rounded-xl ${isListening ? 'bg-destructive/10 text-destructive' : ''}`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={sendMessage}
              className="rounded-xl"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
