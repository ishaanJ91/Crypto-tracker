import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://newsapi.org/v2';
const apiKey = 'a0ed58c4cdcf43539b862fde4757b9e6';

const createRequest = (url) => ({
  url,
  headers: {
    'Authorization': `Bearer ${apiKey}`
  }
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ query, pageSize }) => createRequest(`/everything?q=${query}&pageSize=${pageSize}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
