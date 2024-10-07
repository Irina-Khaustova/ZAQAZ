import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
        query(body) {
            // const { id, ...body } = data;
            console.log(body)
            return {
              url: `v1/auth/staff`,
              method: "POST",
              body,
            };
        }
    }),
  }),
});

export const {
  
  useLogInMutation,
} = Api;
