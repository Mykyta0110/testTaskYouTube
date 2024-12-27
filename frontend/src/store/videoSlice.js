import { createSlice } from "@reduxjs/toolkit";
import { videoApi } from "./videoApi";

const initialState = {
    videos: [],
    error: null, 
};

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                videoApi.endpoints.getVideos.matchFulfilled,
                (state, action) => {
                    state.videos = action.payload.results;
                    state.error = null;
                }
            )
            .addMatcher(
                videoApi.endpoints.getVideos.matchRejected,
                (state, action) => {
                    state.error = action.error.message || "Something went wrong"; 
                }
            );
    },
});

export const { setVideos, setError, clearError } = videoSlice.actions;
export default videoSlice.reducer;
