import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const Api = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    // добавляем заголовок с токеном к каждому запросу
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("key")
      // const token = getState().auth.authToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // headers.set("Content-Type", `application/json`);
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
    postCategoryImage: builder.mutation({
      query(data) {
        const {image, id} = data;
        return {
          url: `v1/store/category/${id}/image`,
          method: "POST",
          body: image
        };
      },
    }),
    postProductImage: builder.mutation({
      query(data) {
        const {id, image} = data;
        return {
          url: `v1/store/category/item/${id}/image`,
          method: "POST",
          body: image
        };
      },
    }),
    postStoreHouse: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store`,
          method: "POST",
          body,
        };
      },
    }),
    putStoreHouse: builder.mutation({
      query(body) {
        console.log(body);
        return {
          url: `v1/store`,
          method: "PUT",
          body,
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
    getCategoryWithSubcategory: builder.query({
      query: ({id, url}) => `v1/store/${id}/category/withSubcategory?${url}`,
    }),
    getSubCategoryById: builder.query({
      query: ({id, url}) => `v1/store/category/${id}/allSubcategory?${url}`,
    }),
    getProductsswithFiler: builder.query({
      query: ({request}) => `v1/store/category/item/${request}`,
    }),
    getProduct: builder.query({
      query: (id) => `v1/store/category/item/${id}`,
    }),
    getPicture: builder.query({
      query: (id) => ({
        url: `v1/store/image?imageName=${id}`,
        responseHandler: (res) => res.blob(),
      }),
      transformResponse: (res) => URL.createObjectURL(res),
    
    
    
    
    
    }),
    getStoreHouses: builder.query({
      query: () => 'v1/store',
      refetchOnMountOrArgChange: true,
      providesTags: (result) => {
        // Проверяем, что result является массивом
        if (Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'storeHouses', id })),
            { type: 'storeHouses', id: 'LIST' }
          ];
        } else {
          // Если result не массив, возвращаем только тег для списка
          return [{ type: 'storeHouses', id: 'LIST' }];
        }
      },
    }),
    getStoreHouse: builder.query({
      query: (id) => `v1/store/${id}`,
    }),
   
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `v1/store/category/item/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    deleteCategory: builder.mutation({
      query(id) {
        return {
          url: `v1/store/category/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    deleteStoreHouse: builder.mutation({
      query(id) {
        return {
          url: `v1/store/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'storeHouses', id }],
    }),
    deleteCategoryImage: builder.mutation({
      query(id) {
        return {
          url: `v1/store/image/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'storeHouses', id }],
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
  useGetCategoryWithSubcategoryQuery,
  useGetSubCategoryByIdQuery,
  useGetProductsswithFilerQuery,
  useGetProductQuery,
  usePutProductMutation,
  usePutStatusProductMutation,
  useDeleteProductMutation,
  usePostProductMutation,
  useDeleteCategoryMutation,
  useGetPictureQuery,
  getPicture,
  useGetStoreHousesQuery,
  usePostStoreHouseMutation,
  useGetStoreHouseQuery,
  usePutStoreHouseMutation,
  usePostCategoryImageMutation,
  useDeleteStoreHouseMutation,
  useLazyGetStoreHouseQuery,
useLazyGetProductsswithFilerQuery,
usePostProductImageMutation,
useDeleteCategoryImageMutation, 
useLazyGetPictureQuery
} = Api;
