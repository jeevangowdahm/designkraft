import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const whatsappNumber = '919876543210'; // Indian WhatsApp Business number
  const defaultMessage = 'Hi! I am interested in interior design services from DesignKraft India. Please help me with:';

  const quickMessages = [
    'Get a free consultation',
    'Request a quote for my home',
    'Book a designer visit',
    'Know about pricing',
    'Track my project'
  ];

  const handleSendMessage = (msg?: string) => {
    const textToSend = msg || message || defaultMessage;
    const encodedMessage = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#25D366] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">DesignKraft India</h3>
                  <p className="text-xs text-white/80">Typically replies within minutes</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] min-h-[200px]">
            {/* Welcome Message */}
            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%] mb-4">
              <p className="text-sm text-gray-800">
                नमस्ते! 🙏 Welcome to DesignKraft India!
              </p>
              <p className="text-sm text-gray-800 mt-2">
                How can we help you transform your space today?
              </p>
              <span className="text-[10px] text-gray-500 mt-1 block">Just now</span>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left bg-white rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors shadow-sm border border-gray-100"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-[#F0F0F0] flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full bg-white text-sm focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#20BA5C] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5C] transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold animate-pulse">
              1
            </span>
          </>
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-20 z-50 bg-card px-3 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in hidden md:block">
          Chat with us on WhatsApp!
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
