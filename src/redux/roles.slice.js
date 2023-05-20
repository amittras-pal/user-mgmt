import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { roleLabel: "Role 1", roleKey: 101 },
  { roleLabel: "Role 2", roleKey: 102 },
  { roleLabel: "Role 3", roleKey: 103 },
];

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    add: (state, action) => {
      const maxId = state.length
        ? Math.max(...state.map((o) => o.roleKey))
        : 101;
      state.push({ ...action.payload, roleKey: maxId + 1 });
    },
    remove: (state, action) => {
      const index = state.findIndex((u) => u.roleKey === action.payload);
      state.splice(index, 1);
    },
    update: (state, action) => {
      const index = state.findIndex(
        (u) => u.roleKey === action.payload.roleKey
      );
      state[index] = action.payload;
    },
  },
});

export const { add, remove, update } = roleSlice.actions;

export default roleSlice.reducer;
