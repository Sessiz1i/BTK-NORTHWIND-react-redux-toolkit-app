import {createSlice} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/categories'}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (queryArg) => queryArg
        }),
    }),
})

const initialState= null;

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        change: (state, action) => state = action.payload
    }
})

export const {useGetCategoriesQuery} = categoryApi
export const { change } =categorySlice.actions

export default categorySlice.reducer
