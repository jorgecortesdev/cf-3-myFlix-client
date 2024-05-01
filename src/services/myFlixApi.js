import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const myFlixApi = createApi({
  reducerPath: 'myFlixApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MYFLIX_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (form) => ({
        url: 'users',
        method: 'POST',
        body: form,
      }),
      transformErrorResponse: (response) => response.data.error,
    }),
    updateAccount: builder.mutation({
      query(data) {
        const { email, ...form } = data;
        return {
          url: `users/${email}`,
          method: 'PUT',
          body: form.form,
        };
      },
      transformErrorResponse: (response) => response.data.error,
    }),
    deleteAccount: builder.mutation({
      query: (email) => ({
        url: `users/${email}`,
        method: 'DELETE',
      }),
    }),
    toggleFavoriteMovie: builder.mutation({
      query(data) {
        const { email, movie, method } = data;
        return {
          url: `lists/${email}/favorite/${movie}`,
          method,
        };
      },
      transformErrorResponse: (response) => response.data.error,
    }),
    toggleWatchMovie: builder.mutation({
      query(data) {
        const { email, movie, method } = data;
        return {
          url: `lists/${email}/watch/${movie}`,
          method,
        };
      },
      transformErrorResponse: (response) => response.data.error,
    }),
    getMovies: builder.query({
      query: () => '/movies',
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useToggleFavoriteMovieMutation,
  useToggleWatchMovieMutation,
  useGetMoviesQuery,
} = myFlixApi;
