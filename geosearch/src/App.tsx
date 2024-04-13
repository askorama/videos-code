import { MapContainer, TileLayer } from "react-leaflet";
import { Markers } from "./components/Markers";

const LOCATION = [51.493, -0.098];

function App() {
  return (
    <MapContainer
      center={{
        lat: LOCATION[0],
        lng: LOCATION[1],
      }}
      zoom={20}
      minZoom={16}
      zoomControl={false}
      className="w-screen h-screen"
    >
      <TileLayer
        attribution="<a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>"
        url="http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      />
      <Markers lat={LOCATION[0]} lon={LOCATION[1]} />
    </MapContainer>
  );
}

export default App;
