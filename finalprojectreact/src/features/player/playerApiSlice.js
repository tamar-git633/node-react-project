import apiSlice from "../../app/apiSlice";

const playerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        signUpFunc: build.mutation({
            query: (registerUser) => ({
                url: "/api/player/signup",
                method: "POST",
                body: registerUser
            })
        }),
           game: build.query({
            query: () => ({
                url: "/api/player/game",
                method: "GET",
            })
        }),
            log: build.mutation({
            query: (content) => ({
                url: "/api/player/log",
                method: "POST",
                body: content
            })
        }),
        //   findByName: build.query({
        //     query: (names) => ({
        //         url: "/api/player/find",
        //         method: "GET",
        //     })
        // })
        
    })
})
export const { useSignUpFuncMutation , useGameQuery, useLogMutation} = playerApiSlice