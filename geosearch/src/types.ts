export type Document = {
  Stop_Code_LBSL: number;
  Bus_Stop_Code: number;
  Naptan_Atco: string;
  Stop_Name: string;
  Location_Easting: number;
  Location_Northing: number;
  Heading: number;
  Stop_Area: number;
  Virtual_Bus_Stop: number;
  location: {
    lat: number;
    lon: number;
  };
};
