const Rank = () => {
    return (
        <div className="text-center">
            <div>
                <div className="h-screen w-screen flex justify-center items-center">
                    <img src="trophy.png"></img>
                </div>
                <div className="absolute bottom-0 ">
                    <div className="fixed bottom-16 right-0 py-5 px-0">
                        <img src="trophy.png" width={100} height={100} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rank;