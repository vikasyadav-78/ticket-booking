import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useSlots = ({ placeId, date, }) => {
    return useQuery({
        queryKey: ["slots", placeId, date],
        queryFn: async () => {
            if (!placeId || !date) return [];
            const res = await api.get(`/slot/slots/${placeId}/${date}`);
            return res?.data?.data || [];
        },
        enabled: !!placeId && !!date,
    });
};