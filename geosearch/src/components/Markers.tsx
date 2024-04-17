import { Marker, useMapEvents } from "react-leaflet";
import { createCoordinatesFromBounds, iconBus, iconPerson } from "../utils";
import { useState } from "react";

import { BusState, Document, Polygon } from "../types";
import { Result } from "@orama/orama";
import { BusPopup } from "./BusPopup";

export const Markers = ({ lat, lon }: { lat: number; lon: number }) => {
  const [stops, setStops] = useState<Result<Document>[]>([]);
  const [busStations, setBusStations] = useState<BusState>({});

  useMapEvents({
    zoomend: (e) =>
      console.log({
        coordinates: createCoordinatesFromBounds(e.target.getBounds()),
      }),
    dragend: (e) =>
      console.log({
        coordinates: createCoordinatesFromBounds(e.target.getBounds()),
      }),
  });

  const getStationInfo = async (code: number) => {
    const data = await getStationInfo(code);
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
            icon={iconBus}
            key={stop.document.Bus_Stop_Code}
            position={[stop.document.location.lat, stop.document.location.lon]}
            eventHandlers={{
              click: () => getStationInfo(stop.document.Bus_Stop_Code),
            }}
          >
            <BusPopup
              busStations={busStations}
              key={stop.document.Bus_Stop_Code}
              stop={stop.document}
            />
          </Marker>
        ))}
      <Marker position={[lat, lon]} icon={iconPerson} />
    </>
  );
};
