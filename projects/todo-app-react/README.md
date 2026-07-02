# 🤖 Smart ToDo App with AI Assistant

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Google_Gemini-API-8E75C2?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

## 🌟 Demo en Vivo

Puedes probar la aplicación en producción aquí:  
👉 **[todo-app-ai-silk.vercel.app](https://todo-app-ai-silk.vercel.app/)**

---

## 📝 Descripción del Proyecto

Esta no es una aplicación de tareas convencional. Es una **Smart ToDo App** que integra un **agente conversacional inteligente (ToDo Bot)** impulsado por la API de **Gemini 2.5 Flash**.

El bot es capaz de comprender el lenguaje natural del usuario y realizar acciones en tiempo real (crear, completar, editar y borrar tareas) manipulando directamente el estado global de la aplicación gestionado con **Redux Toolkit**.

---

## 🚀 Características Clave

- **Asistente Virtual con IA (ToDo Bot):** Charla con el bot para organizar tu día, pídele consejos de productividad o pídele que gestione tus tareas por ti.
- **Function Calling / Tool Use:** La IA invoca herramientas locales de código automáticamente para modificar la lista de pendientes del usuario según la intención del mensaje.
- **Barra de Progreso Dinámica:** Visualiza en tiempo real el porcentaje de tareas completadas.
- **Sugerencias Rápidas:** Carrusel interactivo de preguntas y comandos de ejemplo para guiar al usuario.
- **Diseño Moderno e Interactivo:** Estilizado con Tailwind CSS v4, fuentes elegantes y transiciones suaves (Dark/Light mode adaptativo).

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, JavaScript (ES6+), React Router v7.
- **Gestión de Estado:** Redux Toolkit (Slices, Selectors, Actions).
- **Estilos:** Tailwind CSS v4, React Icons.
- **Inteligencia Artificial:** SDK oficial de `@google/generative-ai` (Gemini 2.5 Flash).
- **Herramienta de Construcción:** Vite.
- **Despliegue:** Vercel (con redirección SPA configurada en `vercel.json`).

---

## 🔒 Nota de Seguridad y Arquitectura

> [!NOTE]
> Para propósitos de este **demo frontend/portafolio**, la API Key de Gemini se configura y consume desde las variables de entorno del cliente (`import.meta.env.VITE_GEMINI_API_KEY`) y se protege a nivel de código mediante el archivo `.gitignore`.
>
> En un entorno de **producción real**, estas llamadas se realizarían a través de un **servidor Backend Proxy** (Node.js/Express o Serverless Functions) para mantener la API Key completamente oculta y protegida de la vista del usuario en el navegador.

---

## 💻 Instalación y Configuración Local

1. **Clona el repositorio** e ingresa a la carpeta del proyecto:
   ```bash
   git clone <url-de-tu-repositorio>
   cd projects/todo-app-react
   ```
