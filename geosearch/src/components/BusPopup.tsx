import { Popup as PopupBase } from "react-leaflet";
import { BusState, Document } from "../types";
import { trainsAndSubway } from "../utils";

export const BusPopup = ({
  busStations,
  stop,
}: {
  busStations: BusState;
  stop: Document;
}) => {
  return (
    <PopupBase>
      {busStations[stop.Bus_Stop_Code] ? (
        <>
          <h2 className="font-bold mb-4 text-lg">
            {busStations[stop.Bus_Stop_Code].commonName}
          </h2>
          <h3 className="mb-2">Lines:</h3>
          <ul className="flex gap-2 flex-wrap">
            {busStations[stop.Bus_Stop_Code].lines
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
    </PopupBase>
  );
};
