import { useState, useEffect } from "react";
import { useAPIUserDataContext } from "@/providers/APIUserData";

const Rank = () => {
  const userData = useAPIUserDataContext();
  const [gradesPoint, setGradesPoint] = useState(0); // 初期値は0
  const [gradesName, setGradesName] = useState("Bronze"); // 初期値はBronze

  useEffect(() => {
    if (userData.userData) {
      if (userData.userData.point < 100) {
        setGradesName("Bronze");
        setGradesPoint(100);
      } else if (
        100 <= userData.userData.point &&
        userData.userData.point < 200
      ) {
        setGradesName("Silver");
        setGradesPoint(200);
      } else if (
        200 <= userData.userData.point &&
        userData.userData.point < 300
      ) {
        setGradesName("Gold");
        setGradesPoint(300);
      } else {
        setGradesName("Master");
        setGradesPoint(userData.userData.point);
      }
    }
  }, [userData]); // userData.pointが変更されたら再実行

  if (!userData.userData) return <div>loading...</div>;

  const gradientProgressBarStyle = {
    width: `${(userData.userData.point / gradesPoint) * 100}%`,
    backgroundImage: "linear-gradient(to right, #ff5623, #d3ff42)",
  };

  return (
    <div
      className="w-screen flex justify-center items-center"
      style={{
        backgroundImage: "url(/town.png)",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <div className="font-black font-mono text-center mt-1/4">
        <div className="text-2xl items-center animate-tracking-in-expand">
          あなたのランクは・・・
        </div>
        <div className="text-4xl items-center animate-text-flicker-in-glow text-yellow-500">
          {gradesName}
        </div>
        <div className="flex justify-center items-center mt-8 animate-text-focus-in">
          <img src="trophy.png" alt="Trophy" className="w-32 h-32"></img>
        </div>
        あつめた関西ポイント：{userData.userData.point}pt/{gradesPoint}pt
        <div
          className="example"
          style={{
            border: "1px solid #333",
            background: "#999",
            width: "200px",
            margin: "10px auto 0",
          }}
        >
          <div style={{ height: "15px", ...gradientProgressBarStyle }}></div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
