const Welcome = () => {
    return (
        <div className="text-center">
            <div className="flex justify-center items-center animate-text-focus-in">
                <img src="KansaiOdyssey.png" /><br />
            </div>
            <br />
            <a href="/signup">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full animate-tracking-in-expand-fwd-top">
                    新規登録
                </button>
            </a>
            <br />
            <br />
            <a href="/signin">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full animate-tracking-in-expand-fwd-top">
                    ログイン
                </button>
            </a>
            <br />
        </div>
    );
};

export default Welcome;