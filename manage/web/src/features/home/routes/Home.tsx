import {ContentLayout} from "@/components/Layout";
import {Button} from "@/components/Elements/Button";
import {Link, useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <ContentLayout title="管理者画面" description="管理者画面です">
            <div className="flex flex-col items-center ">
                <Button className="mt-32" onClick={()=>navigate("/markers")}>スポット設定</Button>
            </div>
        </ContentLayout>
  );
}