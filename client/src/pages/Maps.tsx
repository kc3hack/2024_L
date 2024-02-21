import React, { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";



const Maps = () => {
    const API = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const mapId = `${process.env.REACT_APP_GOOGLE_MAPS_ID}`;


    const containerStyle = {
        width: '90%',
        height: '80%'
    };

    const center = {
        lat: 34.841928,
        lng: 135.705585
    };

    const locations = [
        { lat: 34.841928, lng: 135.705585, description: "尾花研へようこそ", isreached: true },
        { lat: -34.390, lng: 150.650, description: "オーストラリア", isreached: false },
        // 他の地点
    ];

    const [open, setOpen] = useState(Array(locations.length).fill(false));
    const changeOpenState = (index: number) => {
        const newOpenState = [...open];
        newOpenState[index] = !newOpenState[index];
        setOpen(newOpenState);
    };

    const [selected, setSelected] = useState("all");
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => setSelected((event.target as HTMLInputElement).value);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <APIProvider apiKey={API}>
                <Map defaultCenter={center} mapId={mapId} style={containerStyle} defaultZoom={18} >
                    {locations.map((location, index) => {
                        if (selected === "all" || !location.isreached) {
                            return (
                                <AdvancedMarker key={index} position={location} onClick={() => changeOpenState(index)}>
                                    <Pin background={"blue"} borderColor={"white"} glyphColor={"white"} />
                                    {open[index] && <InfoWindow key={index} position={location} onCloseClick={() => changeOpenState(index)}>
                                        {location.description}
                                    </InfoWindow>}
                                </AdvancedMarker>
                            );
                        }
                    })}
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