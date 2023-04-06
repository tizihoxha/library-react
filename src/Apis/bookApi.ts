import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://libraapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "books",
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `books/${id}`,
      }),
      providesTags: ["Books"],
    }),
    getAuthorById: builder.query({
      query: (id) => ({
        url: `authors/${id}`,
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `Books/books/${id}/categories`,
      }),
    }),
    getBooksByAuthor: builder.query({
      query: (id) => ({
        url: "Authors/GetBooksByAuthor",
      }),
    }),
    createBooks: builder.mutation({
      query: (data) => ({
        url: "books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBooks: builder.mutation({
      query: ({ data, id }) => ({
        url: "books/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBooks: builder.mutation({
      query: (id) => ({
        url: "books/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),

  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetAuthorByIdQuery,
  useGetCategoryByIdQuery,
  useGetBooksByAuthorQuery,
  useCreateBooksMutation,
  useUpdateBooksMutation,
  useDeleteBooksMutation,
} = bookApi;
export default bookApi;
