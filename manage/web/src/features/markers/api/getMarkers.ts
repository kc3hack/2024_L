import {axios} from "@/lib/axios";
import { Marker } from "../types";
import {ExtractFnReturnType, QueryConfig} from "@/lib/react-query";
import {useQuery} from "react-query";
export const getMarkers = (): Promise<Marker[]>  => {
    return axios.get("/v1/markers")
        .then((res) => res.data.markers)
}

type QueryFnType = typeof getMarkers;

type UseMarkersOptions = {
    config?: QueryConfig<QueryFnType>;
}

export const useMarkers = ({ config }: UseMarkersOptions = {}) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['markers'],
        queryFn: () => getMarkers(),
    })
}