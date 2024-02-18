import { ContentLayout } from "@/components/Layout";
import { CreateMarker } from "../components/CreateMarker";

export const NewMarker = () => {
    return (
        <ContentLayout title="スポット追加" description="スポットを追加します。">
            <h1 className="my-10 text-xl px-5">スポット追加</h1>
            <CreateMarker />
        </ContentLayout>
    )
}