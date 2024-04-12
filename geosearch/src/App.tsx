import { useGeolocation } from "@uidotdev/usehooks";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { OramaClient } from "@oramacloud/client";
import { useState } from "react";

import { create, insertMultiple, search, Result } from "@orama/orama";
import data from "./data.json";
import { Document } from "./types";

const db = await create({
  schema: {
    Stop_Name: "string",
    location: "geopoint",
  },
});

const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/busstopslondon-g27ndc",
  api_key: "9bxpdZvGe6m3bvKnLlyhjCwBm2BG2Daq",
});

const createCoordinatesFromBounds = (bounds: any) => [
  { lon: bounds._northEast.lng, lat: bounds._northEast.lat },
  { lon: bounds._northEast.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._northEast.lat },
];

const Inside = ({ lat, lon }: { lat: number; lon: number }) => {
  useMapEvents({
    zoomend: (e) =>
      getStops({
        coordinates: createCoordinatesFromBounds(e.target.getBounds()),
      }),
    dragend: (e) =>
      getStops({
        coordinates: createCoordinatesFromBounds(e.target.getBounds()),
      }),
  });

  const [stops, setStops] = useState<Result<Document>[]>([]);

  const getStops = async (polygon) => {
    await insertMultiple(db, data as unknown as never[]);
    const searchWhere = {
      location: polygon
        ? {
            polygon,
            inside: true,
          }
        : {
            radius: {
              coordinates: {
                lat,
                lon,
              },
              unit: "m",
              value: 500,
              inside: true,
            },
          },
    };

    const stops = await search(db, {
      term: "",
      limit: 50,
      where: searchWhere,
    });
    // const stops = await client.search({
    //   term: "",
    //   limit: 50,
    //   where: searchWhere,
    // });
    console.log(stops.hits);
    fetch(
      `https://api.tfl.gov.uk/StopPoint/Sms/${stops.hits[0].document.Bus_Stop_Code}`
    )
      .then((rsp) => rsp.json())
      .then(console.log);
    setStops(stops.hits);
  };

  return (
    <>
      {stops.length &&
        stops.map((stop) => (
          <Marker
            key={stop.document.Bus_Stop_Code}
            position={[stop.document.location.lat, stop.document.location.lon]}
          >
            <Popup>{stop.document.Stop_Name}</Popup>
          </Marker>
        ))}
      <Marker position={[lat, lon]}>
        <Popup>You</Popup>
      </Marker>
    </>
  );
};
function App() {
  const state = useGeolocation();
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
        zoom={20}
        className="w-screen h-screen"
      >
        <TileLayer
          attribution="&copy; <a href='https://stadiamaps.com/' target='_blank'>Stadia Maps</a> &copy; <a href='https://openmaptiles.org/' target='_blank'>OpenMapTiles</a> &copy; <a href='https://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a>"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <Inside lat={state.latitude} lon={state.longitude} />
      </MapContainer>
    );
  }

  return null;
}

export default App;
