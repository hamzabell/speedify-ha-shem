'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppConfig } from '@/lib/store/config-context';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'action';
  actionUrl?: string;
  actionLabel?: string;
}

type ChannelType = 'whatsapp' | 'telegram' | 'native';

export default function ChatDemo() {
  const { config } = useAppConfig();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChannelType>('whatsapp'); // Default to whatsapp look
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWebview, setShowWebview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with config
  useEffect(() => {
     if (config?.chat) {
         setMessages([
            {
                id: '1',
                text: config.chat.welcomeMessage || 'Hi there! I am the Speedify Assistant. How can I help you today?',
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
         ]);
         
         // Set initial channel based on what is enabled
         if (config.chat.enabledChannels?.native) setCurrentChannel('native');
         else if (config.chat.enabledChannels?.telegram) setCurrentChannel('telegram');
         else if (config.chat.enabledChannels?.whatsapp) setCurrentChannel('whatsapp');
     }
  }, [config]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I didn't understand that. You can type 'verify' to start the KYC process.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      if (userMsg.text.toLowerCase().includes('verify') || userMsg.text.toLowerCase().includes('kyc')) {
        botMsg = {
          id: (Date.now() + 1).toString(),
          text: 'Great! To verify your identity, please click the button below to open the secure form.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'action',
          actionLabel: 'Start Verification',
          actionUrl: '/kyc/step/1?mode=webview',
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAction = (url?: string) => {
    if (url) {
      setShowWebview(true);
    }
  };

  // Channel Specific Styles
  const getStyles = (channel: ChannelType) => {
      switch(channel) {
          case 'telegram':
              return {
                  header: 'bg-[#517da2] text-white',
                  bg: 'bg-[#85a8c2]', // Simpler solid color for cleanliness
                  bgImage: '',
                  bubbleUser: 'bg-[#effdde]',
                  bubbleBot: 'bg-white',
                  verifyButton: 'bg-[#517da2] hover:bg-[#436785]'
              };
          case 'native':
              const themeColor = config?.primaryColor || '#0A3928';
              return {
                  header: `bg-[${themeColor}] text-white`,
                  headerStyle: { backgroundColor: themeColor },
                  bg: 'bg-gray-50',
                  bgImage: '',
                  bubbleUser: `bg-[${themeColor}] text-white`,
                  bubbleUserStyle: { backgroundColor: themeColor, color: 'white' },
                  bubbleBot: 'bg-white border border-gray-100',
                  verifyButton: `bg-[${themeColor}] hover:opacity-90`
              };
          case 'whatsapp':
          default:
              return {
                header: 'bg-[#075e54] text-white',
                bg: 'bg-[#e5ddd5]',
                bgImage: "url('https://t3.ftcdn.net/jpg/04/47/63/01/360_F_447630132_X7rQc7f9X0ab1a2.jpg')",
                bubbleUser: 'bg-[#dcf8c6]',
                bubbleBot: 'bg-white',
                verifyButton: 'bg-[#075e54] hover:bg-[#128c7e]'
              };
      }
  };

  const styles = getStyles(currentChannel);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-md gap-4">
        
        {/* Channel Switcher (Demo Only) */}
        <div className="flex gap-2 justify-center bg-gray-800 p-2 rounded-full self-center">
             {config?.chat?.enabledChannels?.whatsapp && (
                 <button onClick={() => setCurrentChannel('whatsapp')} className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${currentChannel === 'whatsapp' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                     WhatsApp
                 </button>
             )}
            {config?.chat?.enabledChannels?.telegram && (
                 <button onClick={() => setCurrentChannel('telegram')} className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${currentChannel === 'telegram' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                     Telegram
                 </button>
             )}
             {config?.chat?.enabledChannels?.native && (
                 <button onClick={() => setCurrentChannel('native')} className={`px-4 py-1 rounded-full text-xs font-bold transition-colors ${currentChannel === 'native' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}>
                     Native App
                 </button>
             )}
        </div>

        <div className="w-full bg-[#e5ddd5] rounded-3xl overflow-hidden shadow-2xl relative h-[700px] flex flex-col transition-all duration-300">
            {/* Header */}
            <div className={`p-4 flex items-center justify-between shadow-md z-10 transition-colors duration-300 ${styles.header}`} style={styles.headerStyle}>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold">S</span>
                </div>
                <div>
                <h3 className="font-semibold">{config.chat?.botName || "Speedify Support"}</h3>
                <p className="text-xs opacity-80">Online</p>
                </div>
            </div>
            <div className="flex space-x-4">
                <Video className="w-5 h-5" />
                <Phone className="w-5 h-5" />
                <MoreVertical className="w-5 h-5" />
            </div>
            </div>

            {/* Chat Area */}
            <div 
                className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${styles.bg}`} 
                style={{ backgroundImage: styles.bgImage, backgroundBlendMode: 'soft-light' }}
            >
            {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                <div
                    className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm shadow-sm relative transition-colors duration-300",
                        msg.sender === 'user' ? `${styles.bubbleUser} rounded-tr-none px-4` : `${styles.bubbleBot} rounded-tl-none`
                    )}
                    style={msg.sender === 'user' ? styles.bubbleUserStyle : {}}
                >
                    <p>{msg.text}</p>
                    {msg.type === 'action' && (
                    <Button 
                        className={`mt-3 w-full transition-colors duration-300 ${styles.verifyButton}`} 
                        style={styles.headerStyle}
                        size="sm"
                        onClick={() => handleAction(msg.actionUrl)}
                    >
                        {msg.actionLabel}
                    </Button>
                    )}
                    <span className="text-[10px] opacity-60 absolute bottom-1 right-2">
                    {msg.timestamp}
                    </span>
                </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                <div className="bg-white rounded-lg p-3 rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-[#f0f0f0] p-2 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
                <Smile className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
                <Paperclip className="w-6 h-6" />
            </Button>
            <Input 
                className="flex-1 bg-white border-none rounded-full px-4 focus-visible:ring-0" 
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
                className={`rounded-full w-10 h-10 flex items-center justify-center p-0 transition-colors duration-300 ${styles.verifyButton}`}
                style={styles.headerStyle}
                onClick={handleSendMessage}
            >
                <Send className="w-5 h-5 text-white ml-0.5" />
            </Button>
            </div>

            {/* Webview Overlay */}
            {showWebview && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
                <div className={`p-2 flex items-center justify-between border-b transition-colors duration-300 ${styles.header}`} style={styles.headerStyle}>
                <span className="text-sm font-medium ml-2">Secure Verification</span>
                <button 
                    onClick={() => setShowWebview(false)}
                    className="hover:opacity-80 font-bold px-2 text-white"
                >
                    Close
                </button>
                </div>
                <div className="flex-1">
                <iframe 
                    src="/kyc/step/1?embedded=true" 
                    className="w-full h-full border-none"
                    title="KYC Wizard"
                />
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
