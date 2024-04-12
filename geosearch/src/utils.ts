import L from "leaflet";

export const createCoordinatesFromBounds = (bounds: any) => [
  { lon: bounds._northEast.lng, lat: bounds._northEast.lat },
  { lon: bounds._northEast.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._southWest.lat },
  { lon: bounds._southWest.lng, lat: bounds._northEast.lat },
];

export const trainsAndSubway = [
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

export const iconBus = new L.Icon({
  iconUrl: "/bus-stop.svg",
  iconSize: new L.Point(105, 75),
});

export const iconPerson = new L.Icon({
  iconUrl: "/person.svg",
  iconSize: new L.Point(105, 75),
});
