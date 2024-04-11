import { useGeolocation } from "@uidotdev/usehooks";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { OramaClient } from "@oramacloud/client";
import { useEffect, useState } from "react";

const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/busstopslondon-g27ndc",
  api_key: "9bxpdZvGe6m3bvKnLlyhjCwBm2BG2Daq",
});

function App() {
  const state = useGeolocation();
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (state.latitude && state.longitude) {
      client
        .search({
          term: "",
          where: {
            location: {
              radius: {
                coordinates: {
                  lat: state.latitude,
                  lon: state.longitude,
                },
                unit: "m",
                value: 1500,
                inside: true,
              },
            },
          },
        })
        .then((re) => setStops(re?.hits));
    }
  }, [state.latitude]);

  if (state.loading) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center bg-slate-950 text-white">
        <p className="text-center">
          loading... (you may need to enable permissions)
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center bg-slate-950 text-white">
        <p className="text-center">
          Enable permissions to access your location data
        </p>
      </div>
    );
  }

  if (state.latitude && state.longitude) {
    return (
      <MapContainer
        center={[state.latitude, state.longitude]}
        zoom={16}
        scrollWheelZoom={false}
        className="w-screen h-screen"
      >
        <TileLayer
          attribution="&copy; <a href='https://stadiamaps.com/' target='_blank'>Stadia Maps</a> &copy; <a href='https://openmaptiles.org/' target='_blank'>OpenMapTiles</a> &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {stops.length &&
          stops.map((stop) => (
            <Marker
              position={[
                stop.document.location.lat,
                stop.document.location.lon,
              ]}
            >
              <Popup>{stop.document.Stop_Name}</Popup>
            </Marker>
          ))}

        <Marker position={[state.latitude, state.longitude]}>
          <Popup>You</Popup>
        </Marker>
      </MapContainer>
    );
  }

  return null;
}

export default App;
