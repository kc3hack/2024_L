import { ContentLayout } from "@/components/Layout";
import { Link } from "@/components/Elements";
import { MarkersList } from "../components/MarkersList";

export const Markers = () => {
    return (
        <ContentLayout title="スポット一覧" description="スポットの管理画面です">
            <div className="my-10">
                <h1 className="my-10 text-xl px-5">スポット一覧</h1>
                <div className="flex flex-row-reverse">
                    <Link to={"/marker/new"}>スポット追加</Link>
                </div>
                <MarkersList />
            </div>
            <Link to="/">ホームに戻る</Link>
        </ContentLayout>
    );
}