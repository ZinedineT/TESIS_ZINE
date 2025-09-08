import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '../atoms/Button';

export function ChatbotFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 w-90 h-96 bg-white dark:bg-secondary-800 rounded-lg shadow-2xl border border-secondary-200 dark:border-secondary-700 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-secondary-900 dark:text-white">
                  Asistente Cistcor
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded"
              >
                <X className="h-4 w-4 text-secondary-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-secondary-100 dark:bg-secondary-700 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-secondary-900 dark:text-white">
                      ¡Hola! Soy el asistente virtual de Cistcor. ¿En qué puedo ayudarte hoy?
                    </p>
                  </div>
                </div>

                <div className="text-center text-xs text-secondary-400 py-2">
                  <div className="inline-flex items-center gap-1">
                    <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce delay-200"></div>
                    <span className="ml-2">Próximamente disponible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg
                    bg-white dark:bg-secondary-700 text-sm
                    focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled
                />
                <Button size="sm" disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>

        {/* Notification dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        >
          <span className="text-xs text-white font-bold">1</span>
        </motion.div>
      </motion.button>
    </>
  );
}
