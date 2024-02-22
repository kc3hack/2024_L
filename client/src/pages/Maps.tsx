import React, { Suspense, useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { API_URL } from '../config';
import axios from "axios";

const api = axios.create({
    baseURL: API_URL
});


const Maps = () => {
    const API = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const mapId = `${process.env.REACT_APP_GOOGLE_MAPS_ID}`;
    const [locations, setLocations] = useState<{
        id: number,
        name: string,
        description: string,
        latitude: number,
        longitude: number,
        created_at: string,
        update_at: string,
        address: string,
        point: number,
    }[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const containerStyle = {
        width: '90%',
        height: '60vh'
    };

    const center = {
        lat: 34.841928,
        lng: 135.705585
    };

    useEffect(() => {
        const apiGet = async () => {
            const responce = await api.get('/api/v1/markers');
            const locations_api = responce.data.data.markers;
            setLocations(locations_api);
        };
        apiGet();
        setIsLoading(false);
    }, []);



    const [open, setOpen] = useState(Array(locations.length).fill(false));
    const changeOpenState = (index: number) => {
        const newOpenState = [...open];
        newOpenState[index] = !newOpenState[index];
        setOpen(newOpenState);
    };

    const [selected, setSelected] = useState("all");
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected((event.target as HTMLInputElement).value);

    return (
        <div className="w-screen" style={{ backgroundImage: "url(/home_bg1.png)", backgroundSize: 'cover', width: '100%', height: '100vh', backgroundPosition: 'center' }}>
            <div className="flex flex-col items-center justify-center h-screen">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <APIProvider apiKey={API}>
                        <Map defaultCenter={center} mapId={mapId} style={containerStyle} defaultZoom={18} >
                            {Array.isArray(locations) && locations.map((location, index) => {
                                const lat = location.latitude;
                                const lng = location.longitude;
                                return (
                                    <AdvancedMarker key={index} position={{ lat, lng }} onClick={() => changeOpenState(index)}>
                                        <Pin background={"blue"} borderColor={"white"} glyphColor={"white"} />
                                        {open[index] && <InfoWindow key={index} position={{ lat, lng }} onCloseClick={() => changeOpenState(index)}>
                                            <div className="leading-loose bg-transparent">
                                                {location.name}
                                                {location.description}
                                                <p className="underline shadow-lg">
                                                    {location.point}ポイント
                                                </p>
                                            </div>
                                        </InfoWindow>}
                                    </AdvancedMarker>
                                );

                            })}
                        </Map>
                    </APIProvider>
                )}


                <div className="form-check">
                    <RadioGroup defaultValue={"all"} onChange={changeValue}>
                        <FormControlLabel value={"all"} control={<Radio />} label="すべて表示" />
                        <FormControlLabel value={"notreached"} control={<Radio />} label="未到達のみ表示" />
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
};
export default Maps;