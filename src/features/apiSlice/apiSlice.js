import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://my-json-server.typicode.com/ehasanrobin/videoWebSiteFakeDb",
  }),
  tagTypes: ["videos", "video", "relatedVideo"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [
        {
          type: "video",
          id: arg,
        },
        {
          type: "relatedVideo",
          id: arg,
        },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        {
          type: "video",
          id: arg.id,
        },
        {
          type: "relatedVideo",
          id: arg.id,
        },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        {
          type: "video",
          id: arg,
        },
        {
          type: "relatedVideo",
          id: arg,
        },
      ],
    }),
    // title_like=css&_ne=5
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");

        const likes = tags.map((tag) => `title_like=${tag}`).join("&");
        const queryString = `/videos?${likes}&_limit=4&id_ne=${id}`;
        return queryString;
      },
      providesTags: (result, error, arg) => [
        {
          type: "relatedVideo",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
