import {useQuery} from 'react-query';
import {axios} from '@/lib/axios';
import {ExtractFnReturnType, QueryConfig} from '@/lib/react-query';
import {Marker} from '../types';

<<<<<<< HEAD
/**
 * apiからマーカを取得する関数
 * @param markerId
 */
=======
>>>>>>> main
export const getMarker = async ({markerId}: { markerId: number }): Promise<Marker> => {
    const res = await axios.get(`/v1/markers/${markerId}`);
    return res.data.marker;
};

type QueryFnType = typeof getMarker;

type UseMarkerOptions = {
    markerId: number;
    config?: QueryConfig<QueryFnType>;
};

/**
 * マーカを取得するためのカスタムフック
 * @param markerId
 * @param config
 */
export const useMarker = ({markerId, config}: UseMarkerOptions) => {
    return useQuery<ExtractFnReturnType<QueryFnType>>({
        ...config,
        queryKey: ['marker', markerId],
        queryFn: () => getMarker({markerId}),
    });
};