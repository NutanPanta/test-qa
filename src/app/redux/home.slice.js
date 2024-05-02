import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeSlice = createApi({
  reducerPath: 'home',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://concordapi.mass-fluence.com/api',
  }),
  tagTypes: ['homeData'],
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: () => 'home-page',
      providesTags: ['homeData'],
    }),
    addSlider: builder.mutation({
      query: (sliderData) => ({
        url: 'add-slider',
        method: 'POST',
        body: sliderData,
      }),
      invalidatesTags: ['homeData'],
    }),
    updateSlider: builder.mutation({
      query: (sliderData) => ({
        url: 'update-slider',
        method: 'POST',
        body: sliderData,
      }),
      invalidatesTags: ['homeData'],
    }),
    deleteSlider: builder.mutation({
      query: (sliderData) => ({
        url: 'delete-slider',
        method: 'POST',
        body: sliderData,
      }),
      invalidatesTags: ['homeData'],
    }),
  }),
});

export const {
  useGetHomeDataQuery,
  useAddSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = homeSlice;

export default homeSlice.reducer;
