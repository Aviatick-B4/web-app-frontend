import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promos: [],
};

const promoSlicer = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromo: (state, action) => {
      state.promos = action.payload;
    },
  },
});

export const {
  setPromo,
} = promoSlicer.actions;

export default promoSlicer.reducer;
