import { ContentLayout } from "@/components/Layout";
import { Link } from "@/components/Elements";
import { MarkersList } from "../components/MarkersList";

export const Markers = () => {
    return (
        <ContentLayout title="マーカー一覧" description="マーカーの管理画面です">
            <div className="my-10">
                <h1 className="my-10 text-xl px-5">マーカー一覧</h1>
                <div className="flex flex-row-reverse">
                    <Link to={"/marker/new"}>マーカー追加</Link>
                </div>
                <MarkersList />
            </div>
            <Link to="/">ホームに戻る</Link>
        </ContentLayout>
    );
}