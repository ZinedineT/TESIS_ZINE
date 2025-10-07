import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '../atoms/Button';

export function ChatbotFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Cistcor. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null); // ← Agrega esta referencia

  // ✅ AUTO-SCROLL AL FINAL (agrega este useEffect)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { role: 'user', content: message };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);
  const CHATBOT_URL = import.meta.env.VITE_CHATBOT_URL
    try {
      const res = await fetch(CHATBOT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userId: 'frontend-user-1', 
          model: 'google/gemma-3-12b-it' 
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠ Error al conectar con el servidor.' }]);
    }

    setLoading(false);
  };

// ✅ Función de formato MEJORADA Y SEGURA
const formatMessage = (text?: string) => {
  if (!text || typeof text !== "string") {
    return (
      <p className="text-red-500 italic">
        ⚠️ No se recibió respuesta del servidor. Por favor intenta nuevamente.
      </p>
    );
  }

  return text.split('\n').map((line, i) => {
    if (line.trim() === '') return <br key={i} />;

    // Detectar viñetas y números
    if (line.startsWith('•') || line.startsWith('-') || /^\d+\./.test(line)) {
      return (
        <div key={i} className="flex items-start gap-2 ml-2">
          <span>{line}</span>
        </div>
      );
    }

    // Títulos o encabezados
    if (line.includes(':')) {
      return (
        <p key={i} className="font-semibold text-secondary-800 dark:text-white mt-2">
          {line}
        </p>
      );
    }

    // Párrafos normales
    return (
      <p key={i} className="mt-1">
        {line}
      </p>
    );
  });
};
  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{duration:0.2, ease:"easeOut"
            }}
            className="fixed bottom-24 right-6 w-90 h-96 bg-white dark:bg-secondary-800 rounded-lg shadow-2xl border border-secondary-200 dark:border-secondary-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center gap-3">
                {/* <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> */}
                <Bot className='h5 w-5'/>
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
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className={`rounded-2xl p-4 max-w-xs ${
                      msg.role === 'user'
                        ? 'bg-primary-600 text-white ml-auto'
                        : 'bg-gray-100 dark:bg-secondary-700 text-gray-900 dark:text-white'
                    }`}>
                      <div className="text-sm whitespace-pre-line">
                        {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-center text-xs text-secondary-400 py-2">
                    <div className="inline-flex items-center gap-1">
                      <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-1 h-1 bg-secondary-400 rounded-full animate-bounce delay-200"></div>
                      <span className="ml-2">Escribiendo...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef}/>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg
                    bg-white dark:bg-gray-400 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Button size="sm" onClick={handleSend} disabled={loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => setIsOpen(!isOpen)}
  className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-2xl z-50 flex items-center justify-center border-2 border-white"
>
  <motion.div
    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 0.9 : 1 }}
    transition={{ duration: 0.3 }}
  >
    {isOpen ? (
      <X className="h-7 w-7" />
    ) : (
      <div className="relative">
        <Bot className="h-7 w-7" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    )}
  </motion.div>
</motion.button>
    </>
  );
}
