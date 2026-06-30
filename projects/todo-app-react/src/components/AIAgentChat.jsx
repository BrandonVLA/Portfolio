import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
} from "../store/slices/todoSlice";
import { askAgent, getInitialGreeting } from "../services/gemini";
import "./AIAgentChat.css";

function AIAgentChat() {
  const [messages, setMessages] = useState([]);
  const [aiInputToSend, setAiInputToSend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const suggestionsRef = useRef(null);

  const dispatch = useDispatch();
  //get the taskList
  const taskList = useSelector((state) => state.todos.tasks);

  const actions = {
    createTask: (text) => dispatch(addTask(text)),
    completeTask: (id) => dispatch(toggleTask(id)),
    deleteTask: (id) => dispatch(deleteTask(id)),
    editTask: (id, text) => dispatch(editTask({ id, text })),
  };

  //Greeting Effect
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const fetchGreeting = async () => {
        const greeting = await getInitialGreeting(taskList);
        setMessages([
          {
            id: Date.now(),
            sender: "agent",
            text: greeting,
          },
        ]);
        setHasGreeted(true);
        setIsLoading(false);
      };
      fetchGreeting();
    }
  }, [isOpen, hasGreeted, taskList]);

  //Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (textToSend) => {
    // Si la función se llama desde el input, no pasará parámetro, así que usamos aiInputToSend como fallback.
    const messageText = textToSend || aiInputToSend;

    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setAiInputToSend("");
    setIsLoading(true);

    try {
      const aiResponse = await askAgent(
        messageText,
        updatedMessages,
        taskList,
        actions,
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: aiResponse,
        },
      ]);
    } catch (error) {
      console.log("Error al conectar con el Agente: ", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "agent",
          text: "Lo siento, no pude conectar con el agente en este momento.Intente de nuevo mas tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "¿Qué tareas tengo pendientes?",
    "Crea una tarea: 'Aprender Redux Toolkit'",
    "¡Motívame a completar mis pendientes!",
    "¿Cómo va mi progreso hoy?",
    "Crea una tarea: 'Hacer ejercicio 30 min'",
    "Dime un consejo de productividad",
  ];

  const handleQuickSuggestionClick = (suggestionText) => {
    sendMessage(suggestionText);
  };

  const scrollSuggestions = (direction) => {
    if (suggestionsRef.current) {
      const scrollAmount = 180;
      suggestionsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="ai-agent-container">
      {/* 1. VENTANA DE CHAT (se muestra si isOpen es true) */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Cabecera */}
          <div className="ai-chat-header">
            <h3>
              <span></span> ToDo Bot
            </h3>
            <button className="ai-chat-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {/* Animación de carga si la IA está pensando */}
            {isLoading && (
              <div className="ai-message agent">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* Referencia invisible para el auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Carrusel de sugerencias */}
          <div className="ai-suggestions-carousel-wrapper">
            <button
              type="button"
              className="carousel-btn prev"
              onClick={() => scrollSuggestions("left")}
              aria-label="Sugerencias anteriores"
            >
              ‹
            </button>
            <div className="ai-chat-suggestions" ref={suggestionsRef}>
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  className="ai-suggestion-chip"
                  onClick={() => handleQuickSuggestionClick(sug)}
                >
                  {sug}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="carousel-btn next"
              onClick={() => scrollSuggestions("right")}
              aria-label="Siguientes sugerencias"
            >
              ›
            </button>
          </div>

          {/* Formulario de Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(aiInputToSend);
            }}
            className="ai-chat-input-area"
          >
            <input
              type="text"
              placeholder="Pregúntale a nuestro Bot"
              value={aiInputToSend}
              onChange={(e) => setAiInputToSend(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="ai-chat-send"
              disabled={isLoading || !aiInputToSend.trim()}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {/* 2. BURBUJA FLOTANTE (se muestra si el chat está cerrado) */}
      {!isOpen && (
        <button className="ai-agent-bubble" onClick={() => setIsOpen(true)}>
          🤖
        </button>
      )}
    </div>
  );
}

export default AIAgentChat;
