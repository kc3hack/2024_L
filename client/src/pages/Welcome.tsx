const Welcome = () => {
    return (
        <div className="w-screen" style={{ backgroundImage: "url(/background.png)", backgroundSize: 'cover', width:'100%', height:'100vh', backgroundPosition:'center'}}>
            <div className="text-center absolute top-1/4 w-full" >
                <div className="flex justify-center items-center animate-text-focus-in">
                    <img src="KansaiOdyssey.png" /><br />
                </div>
                <br />
                <a href="/signup">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full animate-tracking-in-expand-fwd-top">
                        新規登録
                    </button>
                </a>
                <br />
                <br />
                <a href="/signin">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full animate-tracking-in-expand-fwd-top">
                        ログイン
                    </button>
                </a>
                <br />
            </div>
        </div>
    );
};

export default Welcome;