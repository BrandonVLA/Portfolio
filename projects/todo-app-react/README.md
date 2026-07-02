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

## 🌟 Live Demo

Check out the production app here:  
👉 **[todo-app-ai-silk.vercel.app](https://todo-app-ai-silk.vercel.app/)**

---

## 📝 Project Overview

This is not just another standard task-tracker app. It is a **Smart ToDo App** featuring a built-in **conversational AI agent (ToDo Bot)** powered by the **Gemini 2.5 Flash** API.

The bot understands natural language input and performs real-time actions (creating, completing, editing, and deleting tasks) by directly interacting with the global application state managed by **Redux Toolkit**.

---

## 🚀 Key Features

- **AI Productivity Assistant (ToDo Bot):** Chat with the bot to plan your day, get quick productivity advice, or ask it to manage your tasks on your behalf.
- **Function Calling / Tool Use:** The AI automatically triggers local JavaScript functions to modify the task list in real-time based on the user's conversational intent.
- **Dynamic Progress Tracker:** Displays the percentage of completed tasks in real-time.
- **Quick Suggestions:** Interactive suggestion chip carousel to guide users with quick command examples.
- **Modern Responsive UI:** Designed with Tailwind CSS v4, custom typography (`Outfit` font), and smooth animations with adaptive Dark/Light mode.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, JavaScript (ES6+), React Router v7.
- **State Management:** Redux Toolkit (Slices, Selectors, Actions).
- **Styling:** Tailwind CSS v4, React Icons.
- **Artificial Intelligence:** Official `@google/generative-ai` SDK (Gemini 2.5 Flash).
- **Build Tool:** Vite.
- **Deployment:** Vercel (configured for SPA client-side routing via `vercel.json`).

---

## 🔒 Security & Architecture Note

> [!NOTE]
> For the purposes of this **frontend demo/portfolio**, the Gemini API Key is configured and loaded on the client side (`import.meta.env.VITE_GEMINI_API_KEY`) and is hidden from public git history via `.gitignore`.
>
> In a **real production environment**, these API calls would be proxied through a **secure Backend Server** (Node.js/Express or Serverless Functions) to keep the API Key completely hidden and protected from the user's browser.

---

## 💻 Local Installation & Setup

1. **Clone the repository** and navigate to the project directory:

   ```bash
   git clone <your-repository-url>
   cd projects/todo-app-react

   ```

2. ** Install dependencies:**
   pnpm install

3. ** Create a .env file in the root directory**
   Create a .env file in the root directory and add the following:
   VITE_GEMINI_API_KEY=your_secret_api_key_here

4. ** Run the application:**
   pnpm dev

**The app will open locally at** http://localhost:5173
