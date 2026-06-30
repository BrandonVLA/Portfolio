import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "./store/slices/todoSlice";

import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import TaskDetail from "./pages/TaskDetail";
import AIAgentChat from "./components/AIAgentChat";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const taskList = useSelector((state) => state.todos.tasks);

  //isAuthenticated?
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  //Get previous tasks on the session
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      try {
        const parsedTasks = JSON.parse(saved);
        if (parsedTasks.length > 0) {
          dispatch(setTasks(parsedTasks));
        }
      } catch (error) {
        console.log(
          `Error while parsing tasks from localStorage.Error: `,
          error,
        );
      }
    }
  }, [dispatch]);

  //Save tasks created on the session
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <Navbar />
      <Routes>
        {/*Private Routes*/}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task/:id"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />
        {/*Public Routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* AI Agent will show only if user is authenticated */}
      {isAuthenticated && <AIAgentChat taskList={taskList} />}
    </>
  );
}

export default App;
