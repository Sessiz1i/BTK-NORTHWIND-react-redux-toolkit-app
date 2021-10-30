import {configureStore} from '@reduxjs/toolkit'
import categorySlice, {categoryApi,} from "../Components/Categories/categorySlice";
import {productApi} from "../Components/Products/productSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import cartSlice from "../Components/Cart/cartSlice";


export const store = configureStore({
    reducer: {
        [productApi?.reducerPath]: productApi?.reducer,
        [categoryApi?.reducerPath]: categoryApi?.reducer,
        currentCategory: categorySlice,
        cart:cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            categoryApi?.middleware,
            productApi?.middleware
        ]),
})
setupListeners(store.dispatch)