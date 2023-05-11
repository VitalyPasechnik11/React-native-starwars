import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  female: [],
};

export const femaleSlice = createSlice({
  name: "Female",
  initialState,
  reducers: {
    addToFemale: (state, action) => {
      state.female = [...state.female, action.payload];
    },
    deleteAllFemale: (state, action) => {
      state.female = [];
    },
    removeFromFemale: (state, action) => {
      const index = state.female.findIndex(item => item.name === action.payload.name);

      let newBasket = [...state.female];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant Remove product (name: ${action.payload.name}) as its not basket`
        );
      }

      state.female = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFemale, removeFromFemale, deleteAllFemale } = femaleSlice.actions;

export const selectFemaleItems = (state) => state.femaleBasket.female;

export const selectFemaleItemWithId = (state, name) =>
  state.femaleBasket.female.filter((item) => item.name == name);

export const selectFemaleTotal = (state) =>
  state.femaleBasket.female.reduce((total, item) => (total += item.cost), 0);
  

export default femaleSlice.reducer;
