import { useNavigate } from "react-router-dom";
import { ContentLayout } from "@/components/Layout";
import { Button } from "@/components/Elements/";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <ContentLayout title="管理者画面" description="管理者画面です">
            <div className="flex flex-col items-center ">
                <Button className="mt-[20vh]" onClick={() => navigate("/markers")}>マーカー設定</Button>
            </div>
        </ContentLayout>
    );
}