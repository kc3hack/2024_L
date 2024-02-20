import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { Marker } from '../types';

export const deleteMarker = ({ markerId }: { markerId: number }) => {
    return axios.delete(`/v1/markers/${markerId}`);
};

type UseDeleteMarkerOptions = {
    config?: MutationConfig<typeof deleteMarker>;
};

export const useDeleteMarker = ({ config }: UseDeleteMarkerOptions = {}) => {

    return useMutation({
        onMutate: async (deletedMarker) => {
            await queryClient.cancelQueries('markers');

            const previousMarkers = queryClient.getQueryData<Marker[]>('markers');

            queryClient.setQueryData(
                'markers',
                previousMarkers?.filter(
                    (marker) => marker.id !== deletedMarker.markerId
                )
            );

            return { previousMarkers };
        },
        onError: (_, __, context: any) => {
            if (context?.previousMarkers) {
                queryClient.setQueryData('markers', context.previousMarkers);
                alert('削除に失敗しました。');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('markers');
            alert('正常に削除されました。')
        },
        ...config,
        mutationFn: deleteMarker,
    });
};