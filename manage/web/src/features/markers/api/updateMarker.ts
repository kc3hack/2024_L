import {useMutation} from 'react-query';

import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';

import {Marker} from '../types';

export type UpdateMarkerDTO = {
    marker: {
        name: string,
        description: string,
        latitude: number,
        longitude: number,
        address: string,
    },
    markerId: number,
};

export const updateMarker = ({
                                 marker,
                                 markerId
}: UpdateMarkerDTO): Promise<Marker> => {
    return axios.put(`/v1/markers/${markerId}`, marker)
        .then((res) => res.data.marker)
};

type UseUpdateMarkerOptions = {
    config?: MutationConfig<typeof updateMarker>;
};

export const useUpdateMarker = ({config}: UseUpdateMarkerOptions = {}) => {

    return useMutation({
        onMutate: async (updatingMarker: any) => {
            await queryClient.cancelQueries(['marker', updatingMarker?.markerId]);

            const previousMarker = queryClient.getQueryData<Marker>([
                'marker',
                updatingMarker?.markerId,
            ]);

            queryClient.setQueryData(['marker', updatingMarker?.markerId], {
                ...previousMarker,
                ...updatingMarker.data,
                id: updatingMarker.markerId,
            });

            return {previousMarker};
        },
        onError: (_, __, context: any) => {
            if (context?.previousMarker) {
                queryClient.setQueryData(
                    ['marker', context.previousMarker.id],
                    context.previousMarker
                );
            }
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(['marker', data.id]);
            alert('正常に送信されました。');
        },
        ...config,
        mutationFn: updateMarker,
    });
};