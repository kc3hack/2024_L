import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../config";

import { useFirebaseAuthContext } from "@/providers/FirebaseAuth";

const api = axios.create({
  baseURL: API_URL,
});

/**
 * ランキングページ
 *
 * @returns
 */
const Ranking = () => {
  const user = useFirebaseAuthContext();
  const [users, setUsers] = useState([]);
  const [ranking, setRanking] = useState([]);

  // ユーザー一覧を取得
  useEffect(() => {
    const fetchUsers = async () => {
      const idToken = await user?.getIdToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      };
      const response = await api
        .get("/api/v1/users", { headers: headers })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      setUsers(response?.data.data.users);
    };
    fetchUsers();
  }, []);

  // userのデータのpointを元にランキングを作成
  useEffect(() => {
    if (users.length === 0) return;
    const ranking = users.sort((a: any, b: any) => {
      if (a.point < b.point) return 1;
      if (a.point > b.point) return -1;
      return 0;
    });
    setRanking(ranking);
  }, [users]);

  if (ranking.length === 0) return <p>Loading...</p>;

  return (
    // 背景を水色にする
    <div className="bg-blue-100">

    <div className="w-screen flex justify-center items-center"
      style={{
        backgroundImage: "url(/note-neo.png)",
        backgroundSize: 'cover',
        width: '100%',
        height: '100vh',
        backgroundPosition: 'center'
      }}>
      <div className="w-screen flex justify-center items-center"
        style={{
          backgroundImage: "url(/spring.png)",
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh',
          backgroundPosition: 'center'
        }}>

        <tbody>
          {ranking.map((user: any, index: number) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <td
                className={`border px-4 py-2 font-bold ${index === 0 ? "rounded-tl-lg" : ""
                  } ${index === ranking.length - 1 ? "rounded-bl-lg" : ""}`}
              >
                {index + 1}位
              </td>
              <td className="border px-4 py-2 font-bold">{user.name}</td>
              <td
                className={`border px-4 py-2 font-bold ${index === 0 ? "rounded-tl-lg" : ""
                  } ${index === ranking.length - 1 ? "rounded-bl-lg" : ""}`}
              >
                {user.point}pt
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
    </div>
  );

};

export default Ranking;
