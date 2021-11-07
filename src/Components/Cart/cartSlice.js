import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        loading: 0,
        error: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const addItemIndex = state.findIndex(item => item.product.id === action.payload.id)
            if (addItemIndex >= 0) state[addItemIndex].quantity += 1
            else state.push({id: Date.now(), product: action.payload, quantity: 1})
        },
        removeFromCart: (state, action) => {
            if (action.payload.quantity > 1) {
                state.map(item => item.product.id === action.payload.product.id ? item.quantity -= 1 : item)
            } else {
                const removedItemIndex = state.findIndex(item => item.product.id === action.payload.product.id)
                if (removedItemIndex >= 0) state.splice(removedItemIndex, 1)
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer