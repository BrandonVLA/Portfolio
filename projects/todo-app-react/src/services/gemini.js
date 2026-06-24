import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * NOTA DE ARQUITECTURA / SEGURIDAD:
 * Para este demo/portfolio de frontend, cargamos la API Key directamente en el cliente.
 * En una aplicación de producción real, este servicio llamaría a un servidor backend proxy
 * (Node.js/Express, Serverless Functions, etc.) para mantener la API Key oculta y protegida.
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const todoTools = {
  functionDeclarations: [
    {
      name: "crear_tarea",
      description:
        "Crea una nueva tarea en la lista de pendientes del usuario.",
      parameters: {
        type: "OBJECT",
        properties: {
          texto: {
            type: "STRING",
            description: "El contenido o descripción de la tarea.",
          },
        },
        required: ["texto"],
      },
    },
    {
      name: "completar_tarea",
      description:
        "Cambia el estado de completado de una tarea usando su ID numérico.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: {
            type: "NUMBER",
            description: "El ID numérico único de la tarea a alternar.",
          },
        },
        required: ["id"],
      },
    },
    {
      name: "eliminar_tarea",
      description:
        "Elimina permanentemente una tarea de la lista usando su ID numérico.",
      parameters: {
        type: "OBJECT",
        properties: {
          id: {
            type: "NUMBER",
            description: "El ID numérico único de la tarea a borrar.",
          },
        },
        required: ["id"],
      },
    },
  ],
};

export const askAgent = async (message, chatHistory, currentTasks, actions) => {
  if (!genAI) {
    throw new Error(
      "API Key no detectada. Por favor, asegúrate de configurar VITE_GEMINI_API_KEY en tu archivo .env local.",
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Eres un asistente de productividad inteligente integrado en una aplicación de tareas.
Tu objetivo es ayudar al usuario a gestionar sus pendientes.
Reglas:
- Sé amable, conciso y habla en español.
- Invoca las herramientas automáticamente cuando el usuario te lo solicite.
- Usa los IDs reales de las tareas provistas. No inventes números.
- Lista actual de tareas (formato JSON): ${JSON.stringify(currentTasks)}.`,
      tools: [todoTools],
    });

    const formattedHistory = chatHistory.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    // Envío del mensaje inicial al modelo
    let result = await chat.sendMessage(message);
    let responseText = "";

    const functionCalls = result.response.functionCalls;

    // Si la IA decide ejecutar una herramienta
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      const { name, args } = call;
      let toolResult = null;

      try {
        if (name === "crear_tarea") {
          if (!args.texto || typeof args.texto !== "string") {
            throw new Error("El texto de la tarea no es válido.");
          }
          actions.crearTarea(args.texto);
          toolResult = {
            status: "success",
            message: `Tarea '${args.texto}' agregada.`,
          };
        } else if (name === "completar_tarea") {
          const taskId = Number(args.id);
          if (isNaN(taskId)) {
            throw new Error(
              "El ID de la tarea proporcionado por el agente no es un número válido.",
            );
          }
          actions.completarTarea(taskId);
          toolResult = {
            status: "success",
            message: `Tarea ID ${taskId} actualizada.`,
          };
        } else if (name === "eliminar_tarea") {
          const taskId = Number(args.id);
          if (isNaN(taskId)) {
            throw new Error(
              "El ID de la tarea proporcionado por el agente no es un número válido.",
            );
          }
          actions.eliminarTarea(taskId);
          toolResult = {
            status: "success",
            message: `Tarea ID ${taskId} eliminada.`,
          };
        }

        // Informar a Gemini de la ejecución exitosa
        const followUp = await chat.sendMessage([
          {
            functionResponse: {
              name: name,
              response: toolResult,
            },
          },
        ]);
        responseText = followUp.response.text();
      } catch (toolError) {
        console.error("Error durante la ejecución del tool:", toolError);
        // Retornamos un mensaje controlado si falla la acción interna
        responseText = `Intenté realizar la acción, pero ocurrió un problema local: ${toolError.message}`;
      }
    } else {
      responseText = result.response.text();
    }

    return responseText;
  } catch (apiError) {
    console.error("Error al comunicarse con la API de Gemini:", apiError);
    // Este catch atrapa caídas de red, clave de API inválida, o cuota excedida
    throw new Error(
      "No se pudo obtener respuesta del agente de IA. Verifica tu conexión de red o que la clave VITE_GEMINI_API_KEY en tu archivo .env sea correcta.",
    );
  }
};

export const getInitialGreeting = async (currentTasks) => {
  if (!genAI) {
    return "¡Hola! Para comenzar, asegúrate de configurar tu clave API de Gemini en el archivo .env.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const pendingTasks = currentTasks.filter((t) => !t.completed);

    const prompt = `Analiza esta lista de tareas pendientes en formato JSON: ${JSON.stringify(pendingTasks)}.
1. Si hay tareas, saluda de forma amigable en español y menciona cuál es la más prioritaria según su texto. Invítalo a completarla.
2. Si no hay pendientes, dale un saludo alegre y motívalo a crear una tarea.
Mantén la respuesta en un máximo de 2 líneas.`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (err) {
    console.error("Error en saludo inicial de IA:", err);
    // Fallback amigable si la API falla al inicio
    return "¡Hola! ¿En qué puedo ayudarte hoy con tu lista de pendientes?";
  }
};
