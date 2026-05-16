import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./features/booking/bookingSlice";
import placeReducer from "./features/place/placeSlice";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        place: placeReducer
    },
});