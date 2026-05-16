import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slots: [],
    selectedSlot: null,
    loading: false,
    error: null,
};

const slotSlice = createSlice({
    name: "slot",
    initialState,
    reducers: {
        setSlots: (state, action) => {
            state.slots = action.payload;
        },
        setSelectedSlot: (state, action) => {
            state.selectedSlot = action.payload;
        },
        setSlotLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSlotError: (state, action) => {
            state.error = action.payload;
        },
        clearSlots: (state) => {
            state.slots = [];
            state.selectedSlot = null;
        },
    },
});

export const { setSlots, setSelectedSlot, setSlotLoading, setSlotError, clearSlots, } = slotSlice.actions;
export default slotSlice.reducer;