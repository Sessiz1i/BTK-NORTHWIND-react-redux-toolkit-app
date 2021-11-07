import {createSlice} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const categoryApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Category'],
    reducerPath: 'categoryApi',
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => `categories`,
            providesTags: ['Category']
        }),
        getCategory:build.query({
            query:(id)=> `categories/${id}`,
            providesTags:['Category']
        }),
    })
})

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        currentCategory: 0,
        loading: false,
        error: false
    },
    reducers: {
        changeCategory: (state, action) => {
            state.currentCategory = action.payload
        },
    },
})

export const {useGetCategoriesQuery, useGetCategoryQuery} = categoryApi
export const {changeCategory} = categorySlice.actions
export default categorySlice.reducer


