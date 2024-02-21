import {useMutation} from 'react-query';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {axios} from '@/lib/axios';
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

export const updateMarker = async ({
                                       marker,
                                       markerId
                                   }: UpdateMarkerDTO): Promise<Marker> => {
    const res = await axios.put(`/v1/markers/${markerId}`, marker);
    return res.data.marker;
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