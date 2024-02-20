import {useNavigate} from "react-router-dom";
import * as z from 'zod';
import {Form, Input} from '@/components/Form';
import {Button} from "@/components/Elements";
import {getCoordinates} from "@/features/markers/api/getCoordinates";
import {useMarker} from '../api/getMarker';
import {UpdateMarkerDTO, useUpdateMarker} from '../api/updateMarker';

type UpdateMarkerProps = {
    markerId: number;
};

const schema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    address: z.string().min(1).max(255),
    latitude: z.number(),
    longitude: z.number(),
});

export const UpdateMarker = ({markerId}: UpdateMarkerProps) => {
    const markerQuery = useMarker({markerId});
    const updateMarkerMutation = useUpdateMarker();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center">
            <Form<UpdateMarkerDTO['marker'], typeof schema>
                id="update-marker"
                onSubmit={async (values) => {
                    await updateMarkerMutation.mutateAsync({marker: values, markerId: markerId});
                    navigate('/markers');
                }}
                options={{
                    defaultValues: {
                        name: markerQuery.data?.name,
                        description: markerQuery.data?.description,
                        address: markerQuery.data?.address,
                        latitude: markerQuery.data?.latitude,
                        longitude: markerQuery.data?.longitude,
                    },
                }}
                schema={schema}
                className="w-[60%]"
            >
                {({register, formState, getValues, setValue}) => (
                    <div>
                        <Input type="text" className="mb-10" label="名称"
                               error={formState.errors['name']} {...register('name')}/>
                        <Input type="text" className="mb-10" label="説明"
                               error={formState.errors['description']} {...register('description')} />
                        <Input type="text" className="mb-10" label="住所"
                               error={formState.errors['address']} {...register('address')} />
                        <Button type="button" className="w-[10rem]" onClick={async () => {
                            const address = getValues('address');
                            await getCoordinates(address).then((coordinates) => {
                                const {latitude, longitude} = coordinates;
                                setValue('latitude', latitude);
                                setValue('longitude', longitude);
                            });
                        }
                        }>住所から緯度経度を取得</Button>

                        <div className="mb-10 flex flex-row">
                            <Input type="text" className="mb-10" label="緯度"
                                   error={formState.errors['latitude']} {...register('latitude')} disabled/>
                            <Input type="text" className="mb-10" label="経度"
                                   error={formState.errors['longitude']} {...register('longitude')} disabled/>
                        </div>
                        <Input type="submit" value="更新する"/>
                    </div>
                )}
            </Form>
        </div>
    );
};