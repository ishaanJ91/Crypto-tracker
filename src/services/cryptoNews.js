import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeader = {
  'x-rapidapi-key': 'f952352d83mshe0240ff059a3acap17d841jsn18213f669917',
  'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
};

const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeader,
});

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://real-time-finance-data.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => createRequest(`/stock-news?count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
