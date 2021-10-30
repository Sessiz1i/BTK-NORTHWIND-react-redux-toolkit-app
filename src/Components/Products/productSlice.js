import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products'
        }),
        /* TODO BU İSTEĞİ createAsyncThunk() İLE YENİDEN YAPTIM */
           getSelectedCategoryProducts:builder.query({
           query:(id) => `products?categoryId=${id}`
           })

    }),
})
const productThunk = createAsyncThunk(
    'product/getSelectedCategoryProducts',
    async (thunkAPI) => {
        const response = await axios.get('http://localhost:3000/products')
        return response.data
    })

const productSlice = createSlice({
    name: 'product',
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(productThunk.pending, state => {
            state.loading = true
            state.error = null
        })
    }
})

export const {useGetProductsQuery, useGetSelectedCategoryProductsQuery} = productApi
export default productSlice.reducer