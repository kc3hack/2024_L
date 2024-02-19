import { Button, Link, Table } from "@/components/Elements";
import { Marker } from '../types';
import { useMarkers } from "../api/getMarkers";
import { useDeleteMarker } from "../api/deleteMarker";

export const MarkersList = () => {
    const markersQuery = useMarkers();
    const deleteMarkerMutation = useDeleteMarker();

    if (markersQuery.isLoading) {
        return (
            <div>loading...</div>
        )
    }

    if (!markersQuery.data) return null;

    return (
        <Table titles={['id', 'name', 'description', 'address', 'latitude', 'longitude', 'edit', 'delete']}
            cells={markersQuery.data.map((marker: Marker) => ({
                ...marker,
                edit: <Link to={`/marker/${marker.id}/edit`}>編集</Link>,
                delete: <Button className="w-fit" onClick={async () => {
                    await deleteMarkerMutation.mutateAsync({ markerId: marker.id });
                }}>削除</Button>,
            }))
            } />
    )
}