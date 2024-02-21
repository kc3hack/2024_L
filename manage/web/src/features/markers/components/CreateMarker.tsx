import {useNavigate} from "react-router-dom";
import {z} from 'zod';
import {Form, Input} from '@/components/Form';
import {Button} from "@/components/Elements";
import {CreateMarkerDTO, useCreateMarker} from '../api/createMarker';
import {getCoordinates} from "../api/getCoordinates";

const schema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(255),
    address: z.string().min(1).max(255),
    latitude: z.number().min(1),
    longitude: z.number().min(1),
    point: z.number().min(1),
});
/**
 * マーカーを作成するコンポーネント
 * @constructor
 */
export const CreateMarker = () => {
    const createMarkerMutation = useCreateMarker();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center">
            <Form<CreateMarkerDTO['marker'], typeof schema>
                id="create-marker"
                onSubmit={async (values) => {
                    values.point = Number(values.point);
                    await createMarkerMutation.mutateAsync({marker: values});
                    navigate('/markers');
                }}
                schema={schema}
                className="w-[60%]"
            >
                {({register, formState, getValues, setValue}) => (
                    <div>
                        <Input type="text" className="mb-10" label="名称"
                               error={formState.errors['name']} {...register('name')} required/>
                        <Input type="text" className="mb-10" label="説明"
                               error={formState.errors['description']} {...register('description')} />
                        <Input type="text" className="mb-10" label="住所"
                               error={formState.errors['address']} {...register('address')} required/>
                        <Button type="button" className="w-[10rem]" onClick={async () => {
                            const address = getValues('address');
                            await getCoordinates(address).then((coordinates) => {
                                const {latitude, longitude} = coordinates;
                                setValue('latitude', latitude);
                                setValue('longitude', longitude);
                            });
                        }
                        }>住所から緯度経度を取得</Button>

                        <div className="flex flex-row">
                            <Input type="text" className="mb-10" label="緯度"
                                   error={formState.errors['latitude']} {...register('latitude')} required disabled/>
                            <Input type="text" className="mb-10" label="経度"
                                   error={formState.errors['longitude']} {...register('longitude')} required disabled/>
                        </div>
                        <Input type="number" className="mb-10" label="ポイント"
                               error={formState.errors['point']} {...register('point', {valueAsNumber: true})}
                               required/>
                        <Input type="submit" value="追加する"/>
                    </div>
                )}
            </Form>
        </div>
    );
};