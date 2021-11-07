import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Product'],
    reducerPath: 'productApi',
    endpoints: (build) => ({

        getProduct: build.query({
            query: (id) => ({url: `products/${id}`}),
            providesTags: ['Product']
        }),
        getProducts: build.query({
            query: () => ({url: 'products'}),
            providesTags: ['Product']
        }),
        getCategoryProducts: build.query({
            query: (categoryId) => ({url: `products?categoryId=${categoryId}`}),
            providesTags: ['Product']
        }),
        addProduct: build.mutation({
            query: (product) => ({
                url:`products`,
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url:`products/${product.id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        removeProduct:build.mutation({
            query:(id) =>({
                url:`products/${id}`,
                method:"delete"
            }),
            invalidatesTags:["Product"]
        })
    }),
})

export const {
    useGetProductQuery,
    useGetProductsQuery,
    useGetCategoryProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useRemoveProductMutation
} = productApi
