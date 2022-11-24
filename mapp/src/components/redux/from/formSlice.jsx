import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todo: "",
  allTodo: "",
};

// create a todoSlice
const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // add reducer
    addTodo: (state, action) => {
      const newTask = {
        name: action.payload.task,
      };
      state.allTodo = newTask
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
