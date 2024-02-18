import axios from "axios";

type Geometry = {
    geometry : {
        coordinates: number[],
        type: string,
    },
    type: string,
    properties: {
        addressCode: string,
        title: string
    }
}

const getGeometry = async (address: string):Promise<Geometry[]> => {
    return axios.get(`https:////msearch.gsi.go.jp/address-search/AddressSearch?q=${address}`)
        .then((response) => {
            return response.data;
        })
}

type Coordinates = {
    latitude: number,
    longitude: number
};

export const getCoordinates = async (address: string):Promise<Coordinates> => {
    const geometries = await getGeometry(address);
    if (geometries.length !== 1) {
        alert("住所が見つかりませんでした");
        return { latitude: 0, longitude: 0 };
    };
    const [longitude, latitude] = geometries[0].geometry.coordinates;
    return {
        latitude: latitude,
        longitude: longitude
    };
}