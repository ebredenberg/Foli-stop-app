export interface StopData {
    sys: string;
    status: string;
    servertime: number;
    result: BusData[];
}

export interface BusData {
    "recordedattime": number,
    "lineref": string,
    "dataframeref": string,
    "datedvehiclejourneyref": string,
    "directionname": string,
    "originref": string,
    "destinationref": string,
    "originaimeddeparturetime": number,
    "destinationaimedarrivaltime": number,
    "monitored": boolean,
    "incongestion": boolean,
    "longitude": number,
    "latitude": number,
    "delay": number,
    "blockref": string,
    "vehicleref": string,
    "visitnumber": number,
    "vehicleatstop": false,
    "destinationdisplay": string,
    "aimedarrivaltime": number,
    "expectedarrivaltime": number,
    "aimeddeparturetime": number,
    "expecteddeparturetime": number,
    "destinationdisplay_sv": string,
    "destinationdisplay_en": string,
    "__tripref": string,
    "__routeref": string,
    "__directionid": string
}

