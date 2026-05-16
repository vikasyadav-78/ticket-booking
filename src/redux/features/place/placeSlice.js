import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    places: [],
    selectedPlace: null,
    placeId: null,
    loading: false,
    error: null,
};

const placeSlice = createSlice({
    name: "place",

    initialState,

    reducers: {
        setPlaces: (state, action) => {
            state.places = action.payload;
        },

        setSelectedPlace: (state, action) => {
            state.selectedPlace = action.payload;

            state.placeId =
                action.payload?._id ||
                action.payload?.id ||
                null;
        },

        setPlaceLoading: (state, action) => {
            state.loading = action.payload;
        },

        setPlaceError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setPlaces,
    setSelectedPlace,
    setPlaceLoading,
    setPlaceError,
} = placeSlice.actions;

export default placeSlice.reducer;