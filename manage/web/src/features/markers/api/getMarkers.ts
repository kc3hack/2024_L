import {useQuery} from "react-query";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {axios} from "@/lib/axios";
import {Marker} from "../types";

/**
 * マーカのリストを取得する
 */
export const getMarkers = async (): Promise<Marker[]> => {
    const res = await axios.get("/v1/markers");
    return res.data.markers;
};

// Path: useMarkers.ts
type QueryFnType = typeof getMarkers;

type UseMarkersOptions = {
    config?: QueryConfig<QueryFnType>;
};

/**
 * マーカのリストを取得する
 * @param config
 */
export const useMarkers = ({config}: UseMarkersOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['markers'],
        queryFn: () => getMarkers(),
    })
};