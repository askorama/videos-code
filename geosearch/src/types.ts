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

export interface TFLResult {
  $type: string;
  naptanId: string;
  modes: string[];
  icsCode: string;
  smsCode: string;
  stopType: string;
  stationNaptan: string;
  lines: Line[];
  lineGroup: LineGroup[];
  lineModeGroups: LineModeGroup[];
  status: boolean;
  id: string;
  commonName: string;
  placeType: string;
  additionalProperties: AdditionalProperty[];
  children: Children[];
  lat: number;
  lon: number;
}

export interface Line {
  $type: string;
  id: string;
  name: string;
  uri: string;
  type: string;
  crowding: Crowding;
  routeType: string;
  status: string;
}

export interface Crowding {
  $type: string;
}

export interface LineGroup {
  $type: string;
  naptanIdReference?: string;
  stationAtcoCode: string;
  lineIdentifier: string[];
}

export interface LineModeGroup {
  $type: string;
  modeName: string;
  lineIdentifier: string[];
}

export interface AdditionalProperty {
  $type: string;
  category: string;
  key: string;
  sourceSystemKey: string;
  value: string;
}

export interface Children {
  $type: string;
  naptanId: string;
  indicator?: string;
  stopLetter?: string;
  modes: string[];
  icsCode: string;
  stopType: string;
  stationNaptan: string;
  lines: Line[];
  lineGroup: LineGroup[];
  lineModeGroups: LineModeGroup[];
  status: boolean;
  id: string;
  commonName: string;
  placeType: string;
  additionalProperties: AdditionalProperty[];
  children: Children[];
  lat: number;
  lon: number;
}
