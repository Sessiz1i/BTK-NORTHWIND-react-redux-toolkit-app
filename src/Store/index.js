import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query";

import {categoryApi} from "../Components/Categories/categorySlice";
import {productApi} from "../Components/Products/productSlice";
import categorySlice from "../Components/Categories/categorySlice";
import cartSlice from "../Components/Cart/cartSlice";



export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi?.reducer,
        [categoryApi.reducerPath]: categoryApi?.reducer,
        categories: categorySlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            categoryApi.middleware,
            productApi.middleware,
        ]),
})
setupListeners(store.dispatch)