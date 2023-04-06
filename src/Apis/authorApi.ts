import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libraapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Author"],
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => ({
        url: "authors",
      }),
      providesTags: ["Author"],
    }),
    getAuthorsById: builder.query({
      query: (id) => ({
        url: `authors/${id}`,
      }),
      providesTags: ["Author"],
    }),
    createAuthors: builder.mutation({
      query: (data) => ({
        url: "authors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Author"],
    }),
    updateAuthors: builder.mutation({
      query: ({ data, id }) => ({
        url: "authors/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Author"],
    }),
    deleteAuthors: builder.mutation({
      query: (id) => ({
        url: "authors/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Author"],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useGetAuthorsByIdQuery,
  useCreateAuthorsMutation,
  useUpdateAuthorsMutation,
  useDeleteAuthorsMutation,

} = authorApi;

export default authorApi;
