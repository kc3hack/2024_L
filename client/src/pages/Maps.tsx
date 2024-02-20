import React, { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLoadScript } from "@react-google-maps/api";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";


const Maps = () => {
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const containerStyle = {
        width: '90%',
        height: '90%'
    };

    const center = {
        lat: -34.397,
        lng: 150.644
    };

    const locations = [
        { lat: -34.397, lng: 150.644 },
        { lat: -34.390, lng: 150.650 },
        // 他の地点
    ];

    const [selected, setSelected] = useState("all");
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected((event.target as HTMLInputElement).value);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <LoadScript
                googleMapsApiKey={apiKey} // ここにAPIキーを設定
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {locations.map((location, index) => (
                        <Marker key={index} position={location} />
                    ))}
                </GoogleMap>
            </LoadScript>

            <div className="form-check">
                <RadioGroup defaultValue={"all"} onChange={changeValue}>
                    <FormControlLabel value={"all"} control={<Radio />} label="すべて表示" />
                    <FormControlLabel value={"onlyopen"} control={<Radio />} label="営業中のみ表示" />
                    <FormControlLabel value={"notreached"} control={<Radio />} label="未到達のみ表示" />
                </RadioGroup>
            </div>
        </div>
    );
};
export default Maps;