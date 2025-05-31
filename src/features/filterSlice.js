import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showCategory: false,
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setShowCategory: (state, action) => {
      state.showCategory = action.payload;
    },
 

  },
});

export const { setShowCategory} = filterSlice.actions;
export default filterSlice.reducer;
