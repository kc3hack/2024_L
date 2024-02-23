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
      <h1>Ranking</h1>
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Point</th>
        </tr>
        {ranking.map((user: any, index: number) => (
          <tr key={user.id}>
            <td>{index + 1}位</td>
            <td>{user.name}</td>
            <td>{user.point}pt</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Ranking;
