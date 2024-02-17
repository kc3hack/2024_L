const Welcome = () => {
    return (
      <center>
        <h1 className="text-2xl font-bold mb-4">関西オデッセイ</h1>
        <h2 className="text-2xl font-bold mb-4">~KANSAI ODYSSAY~</h2>
        <img src="https://cdn.discordapp.com/attachments/1160480504898928744/1207607180774088776/image.png?ex=65e042d4&is=65cdcdd4&hm=89549973a289a58df8fada640d0ebe77d202c362c121c5a8eef9c5bfc7c5284e&"></img><br />
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full">
          <a href="/signup">新規登録</a></button>
        <br />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full">
          <a href="/signin">ログイン</a></button>
        <br />
      </center>
    );
  };
  
  export default Welcome;