import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Api = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API}/api`,
    // добавляем заголовок с токеном к каждому запросу
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", `application/json`);
      }

      return headers; // Возвращаем модифицированные заголовки
    },
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `/v1/auth/staff`,
          method: "POST",
          body,
        };
      },
    }),
    putCategory: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store/category`,
          method: "PUT",
          body,
        };
      },
    }),
    postCategory: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store/category`,
          method: "POST",
          body,
        };
      },
    }),
    putProduct: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store/category/item`,
          method: "PUT",
          body,
        };
      },
    }),
    postProduct: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store/category/item`,
          method: "POST",
          body,
        };
      },
    }),
    putStatusProduct: builder.mutation({
      query(data) {
        const {statusProduct, id} = data;
        console.log(data);
        return {
          url: `v1/order/${id}/status`,
          method: "PATCH",
          body: `{${statusProduct}}`
        };
      },
    }),
    
    getOrders: builder.query({
      query: () => `v1/order/list`,
    }),
    getOrder: builder.query({
      query: (id) => `v1/order/${id}`,
    }),
    getOrderswithFiler: builder.query({
      query: (request) => `v1/order/${request}`,
    }),
    getCategory: builder.query({
      query: (url) => `v1/store/category?${url}`,
    }),
    getSubCategoryById: builder.query({
      query: (id) => `v1/store/category/${id}/allSubcategory?page=1&size=1`,
    }),
    getProductsswithFiler: builder.query({
      query: ({request}) => `v1/store/category/item/${request}`,
      keepUnusedDataFor: 0,
    }),
    getProduct: builder.query({
      query: (id) => `v1/store/category/item/${id}`,
    }),
    deletePost: builder.mutation({
      query(id) {
        return {
          url: `v1/orderItem/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLogInMutation,
  usePutCategoryMutation,
  usePostCategoryMutation,
  useGetOrderQuery,
  useGetOrderswithFilerQuery,
  useGetCategoryQuery,
  useGetSubCategoryByIdQuery,
  useGetProductsswithFilerQuery,
  useGetProductQuery,
  usePutProductMutation,
  usePutStatusProductMutation,
  useDeletePostMutation,
  usePostProductMutation
} = Api;
