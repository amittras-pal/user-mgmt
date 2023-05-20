import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 10001,
    name: "Amittras",
    email: "amittras@mtrace.com",
    username: "a.pal",
    mobile: "2323232323",
    roleKey: 101,
    password: "pass.amit",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    add: (state, action) => {
      const maxId = state.length ? Math.max(...state.map((o) => o.id)) : 10001;
      state.push({ ...action.payload, id: maxId + 1 });
    },
    remove: (state, action) => {
      const index = state.findIndex((u) => u.id === action.payload);
      state.splice(index, 1);
    },
    update: (state, action) => {
      const index = state.findIndex((u) => u.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, update } = userSlice.actions;

export default userSlice.reducer;
