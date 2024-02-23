import React, {useEffect, useState} from "react";
import {Radio, RadioGroup, FormControlLabel} from "@mui/material";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow,} from "@vis.gl/react-google-maps"
import axios from "axios";
import {useAPIUserData} from "@/providers/APIUserData";
import {GOOGLE_MAP_ID, GOOGLE_MAP_KEY, API_URL} from "@/config";

//axiosのインスタンスを作成
const api = axios.create({
    baseURL: API_URL,
});

const containerStyle = {
    width: '90%',
    height: '60vh'
};

type SelectedOption = "all" | "notreached";


type BaseMarker = {
    latitude: number,
    longitude: number,
};

type Marker = BaseMarker & {
    id: number,
    name: string,
    address: string,
    point: number,
    description?: string,
};

type CurrentPosition = BaseMarker;

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

    const [userMarkers, setUserMarkers] = useState<Marker[]>([]);
    const [selectedMarkers, setSelectedMarkers] = useState<Marker[]>([]);
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiUser = useAPIUserData();
    const [selected, setSelected] = useState<SelectedOption>("all");

    const buildLatLng = (position: BaseMarker): google.maps.LatLngLiteral => {
        return {lat: position.latitude, lng: position.longitude};
    };

    // マーカーを取得
    useEffect(() => {
        getMarkers().then((markers) => {
            setMarkers(markers);
            setSelectedMarkers(markers);
            setIsLoading(false);
        });
    }, []);

    const [currentPosition, setcurrentPosition] = useState<CurrentPosition>({
        latitude: 34.841928,
        longitude: 135.705585
    });

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
                    <Map defaultCenter={buildLatLng(currentPosition)} mapId={GOOGLE_MAP_ID} style={containerStyle}
                         defaultZoom={18}>
                        <MarkerComponent marker={currentPosition} draggable={true} background="black" scale={2}/>
                        {selectedMarkers.map((marker, index) => (
                            <MarkerComponent key={index} marker={marker} background="blue"/>
                        ))}
                    </Map>
                </APIProvider>}
                <MarkerFilter selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    );
};

type MarkerComponentProps = {
    marker: Marker | CurrentPosition,
    background: string,
    scale?: number,
    draggable?: boolean,
};
const MarkerComponent: React.FC<MarkerComponentProps> = ({marker, background, draggable = false, scale}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleDrag = (e: google.maps.MapMouseEvent) => {
        if (!draggable || e.latLng === null) {
            return;
        }
        marker.latitude = e.latLng.lat();
        marker.longitude = e.latLng.lng();
    };

    return (
        <AdvancedMarker position={{lat: marker.latitude, lng: marker.longitude}} draggable={draggable}
                        onDrag={handleDrag}
                        onClick={() => setIsOpen(!isOpen)}
        >
            <Pin background={background} borderColor={"white"} glyphColor={"white"} scale={scale}/>
            {isOpen && <InfoWindow position={{lat: marker.latitude, lng: marker.longitude}}
                                   onCloseClick={() => setIsOpen(!isOpen)}
            >
                <div className="leading-loose bg-transparent">
                    {
                        "name" in marker && "description" in marker && "point" in marker ?
                            <div>
                                <p>{marker.name}</p>
                                <p>{marker.description}</p>
                                <p className="underline shadow-lg">
                                    {marker.point}ポイント
                                </p>
                            </div>
                            : <div>
                                {marker.latitude}, {marker.longitude}
                            </div>
                    }
                </div>
            </InfoWindow>}
        </AdvancedMarker>
    );
};


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