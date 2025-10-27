import apiSlice from "../../app/apiSlice"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addProduct: build.mutation({
            query: (product) => ({
                url: "api/product/addproduct",
                method: "POST",
                body: product,
            })
        }),
        deleteProduct: build.mutation({
            query: (product) => ({
                url: "api/product/deleteproduct",
                method: "Delete",
                body: product
            })
        }),
         updateProduct: build.mutation({
            query: (product) => ({
                url: `api/product/updateproduct/${product.barcode}`,
                method: "PUT",
                body: product
            })
        }),
            seeAll: build.query({
            query: (product) => ({
                url: "api/product/seeall/:category",
                url: "api/product/seeall",
                method: "GET",
                refetchOnMountOrArgChange: true
            }),
            
        })
    })
})
export const { useAddProductMutation, useDeleteProductMutation , useUpdateProductMutation ,useSeeAllQuery} = productApiSlice
