import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Marker } from '../types';

export const getMarker = ({ markerId }: { markerId: number }): Promise<Marker> => {
    return axios.get(`/v1/markers/${markerId}`)
        .then((res) => res.data.marker);
};

type QueryFnType = typeof getMarker;

type UseMarkerOptions = {
    markerId: number;
    config?: QueryConfig<QueryFnType>;
};

export const useMarker = ({ markerId, config }: UseMarkerOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['marker', markerId],
        queryFn: () => getMarker({ markerId }),
    });
};