import axios from "axios";
import { useAPIUserDataContext } from "@/providers/APIUserData";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: API_URL,
});

/**
 * ユーザページ
 */
const User = () => {
    const apiUserData = useAPIUserDataContext();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    // ユーザデータが取得できたら、名前をセット
    useEffect(() => {
        if (apiUserData.userData) {
            setName(apiUserData.userData.name);
        }
    }, [apiUserData]);

    // ユーザデータ更新APIのリクエストボディの型
    type UpdateUserDataType = {
        user: {
            name: string;
        };
    };

    // ユーザデータ更新APIのリクエストボディを構築
    const buildUpdateUserData = (name: string): UpdateUserDataType => {
        return {
            user: {
                name: name,
            },
        };
    };
    //ユーザデータの更新処理
    const handleUpdate = async () => {
        if (!window.confirm("ユーザ情報を更新しますか？")) {
            return;
        }

        await api
            .put(
                `/api/v1/users/${apiUserData.userData?.id}`,
                buildUpdateUserData(name)
            )
            .then(() => {
                alert("ユーザ情報の更新に成功しました");
            })
            .catch(() => {
                alert("ユーザ情報の更新に失敗しました");
            });
        apiUserData.fetchUserData();
        setEditMode(false);
    };

    // キャンセルボタンを押した時の処理
    const handleCancel = () => {
        setName(apiUserData.userData?.name || "");
    };

    // ログアウト処理
    const handleSignOut = async () => {
        const auth = getAuth();
        await auth.signOut();
        navigate("/welcome");
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center" style={{ backgroundImage: "url(/acnt_bg.png)", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="p-6 bg-white rounded-md shadow-lg max-w-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="flex flex-col items-center space-y-4">
                    <label className="text-gray-700 font-semibold">NAME</label>
                    <input
                        name="name"
                        type="text"
                        disabled={!editMode}
                        className="border-4 border-blue-300 p-2 rounded-md focus:border-pink-500 transition-all duration-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            editMode && handleCancel();
                            setEditMode(!editMode);
                        }}
                        className={`bg-${editMode ? 'red' : 'blue'
                            }-500 text-white px-3 py-1 rounded-md transition-all duration-300`}
                    >
                        {editMode ? 'キャンセル' : '名前変更'}
                    </button>
                    <p className="text-lg font-semibold text-purple-500">
                        ポイント: {apiUserData.userData?.point}
                    </p>
                    {editMode ? (
                        <button
                            type="button"
                            onClick={() => handleUpdate()}
                            className="bg-pink-500 text-white px-4 py-2 rounded-md transition-all duration-300"
                        >
                            更新
                        </button>
                    ) : (
                        <div>
                            <button
                                onClick={() => handleSignOut()}
                                className="bg-gray-500 text-white px-3 py-1 rounded-md transition-all duration-300"
                            >
                                ログアウト
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
