import React, { useEffect, useState } from "react";
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
    const [currentPosition, setcurrentPosition] = useState({
        lat: 34.841928,
        lng: 135.705585
    });

    const containerStyle = {
        width: '90%',
        height: '60vh'
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
    const [openCp, setOpenCp] = useState(false);//現在地ピンの情報ウィンドウが開いてるかどうかの判定

    const changeOpenState = (index: number) => {
        const newOpenState = [...open];
        newOpenState[index] = !newOpenState[index];
        setOpen(newOpenState);
    };


    const [selected, setSelected] = useState("all");
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected((event.target as HTMLInputElement).value);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <APIProvider apiKey={API}>
                    <Map defaultCenter={currentPosition} mapId={mapId} style={containerStyle} defaultZoom={18} >
                        <AdvancedMarker position={currentPosition} draggable onClick={() => setOpenCp(true)} onDrag={
                            function(e){
                                const lat_t = e.latLng?.lat();
                                const lng_t = e.latLng?.lng();
                                if(typeof lat_t === "number" && typeof lng_t === "number"){
                                    setcurrentPosition({ ...currentPosition, lat: lat_t, lng: lng_t});
                                }
                        }}>
                            <Pin background={"black"} borderColor={"white"} scale={2} />
                            {openCp && <InfoWindow position={currentPosition} onCloseClick={() => setOpenCp(false)}>
                                <div className="leading-loose bg-transparent">
                                    {currentPosition.lat}, {currentPosition.lng}
                                </div>
                            </InfoWindow>}
                        </AdvancedMarker>
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
    );
};
export default Maps;