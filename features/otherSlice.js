import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  other: [],
};

export const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    addToOther: (state, action) => {
      state.other = [...state.other, action.payload];
    },
    removeFromOther: (state, action) => {
      const index = state.other.findIndex(
        (item) => item.name === action.payload.name
      );

      let newBasket = [...state.other];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant Remove product (id: ${action.payload.name}) as its not basket`
        );
      }

      state.other = newBasket;
    },
    deleteAllOther: (state, action) => {
      state.other = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToOther, removeFromOther, deleteAllOther } = otherSlice.actions;

export const selectOtherItems = (state) => state.otherBasket.other;

export const selectOtherItemWithId = (state, name) => state.otherBasket.other.filter((item) => item.name === name);

export const selectOtherTotal = (state) => state.otherBasket.other.reduce((total, item) => (total += item.cost), 0);



export default otherSlice.reducer;
