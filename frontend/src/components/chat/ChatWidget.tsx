import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import type { ChatMessage } from '../../types';

interface ChatWidgetProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatMessages: ChatMessage[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent) => void;
  isAdmin: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isChatOpen, setIsChatOpen, chatMessages, messageInput, setMessageInput, sendMessage, isAdmin
}) => {
  return (
    <div className="fixed bottom-8 right-8 z-[90]">
      <AnimatePresence>
        {isChatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] h-[550px] bg-[#0c0508]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-brand-primary to-rose-500 p-5 flex justify-between items-center shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-wide text-white leading-tight">VibeVary</h3>
                  <p className="text-[10px] text-white/80 uppercase tracking-widest font-medium">Concierge</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 custom-scrollbar bg-gradient-to-b from-transparent to-black/20">
              {chatMessages.map((msg, i) => {
                const isSentByMe = msg.sender === (isAdmin ? 'Admin' : 'Guest');
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`max-w-[85%] ${isSentByMe ? 'self-end bg-brand-primary/90 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl' : 'self-start bg-white/[0.08] text-white/90 rounded-tr-2xl rounded-tl-sm rounded-br-2xl rounded-bl-2xl'} p-4 shadow-lg border border-white/[0.05]`}
                  >
                    <p className="text-sm font-light leading-relaxed">{msg.text}</p>
                    <p className="text-[9px] mt-2 opacity-60 uppercase tracking-widest flex justify-between">
                      <span>{msg.sender}</span>
                      <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/[0.06] bg-[#0c0508] shrink-0">
              <form onSubmit={sendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] text-white rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:border-brand-primary transition-colors focus:bg-white/[0.06]"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="absolute right-2 p-2 bg-brand-primary rounded-full hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <Send className="w-4 h-4 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-brand-primary rounded-2xl shadow-2xl shadow-brand-primary/40 flex items-center justify-center text-white"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
