import { Marker, Popup, useMapEvents } from "react-leaflet";
import {
  createCoordinatesFromBounds,
  iconBus,
  iconPerson,
  trainsAndSubway,
} from "../utils";
import { useState } from "react";

import { Document, TFLResult } from "../types";
import { Result } from "@orama/orama";
import { OramaClient } from "@oramacloud/client";

export const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/busstopslondon-g27ndc",
  api_key: "9bxpdZvGe6m3bvKnLlyhjCwBm2BG2Daq",
});

export const Markers = ({ lat, lon }: { lat: number; lon: number }) => {
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
  const [busStations, setBusStations] = useState<{ [name: string]: TFLResult }>(
    {}
  );
  const getStops = async (polygon: {
    coordinates: { lat: number; lon: number }[];
  }) => {
    const stops = await client.search({
      term: "",
      limit: 50,
      where: {
        location: {
          polygon,
        },
      },
    });
    setStops(stops?.hits || []);
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
            icon={iconBus}
            key={stop.document.Bus_Stop_Code}
            position={[stop.document.location.lat, stop.document.location.lon]}
            eventHandlers={{
              click: () => getStationInfo(stop.document.Bus_Stop_Code),
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
      <Marker position={[lat, lon]} icon={iconPerson}>
        <Popup>You</Popup>
      </Marker>
    </>
  );
};
