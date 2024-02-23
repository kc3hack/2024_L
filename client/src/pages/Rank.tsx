const Rank = () => {
    const gradientProgressBarStyle = {
        width: '85%', // (現在値/全体値)×100 ％で指定してねー
        backgroundImage: 'linear-gradient(to right, #ff5623, #d3ff42)',
    };

    return (
        <div className="w-screen flex justify-center items-center" style={{ backgroundImage: "url(/home_bg2.png)", backgroundSize: 'cover', width: '100%', height: '100vh', backgroundPosition: 'center' }}>
            <div className="font-black font-mono text-center mt-1/4">
                <div className="text-2xl items-center animate-tracking-in-expand">
                    あなたのランクは・・・
                </div>
                <div className="text-4xl items-center animate-text-flicker-in-glow text-yellow-500">
                    ブロンズ
                </div>
                <div className="flex justify-center items-center mt-8 animate-text-focus-in">
                    <img src="trophy.png" alt="Trophy" className="w-32 h-32"></img>
                </div>
                あつめた関西ポイント：1000pt

                <div className="example" style={{ border: '1px solid #333', background: '#999', width: '200px', margin: '10px auto 0' }}>
                    <div style={{ height: '15px', ...gradientProgressBarStyle }}></div>
                </div>
            </div>
        </div>
    );
};

export default Rank;
