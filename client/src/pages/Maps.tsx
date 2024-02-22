import React, {useEffect, useState} from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps"
import {Radio, RadioGroup, FormControlLabel} from "@mui/material";
import axios from "axios";
import {useAPIUserData} from "@/providers/APIUserData";
import {GOOGLE_MAP_ID, GOOGLE_MAP_KEY, API_URL} from "../config";

//axiosのインスタンスを作成
const api = axios.create({
    baseURL: API_URL,
});

const containerStyle = {
    width: '90%',
    height: '60vh'
};

const center = {
    lat: 34.841928,
    lng: 135.705585
};

type Marker = {
    id: number,
    name: string,
    description: string,
    latitude: number,
    longitude: number,
    created_at: string,
    updated_at: string,
    address: string,
    point: number,
};

const getMarkers = async () => {
    const response = await api.get("/api/v1/markers");
    return response.data.data.markers;
};

const getUserMarkers = async (userId: number) => {
    const response = await api.get(`/api/v1/users/${userId}/markers`);
    return response.data.data.markers;
};

/**
 * マーカーを取得
 */
const Maps = () => {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [userMarkers, setUserMarkers] = useState<Marker[]>([]);
    const [selectedMarkers, setSelectedMarkers] = useState<Marker[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiUser = useAPIUserData();
    const [selected, setSelected] = useState<"all" | "notreached">("all");

    // マーカーを取得
    useEffect(() => {
        getMarkers().then((markers) => {
            setMarkers(markers);
            setSelectedMarkers(markers);
            setIsLoading(false);
        });
    }, []);

    //ユーザが取得済みのマーカーを取得
    useEffect(() => {
        if (!apiUser) return;
        getUserMarkers(apiUser.id).then(setUserMarkers);
    }, [apiUser]);

    useEffect(() => {
        setSelectedMarkers(selected === "all"
            ? markers
            : markers.filter(marker => !userMarkers.some(userMarker => userMarker.id === marker.id))
        );
    }, [selected, markers, userMarkers]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-screen" style={{
            backgroundImage: "url(/home_bg.jpg)",
            backgroundSize: 'cover',
            width: '100%',
            height: '100vh',
            backgroundPosition: 'center'
        }}>
            <div className="flex flex-col items-center justify-center h-screen">
                {GOOGLE_MAP_KEY && <APIProvider apiKey={GOOGLE_MAP_KEY}>
                    <Map defaultCenter={center} mapId={GOOGLE_MAP_ID} style={containerStyle} defaultZoom={18}>
                        {selectedMarkers.map((marker, index) => (
                            <MarkerComponent key={index} marker={marker}/>
                        ))}
                    </Map>
                </APIProvider>}
                <MarkerFilter selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    );
};

type MarkerComponentProps = { marker: Marker };
const MarkerComponent: React.FC<MarkerComponentProps> = ({marker}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AdvancedMarker position={{lat: marker.latitude, lng: marker.longitude}} onClick={() => setIsOpen(!isOpen)}>
            <Pin background={"blue"} borderColor={"white"} glyphColor={"white"}/>
            {isOpen && <InfoWindow position={{lat: marker.latitude, lng: marker.longitude}}
                                   onCloseClick={() => setIsOpen(!isOpen)}>
                <div className="leading-loose bg-transparent">
                    <p>{marker.name}</p>
                    <p>{marker.description}</p>
                    <p className="underline shadow-lg">
                        {marker.point}ポイント
                    </p>
                </div>
            </InfoWindow>}
        </AdvancedMarker>
    );
};

type SelectedOption = "all" | "notreached";

type MarkerFilterProps = {
    selected: SelectedOption;
    setSelected: React.Dispatch<React.SetStateAction<SelectedOption>>;
};
const MarkerFilter: React.FC<MarkerFilterProps> = ({setSelected}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelected(event.target.value as SelectedOption);

    return (
        <div className="form-check">
            <RadioGroup defaultValue={"all"} onChange={handleChange}>
                <FormControlLabel value={"all"} control={<Radio/>} label="すべて表示"/>
                <FormControlLabel value={"notreached"} control={<Radio/>} label="未到達のみ表示"/>
            </RadioGroup>
        </div>
    );
};

export default Maps;