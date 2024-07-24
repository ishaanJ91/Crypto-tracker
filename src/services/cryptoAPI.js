import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-access-token': 'coinranking92a1fe6775ffcff15a80311d0fd8d2c2d1da46d6caf4cd04',
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinranking.com/v2' }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
          query: (count) => createRequest(`/coins?limit=${count}`),
        }),
    
        getCryptoDetails: builder.query({
          query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
    
        // Corrected endpoint to use `timePeriod` instead of `timeperiod`
        getCryptoHistory: builder.query({
          query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
        }),
    }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
