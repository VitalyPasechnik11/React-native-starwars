import { configureStore } from "@reduxjs/toolkit";
import femaleReducer from "./features/femaleSlice";
import maleReducer from "./features/maleSlice";
import otherReducer from "./features/otherSlice";

const store = configureStore({
  reducer: {
    femaleBasket: femaleReducer,
    maleBasket: maleReducer,
    otherBasket: otherReducer,
  },
});

export default store;