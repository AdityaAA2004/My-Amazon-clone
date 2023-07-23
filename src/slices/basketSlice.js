import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //the actions
    addToBasket: (state, action) => {
      state.items = [...state.items,action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id);
      //Note if we use 'filter' method, all the items with add id will be removed.
      let newBasket = [...state.items];
      if(index >= 0){
        newBasket.splice(index,1); //this essentially removes the item with the index found above.
        
      }
      else{
        alert("Cant find the item to remove.");
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
