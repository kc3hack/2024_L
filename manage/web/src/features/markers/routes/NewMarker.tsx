import { ContentLayout } from "@/components/Layout";
import { CreateMarker } from "../components/CreateMarker";

export const NewMarker = () => {
    return (
        <ContentLayout title="マーカー追加" description="マーカーを追加します。">
            <h1 className="my-10 text-xl px-5">マーカー追加</h1>
            <CreateMarker />
        </ContentLayout>
    )
}