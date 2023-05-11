import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  male: [],
};

export const maleSlice = createSlice({
  name: "Male",
  initialState,
  reducers: {
    addToMale: (state, action) => {
      state.male = [...state.male, action.payload];
    },
    deletAllMale: (state, action) => {
      state.male = [];
    },
    removeFromMale: (state, action) => {
      const index = state.male.findIndex(
        (item) => item.name === action.payload.name
      );

      let newBasket = [...state.male];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant Remove product (name: ${action.payload.name}) as its not basket`
        );
      }
      
      state.male = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToMale, removeFromMale, deletAllMale } = maleSlice.actions;

export const selectMaleItems = (state) => state.maleBasket.male;

export const selectMaleItemWithId = (state, name) =>
  state.maleBasket.male.filter((item) => item.name == name);

export const selectFemaleTotal = (state) =>
  state.maleBasket.male.reduce((total, item) => (total += item.cost), 0);

export default maleSlice.reducer;
