import { useAPIUserDataContext } from "@/providers/APIUserData";

const User = () => {
  const apiUserData = useAPIUserDataContext();

  return (
    <>
      <h1>ユーザーページ</h1>
      <p>ユーザー名: {apiUserData?.name}</p>
      <p>ポイント: {apiUserData?.point}</p>
    </>
  );
};

export default User;
