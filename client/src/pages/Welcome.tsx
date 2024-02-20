const Welcome = () => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">関西オデッセイ</h1>
            <h2 className="text-2xl font-bold mb-4">~KANSAI ODYSSAY~</h2>
            <div className="flex justify-center items-center"><img src="kansai.png"></img><br /></div>
            <br />
            <a href="/signup"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full">
                新規登録</button></a>
            <br />
            <br />
            <a href="/signin"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full">
                ログイン</button></a>
            <br />
        </div>
    );
};

export default Welcome;