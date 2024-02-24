import axios from "axios";
import {useAPIUserDataContext} from "@/providers/APIUserData";
import {useEffect, useState} from "react";
import {API_URL} from "@/config";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const api = axios.create({
    baseURL: API_URL,
});

const User = () => {
    const apiUserData = useAPIUserDataContext();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (apiUserData) {
            setName(apiUserData.name);
        }
    }, [apiUserData]);

    type UpdateUserDataType = {
        user: {
            name: string,
        },
    };
    const buildUpdateUserData = (name: string): UpdateUserDataType => {
        return {
            user: {
                name: name,
            },
        };
    }
    const handleUpdate = async () => {
        if (!window.confirm('ユーザ情報を更新しますか？')) {
            return;
        }

        await api.put(`/api/v1/users/${apiUserData?.id}`, buildUpdateUserData(name))
            .then(() => {
                alert('ユーザ情報の更新に成功しました');
            })
            .catch(() => {
                alert('ユーザ情報の更新に失敗しました');
            });
    };

    const handleSignOut = async () => {
        const auth = getAuth();
        await auth.signOut();
        navigate('/welcome');
    };

    return (
        <div className="p-6 d w-full min-h-[90vh] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center space-y-4">
                <h1 className="text-xl font-bold">ユーザーページ</h1>
                <button
                    onClick={() => setEditMode(!editMode)}
                    className={`bg-${editMode ? 'red' : 'blue'}-500 text-white px-4 py-2 rounded-md`}
                >
                    {editMode ? 'キャンセル' : '編集'}
                </button>
                <label className="text-gray-700">ユーザー名</label>
                <input
                    name="name"
                    type="text"
                    disabled={!editMode}
                    className="border-2 border-gray-300 p-2 rounded-md focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="text-lg font-semibold">ポイント: {apiUserData?.point}</p>
                {editMode ? <button
                        type="button"
                        onClick={() => handleUpdate()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md">更新</button> :
                    <div>
                        <button
                            onClick={() => handleSignOut()}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md">ログアウト
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default User;