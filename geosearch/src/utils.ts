import { OramaClient } from "@oramacloud/client";

export const client = new OramaClient({
  endpoint: "https://cloud.orama.run/v1/indexes/busstopslondon-g27ndc",
  api_key: "9bxpdZvGe6m3bvKnLlyhjCwBm2BG2Daq",
});

export const createCoordinatesFromBounds = (bounds: any) => [
  { lon: bounds._northEast.lng, lat: bounds._northEast.lat },
  { lon: bounds._northEast.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._northEast.lat },
];
