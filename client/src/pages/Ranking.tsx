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
    <>
      <div
        className="w-screen"
        style={{
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          backgroundPosition: "center",
        }}
      >
        <div className="items-center mt-10">
          <h1 className="text-2xl font-bold mb-4 text-center">ランキング</h1>
          <div className="flex items-center justify-center">
            <table className="table-auto bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-blue-500 text-white rounded-tl-lg">
                    Rank
                  </th>
                  <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                  <th className="px-4 py-2 bg-blue-500 text-white rounded-tr-lg">
                    Point
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((user: any, index: number) => (
                  <tr
                    key={user.id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td
                      className={`border px-4 py-2 ${
                        index === 0 ? "rounded-tl-lg" : ""
                      } ${index === ranking.length - 1 ? "rounded-bl-lg" : ""}`}
                    >
                      {index + 1}位
                    </td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td
                      className={`border px-4 py-2 ${
                        index === 0 ? "rounded-tl-lg" : ""
                      } ${index === ranking.length - 1 ? "rounded-bl-lg" : ""}`}
                    >
                      {user.point}pt
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
