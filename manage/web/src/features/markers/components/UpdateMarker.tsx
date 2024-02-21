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

<<<<<<< HEAD:manage/web/src/features/markers/components/Updatemarker.tsx
//バリデーション定義
=======
{/* バリデーション定義 */
}
>>>>>>> main:manage/web/src/features/markers/components/UpdateMarker.tsx
const schema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(255),
    address: z.string().min(1).max(255),
    latitude: z.number().min(1),
    longitude: z.number().min(1),
    point: z.number().min(1),
});

/**
<<<<<<< HEAD:manage/web/src/features/markers/components/Updatemarker.tsx
 * マーカー更新画面
=======
 * マーカーの更新フォーム。
 *
>>>>>>> main:manage/web/src/features/markers/components/UpdateMarker.tsx
 * @param markerId
 * @constructor
 */
export const UpdateMarker = ({markerId}: UpdateMarkerProps) => {
    const markerQuery = useMarker({markerId});
    const updateMarkerMutation = useUpdateMarker();
    const navigate = useNavigate();

    {/*  マーカ情報ロード中ははローディング表示 */
    }
    if (markerQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            { /*送信時にマーカー情報を更新する. マーカー情報を初期値として設定する. */}
            <Form<UpdateMarkerDTO['marker'], typeof schema>
                id="update-marker"
                onSubmit={async (values) => {
                    console.log(values.point);
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
                        point: markerQuery.data?.point,
                    },
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
<<<<<<< HEAD:manage/web/src/features/markers/components/Updatemarker.tsx
                               error={formState.errors['address']} {...register('address')} required/>
                        {/*住所から緯度経度を取得する. */}
=======
                               error={formState.errors['address']} {...register('address')} />

                        {/* 住所から緯度経度を取得するボタン */}
>>>>>>> main:manage/web/src/features/markers/components/UpdateMarker.tsx
                        <Button type="button" className="w-[10rem]" onClick={async () => {
                            const address = getValues('address');
                            await getCoordinates(address).then((coordinates) => {
                                const {latitude, longitude} = coordinates;
                                setValue('latitude', latitude);
                                setValue('longitude', longitude);
                            });
                        }
                        }>住所から緯度経度を取得</Button>

<<<<<<< HEAD:manage/web/src/features/markers/components/Updatemarker.tsx
                        {/*緯度経度の表示(Readonly) */}
                        <div className="flex flex-row">
=======
                        { /* 緯度経度入力欄(readOnly)*/}
                        <div className="mb-10 flex flex-row">
>>>>>>> main:manage/web/src/features/markers/components/UpdateMarker.tsx
                            <Input type="text" className="mb-10" label="緯度"
                                   error={formState.errors['latitude']} {...register('latitude')} required disabled/>
                            <Input type="text" className="mb-10" label="経度"
                                   error={formState.errors['longitude']} {...register('longitude')} required disabled/>
                        </div>
                        <Input type="number" className="mb-10" label="ポイント"
                               error={formState.errors['point']} {...register('point', {valueAsNumber: true})}
                               required/>
                        <Input type="submit" value="更新する"/>
                    </div>
                )}
            </Form>
        </div>
    );
};