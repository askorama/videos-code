import { useGeolocation } from "@uidotdev/usehooks";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";

import { create, insertMultiple, search, Result } from "@orama/orama";
import data from "./data.json";
import { Document } from "./types";
import { createCoordinatesFromBounds } from "./utils";

const trainsAndSubway = [
  "Thameslink",
  "Bakerloo",
  "Southeastern",
  "Northern",
  "Southern",
  "Jubilee",
  "Circle",
  "District",
  "Elizabeth line",
  "Hammersmith & City",
  "Greater Anglia",
  "London Overground",
  "Metropolitan",
  "Central",
  "c2c",
  "Victoria",
  "East Midlands Railway",
  "First Hull Trains",
  "London North Eastern Railway",
  "Grand Central",
  "Great Northern",
  "Lumo",
  "Piccadilly",
];

const db = await create({
  schema: {
    Stop_Name: "string",
    location: "geopoint",
  },
});

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
  const [busStations, setBusStations] = useState({});
  const getStops = async (polygon) => {
    await insertMultiple(db, data as unknown as never[]);
    const stops = await search(db, {
      term: "",
      limit: 50,
      where: {
        location: {
          polygon,
          inside: true,
        },
      },
    });
    // const stops = await client.search({
    //   term: "",
    //   limit: 50,
    //   where: searchWhere,
    // });
    setStops(stops.hits);
  };

  const getStationInfo = async (code: number) => {
    const data = await fetch(
      `https://api.tfl.gov.uk/StopPoint/Sms/${code}`
    ).then((rsp) => rsp.json());
    setBusStations((stations) => ({
      ...stations,
      [code]: data,
    }));
  };

  return (
    <>
      {stops.length &&
        stops.map((stop) => (
          <Marker
            key={stop.document.Bus_Stop_Code}
            position={[stop.document.location.lat, stop.document.location.lon]}
            eventHandlers={{
              click: (e) => getStationInfo(stop.document.Bus_Stop_Code),
            }}
          >
            <Popup>
              {busStations[stop.document.Bus_Stop_Code] ? (
                <>
                  <h2 className="font-bold mb-4 text-lg">
                    {busStations[stop.document.Bus_Stop_Code].commonName}
                  </h2>
                  <h3 className="mb-2">Lines:</h3>
                  <ul className="flex gap-2 flex-wrap">
                    {busStations[stop.document.Bus_Stop_Code].lines
                      .filter((l) => !trainsAndSubway.includes(l.name))
                      .map((line) => (
                        <li
                          className={[
                            `text-white p-2 rounded-full w-12 text-center h-12 border-4 flex items-center font-bold justify-center`,
                            line.name.includes("N")
                              ? "border-[#A2BADD]"
                              : "border-[#FF251B]",
                          ].join(" ")}
                        >
                          <a
                            href={`https://tfl.gov.uk/bus/route/${line.name}/`}
                            target="_blank"
                            className="text-white"
                          >
                            {line.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                "loading"
              )}
            </Popup>
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
