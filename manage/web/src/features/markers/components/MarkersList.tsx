import {Button, Link, Table} from "@/components/Elements";
import {Marker} from '../types';
import {useMarkers} from "../api/getMarkers";
import {useDeleteMarker} from "../api/deleteMarker";

/**
 * マーカの一覧を表示する
 * @constructor
 */
export const MarkersList = () => {
    const markersQuery = useMarkers();
    const deleteMarkerMutation = useDeleteMarker();

    // ローディング中の場合,コンポーネントの表示を保留する
    if (markersQuery.isLoading) {
        return (
            <div>loading...</div>
        )
    }

    if (!markersQuery.data) {
        return (
            <div>no data</div>
        )
    }

    return (
        <Table titles={['id', 'name', 'description', 'address', 'latitude', 'longitude', 'point', 'edit', 'delete']}
               cells={markersQuery.data.map((marker: Marker) => ({
                   ...marker,
                   edit: <Link to={`/marker/${marker.id}/edit`}>編集</Link>,
                   delete: <Button className="w-fit" onClick={async () => {
                       await deleteMarkerMutation.mutateAsync({markerId: marker.id});
                   }}>削除</Button>,
               }))
               }/>
    )
}