import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libraapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "categories",
      }),
      providesTags: ["Categories"],
    }),
    getCategoriesById: builder.query({
      query: (id) => ({
        url: `categories/${id}`,
      }),
      providesTags: ["Categories"],
    }),
    createCategories: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategories: builder.mutation({
      query: ({ data, id }) => ({
        url: "categories/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategories: builder.mutation({
      query: (id) => ({
        url: "categories/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesByIdQuery,
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,

} = categoryApi;
export default categoryApi;
