
import apiSlice from "../../app/apiSlice";

const actorApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        rishum: build.mutation({
            query: (registerUser) => ({
                url: "api/actor/rishum",
                method: "POST",
                body: registerUser
            })
        }),
                numbers: build.query({
            query: () => ({
                url: "api/actor/rand",
                method: "Get",
            })
        }),
                   email: build.mutation({
            query: (winner) => ({
                url: "api/actor/email",
                method: "POST",
                body: winner
            })
        }),
    })
})
export const { useRishumMutation, useNumbersQuery, useEmailMutation} = actorApiSlice