import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: "pizzaApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:9009/api/pizza/"}),
    tagTypes: ["Pizza"],
    endpoints: builder => ({
        getPizza: builder.query({
            query: () => "history",
            providesTags: ["Pizza"]
        }),
        placeOrder: builder.mutation({
            query: ({fullName, size, toppings}) => ({
                url: "order",
                method: "POST",
                body: {fullName, size, toppings}
            }),
            invalidatesTags: ["Pizza"]
        })
    })
})

export const {useGetPizzaQuery, usePlaceOrderMutation} = pizzaApi
