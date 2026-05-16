import { useSelector } from "react-redux";

export const usePlace = () => {
    const selectedPlace = useSelector(
        (state) => state.place.selectedPlace
    );
    const placeId = selectedPlace?._id || selectedPlace?.id;
    const isPlaceLoaded = !!placeId;

    return {
        selectedPlace,
        placeId,
        isPlaceLoaded, 
    };
};