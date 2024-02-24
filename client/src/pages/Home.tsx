import Map from "@/components/Map";

const Home = () => {
  return (
    <div
      className="w-screen"
      style={{
        backgroundImage: "url(/town-neo.png)",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        <div>
          <div className="h-screen w-screen flex justify-center items-center">
            <Map />
          </div>
          <div className="absolute bottom-0 ">
            <div className="fixed bottom-16 right-0 py-5 px-0">
              <a href="/rank">
                <img src="trophy.png" width={100} height={100} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
