import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ログイン処理
  const handleSignIn = async () => {
    // メールアドレスが入力されていない場合はアラートを表示
    if (email === "") {
      alert("メールアドレスを入力してください");
      return;
    }
    // パスワードが入力されていない場合はアラートを表示
    if (password === "") {
      alert("パスワードを入力してください");
      return;
    }
    const auth = getAuth();
    try {
      // ログイン処理
      await signInWithEmailAndPassword(auth, email, password);
      // ホーム画面(現状はウェルカムページ)に遷移
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-screen" style={{ backgroundImage: "url(/background.png)", backgroundSize: 'cover', width: '100%', height: '100vh', backgroundPosition: 'center' }}>
      <div className="items-center">
        <img src="KansaiOdyssey.png" alt="関西オデッセイ_ロゴ" style={{ width: '50%', height: '50%' }}/>
        <div className="flex items-center justify-center">
          <div className="w-72 bg-white rounded-md shadow-lg p-4">
            <form className="signIn">
              <fieldset>
                <div className="mb-10">
                  <div className="relative">
                    <input
                      className="w-full p-2 border rounded-md transition-colors duration-200 focus:outline-none bg-gray-200 focus:border-orange-500"
                      name="email"
                      type="email"
                      placeholder="メールアドレス"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-10">
                  <div className="relative">
                    <input
                      className="w-full p-2 border rounded-md transition-colors duration-200 focus:outline-none bg-gray-200 focus:border-orange-500"
                      name="password"
                      type="password"
                      placeholder="パスワード"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="submit block mx-auto my-5 bg-blue-500 text-white rounded-full w-40 h-10 text-1xl font-bold cursor-pointer transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange"
                    onClick={handleSignIn}
                  >
                    ログイン
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
