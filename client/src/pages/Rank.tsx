const Rank = () => {
    return (
        <div className="font-black font-mono text-center">
            <div className="text-2xl items-center animate-tracking-in-expand">
                あなたのランクは・・・
            </div>
            <div className="text-4xl items-center animate-text-flicker-in-glow">
                ブロンズ
            </div>
            <div>
                <div className="h-screen w-screen flex justify-center items-center">
                    <img src="trophy.png"></img>
                </div>
            </div>
        </div>
    );
};

export default Rank;