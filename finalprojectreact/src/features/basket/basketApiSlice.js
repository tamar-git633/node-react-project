import  apiSlice from "../../app/apiSlice"

const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
         addProdToBasket: build.mutation({
            query: ({ barcode, token }) => ({
                url: "api/product/addtobasket",
                method: "PUT",
                body: { barcode },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 } 
                }),
            invalidatesTags: ["basket"]
        }),
        deleteProdFromBasket: build.mutation({
            query: ({ barcode, token }) => ({
                url: "api/product/deletefrombasket",
                method: "DELETE",
                body: {barcode},
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 } 
            })
        }),
        plusProd: build.mutation({
            query: ({ barcode, token }) => ({
                url: "api/product/plusproduct",
                method: "PUT",
                body: {barcode},
                   headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 } 
            })
        }),
        minusProd: build.mutation({
            query: ({ barcode, token }) => ({
                url: "api/product/minusproduct",
                method: "PUT",
                  body: {barcode},
                   headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                } 
            })
        }),
         viewBasket: build.query({
            query: (token) => ({
                url: "api/product/viewbasket",
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            })
        }),
             deleteBasket: build.mutation({
            query: (token) => ({
                url: "api/product/deletebasket",
                method: "PUT",
                headers: {Authorization: `Bearer ${token}`}
            })
        })
    })
})
export const { useAddProdToBasketMutation, useDeleteProdFromBasketMutation, usePlusProdMutation, useMinusProdMutation, useViewBasketQuery ,useDeleteBasketMutation} = basketApiSlice