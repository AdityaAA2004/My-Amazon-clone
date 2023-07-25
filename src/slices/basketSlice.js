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
      const itemsToRemove = state.items.filter(basketItem => basketItem.id === action.payload.id);
      //Note if we use 'filter' method, all the items with add id will be removed.
      
      // if(index >= 0){
      //   newBasket.splice(index,1); //this essentially removes the item with the index found above.
        
      // }
      // else{
      //   alert("Cant find the item to remove.");
      // }
      let newBasket = [...state.items];
      itemsToRemove.forEach((itemRemove,indRemove)=>{
        newBasket.forEach((item,ind)=>{
          if(item.id === itemRemove.id){
            newBasket.splice(ind,1);
          }
        })
      })
      console.log(itemsToRemove);
      state.items = newBasket;
    },

    reduceQuantity: (state,action) => {
      const indexRemove = state.items.findIndex(basketItem => basketItem.id === action.payload.id);
      let newBasket = [...state.items];
      
      newBasket.splice(indexRemove,1);  
      state.items = newBasket;   
    
    }

  },
});

export const { addToBasket, removeFromBasket, reduceQuantity } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
