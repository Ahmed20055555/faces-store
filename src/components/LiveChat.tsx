"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, MoreHorizontal, Check, CheckCheck } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "مرحباً بك في وجوه! كيف يمكنني مساعدتك اليوم؟",
    sender: "support",
    timestamp: "10:00 ص",
  },
];

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");

    // Simulate support typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const supportMsg: Message = {
        id: Date.now() + 1,
        text: "شكراً لتواصلك معنا. سيقوم أحد مستشاري الجمال بالرد عليك خلال دقائق.",
        sender: "support",
        timestamp: new Date().toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, supportMsg]);
    }, 2500);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 left-6 md:left-auto md:right-6 z-[2000]" dir="rtl">
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#8c1d3b] text-white rounded-full shadow-2xl flex items-center justify-center relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={26} />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed md:absolute bottom-4 md:bottom-20 left-4 right-4 md:left-auto md:right-0 md:w-[400px] h-[550px] max-h-[85vh] md:max-h-[600px] bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800 overflow-hidden flex flex-col z-[3000]"
          >
            {/* Header */}
            <div className="p-4 bg-[#8c1d3b] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm">
                    <User size={20} />
                  </div>
                  <span className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#8c1d3b] rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-sm font-black leading-none mb-1">ليلى - مستشارة الجمال</h3>
                  <p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">متصلة الآن</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-zinc-950/50 scroll-smooth no-scrollbar"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] shadow-sm relative group ${
                      msg.sender === "user" 
                        ? "bg-[#8c1d3b] text-white rounded-br-none" 
                        : "bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-zinc-700 rounded-bl-none"
                    }`}
                  >
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 justify-end opacity-60 text-[9px] ${msg.sender === "user" ? "text-white/80" : "text-gray-400"}`}>
                      {msg.timestamp}
                      {msg.sender === "user" && <CheckCheck size={10} />}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 dark:border-zinc-700 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-600 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl px-4 py-3 text-[13px] outline-none focus:ring-1 focus:ring-[#8c1d3b] transition-all dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={!inputText.trim()}
                className="w-11 h-11 bg-[#8c1d3b] disabled:opacity-50 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#8c1d3b]/20"
              >
                <Send size={18} className="transform rotate-180" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
