import "./App.scss";
import MapView from "./components/MapView";

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Call Before You Dig</h1>
      <p>Kampala excavation coordination</p>
      <MapView />
    </div>
  );
}

export default App;
