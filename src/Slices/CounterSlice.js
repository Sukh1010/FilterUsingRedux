import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addCount: (state) => {
      state.count = state.count + 1;
    },
    subCount: (state) => {
      state.count = state.count - 1;
    },
    addByValue: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { addCount, subCount, addByValue } = counterSlice.actions;
export default counterSlice.reducer;

// mutating state - state=10
// Immutable state - setCount(10)
