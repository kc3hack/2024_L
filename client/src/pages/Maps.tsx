import React, { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";



const Maps = () => {
    const API = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const mapId = `${process.env.REACT_APP_GOOGLE_MAPS_ID}`;
    const [open, setOpen] = useState(false);

    const containerStyle = {
        width: '90%',
        height: '90%'
    };

    const center = {
        lat: 34.841928,
        lng: 135.705585
    };

    const locations = [
        { lat: 34.841928, lng: 135.705585 },
        { lat: -34.390, lng: 150.650 },
        // 他の地点
    ];


    const [selected, setSelected] = useState("all");
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected((event.target as HTMLInputElement).value);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <APIProvider apiKey={API}>
                <Map defaultCenter={center} mapId={mapId} defaultZoom={18} >
                    <AdvancedMarker position={center} onClick={() => setOpen(true)} >
                        <Pin background={"blue"} borderColor={"white"} glyphColor={"white"} />
                    </AdvancedMarker>
                    {open && <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
                        尾花研へようこそ
                    </InfoWindow>}
                </Map>
            </APIProvider>


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