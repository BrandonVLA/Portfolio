import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //Load  initial tasks
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    //create newTask
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
    },
    //Toggle task
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    //Delete task
    deleteTask: (state, action) => {
      const id = Number(action.payload);
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    //Edit Task
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find((t) => t.id === Number(id));
      if (task) {
        task.text = text;
      }
    },
    //Change Filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
