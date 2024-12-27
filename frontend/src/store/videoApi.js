import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API,
    }),
    endpoints: (build) => ({
        getVideos: build.query({
            query: ({ query, pageToken }) => {
                let url = `videos/search?q=${query}`;
                if (pageToken) {
                    url += `&pageToken=${pageToken}`;
                }
                return url;
            }
        }),
        getVideoById: build.query({
            query: (body) => `videos/${body.videoId}`,
        }),
        getHistory: build.query({
            query: () => `history`,
        }),
    })
});

export const { useLazyGetVideosQuery, useGetVideoByIdQuery, useGetHistoryQuery } = videoApi;
