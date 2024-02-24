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
    <div className="p-6 d w-full min-h-[90vh] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-xl font-bold">ユーザーページ</h1>
        <button
          onClick={() => {
            editMode && handleCancel();
            setEditMode(!editMode);
          }}
          className={`bg-${
            editMode ? "red" : "blue"
          }-500 text-white px-4 py-2 rounded-md`}
        >
          {editMode ? "キャンセル" : "編集"}
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
        <p className="text-lg font-semibold">
          ポイント: {apiUserData.userData?.point}
        </p>
        {editMode ? (
          <button
            type="button"
            onClick={() => handleUpdate()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            更新
          </button>
        ) : (
          <div>
            <button
              onClick={() => handleSignOut()}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
