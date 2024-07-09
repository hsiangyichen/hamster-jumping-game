import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  highestScore: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setHighestScore: (state, action) => {
      state.highestScore = action.payload;
    },
  },
});

export const { setHighestScore } = scoreSlice.actions;

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
  },
});

export default store;
