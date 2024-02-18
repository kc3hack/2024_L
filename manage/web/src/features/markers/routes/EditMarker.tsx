import { UpdateMarker} from "../components/Updatemarker";
import {useParams} from "react-router-dom";

export const EditMarker = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1 className="my-10 text-xl px-5">マーカー更新</h1>
            <UpdateMarker markerId={Number(id)}/>
        </div>
    )
}