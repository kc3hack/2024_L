import Routing from "./Routing";

function App() {

  return (
    <div className="App">
      <div className="md:container mx-auto mx-8 my-8">
        <Routing />
        <a href="/" className="text-sky-500 hover:text-sky-600">HOME</a><br />
      </div>
    </div>
  );
}

export default App;
