import { UpdateMarker} from "../components/Updatemarker";
import {useParams} from "react-router-dom";
import {ContentLayout} from "@/components/Layout";

export const EditMarker = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <ContentLayout title="マーカー編集画面" description="マーカーの編集を行います">
            <h1 className="my-10 text-xl px-5">マーカー更新</h1>
            <UpdateMarker markerId={Number(id)}/>
        </ContentLayout>
    )
}