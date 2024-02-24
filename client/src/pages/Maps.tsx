import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, } from "@vis.gl/react-google-maps"
import axios from "axios";
import { useAPIUserDataContext } from "@/providers/APIUserData";
import { useFirstPosition } from "@/hooks/firstPosition";
import { GOOGLE_MAP_ID, GOOGLE_MAP_KEY, API_URL } from "@/config";

//axiosのインスタンスを作成
const api = axios.create({
  baseURL: API_URL,
});

const containerStyle = {
  width: "90%",
  height: "60vh",
};

type SelectedOption = "all" | "notreached";

type BaseMarker = {
  latitude: number;
  longitude: number;
};

type Marker = BaseMarker & {
  id: number;
  name: string;
  address: string;
  point: number;
  description?: string;
};

export type CurrentPosition = BaseMarker;

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
  const apiUser = useAPIUserDataContext();
  const [selected, setSelected] = useState<SelectedOption>("all");
  const { getFirstPosition } = useFirstPosition();
  const buildLatLng = (position: BaseMarker): google.maps.LatLngLiteral => {
    return { lat: position.latitude, lng: position.longitude };
  };

  const firstPosition = getFirstPosition();

  const [currentPosition, setCurrentPosition] = useState<CurrentPosition>({
    latitude: firstPosition.latitude,
    longitude: firstPosition.longitude,
  });
  const [zoom, setZoom] = useState<number>(firstPosition.defaultZoom);

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
    if (!apiUser.userData) return;
    getUserMarkers(apiUser.userData.id).then(setUserMarkers);
  }, [apiUser]);

  useEffect(() => {
    setSelectedMarkers(
      selected === "all"
        ? markers
        : markers.filter(
          (marker) =>
            !userMarkers.some((userMarker) => userMarker.id === marker.id)
        )
    );
  }, [selected, markers, userMarkers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="w-screen"
      style={{
        backgroundImage: "url(/home_bg2.png)",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        {GOOGLE_MAP_KEY && (
          <APIProvider apiKey={GOOGLE_MAP_KEY}>
            <Map
              defaultCenter={buildLatLng(currentPosition)}
              mapId={GOOGLE_MAP_ID}
              style={containerStyle}
              defaultZoom={zoom}
              onZoomChanged={(e) => setZoom(e.detail.zoom)}
            >
              <CurrentPositionComponent
                markers={selectedMarkers}
                currentPosition={currentPosition}
                setPosition={setCurrentPosition}
              />
              {selectedMarkers.map((marker, index) => {
                if (marker.point <= 10) {
                  return (
                    <MarkerComponent
                      key={index}
                      marker={marker}
                      background={"#ffc0cb"}
                    />
                  );
                } else if (marker.point <= 50) {
                  return (
                    <MarkerComponent
                      key={index}
                      marker={marker}
                      background={"#ff8c00"}
                    />
                  );
                } else if (marker.point <= 100) {
                  return (
                    <MarkerComponent
                      key={index}
                      marker={marker}
                      background={"#ff0000"}
                    />
                  );
                }
              })}
            </Map>
          </APIProvider>
        )}
        <MarkerFilter selected={selected} setSelected={setSelected} />
      </div>
    </div>
  );
};

type CurrentPositionComponentProps = {
  markers: Marker[],
  currentPosition: CurrentPosition,
  setPosition: React.Dispatch<React.SetStateAction<CurrentPosition>>;
};

const CurrentPositionComponent: React.FC<CurrentPositionComponentProps> = ({
  markers,
  currentPosition,
  setPosition
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localMarkers, setLocalMarkers] = useState(markers); // ローカル状態としてマーカーを管理
  const apiUser = useAPIUserDataContext();

  function getDistance(lat: number, lng: number) {
    const dLat = lat - currentPosition.latitude;
    const dLng = lng - currentPosition.longitude;
    return Math.sqrt(dLat * dLat + dLng * dLng);
  };

  const handleDrag = async (e: google.maps.MapMouseEvent) => { // asyncを追加
    if (e.latLng === null || !setPosition) {
      return;
    }
    const newPosition = { latitude: e.latLng.lat(), longitude: e.latLng.lng() };
    setPosition(newPosition);

    for (let marker of localMarkers) { // for...of ループを使用
      if (getDistance(marker.latitude, marker.longitude) < 0.01) {
        console.log("到達");
        // API呼び出し等の非同期処理
        let newPoint = 0;
        if (apiUser.userData?.point !== undefined) {
          newPoint = apiUser.userData.point + marker.point;
        }else{
          console.log("ポイントあらへんがな");
        }
        alert(`${marker.name}に到達しました！\n${marker.point}ポイント獲得しました！`);
        await api.post("/api/v1/user_marker_links", { user_marker_link: { user_id: apiUser.userData?.id, marker_id: marker.id } });
        await api.patch(`/api/v1/users/${apiUser.userData?.id}`, { user: { point: newPoint} });
        // マーカーを削除
        setLocalMarkers(current => current.filter(m => m.id !== marker.id));
        apiUser.fetchUserData();
      }
    }
  };

  return (
    <AdvancedMarker position={{ lat: currentPosition.latitude, lng: currentPosition.longitude }} draggable onClick={() => setIsOpen(!isOpen)}
      onDragEnd={handleDrag}>
      <Pin background={"black"} borderColor={"white"} glyphColor={"white"} scale={2} />
      {isOpen && <InfoWindow position={{ lat: currentPosition.latitude, lng: currentPosition.longitude }}
        onCloseClick={() => setIsOpen(!isOpen)}
      >
        <div className="leading-loose bg-transparent">
          <div>
            {currentPosition.latitude}, {currentPosition.longitude}
          </div>
        </div>
      </InfoWindow>}
    </AdvancedMarker>
  );
};


type MarkerComponentProps = {
  marker: Marker,
  background: string,
  scale?: number,
};

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  marker,
  background,
  scale
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdvancedMarker position={{ lat: marker.latitude, lng: marker.longitude }} onClick={() => setIsOpen(!isOpen)}>
      <Pin background={background} borderColor={"white"} glyphColor={"white"} scale={scale} />
      {isOpen && <InfoWindow position={{ lat: marker.latitude, lng: marker.longitude }}
        onCloseClick={() => setIsOpen(!isOpen)}>
        <div className="leading-loose bg-transparent">
          <div>
            <p>{marker.name}</p>
            <p>{marker.description}</p>
            <p className="underline shadow-lg">
              {marker.point}ポイント
            </p>
          </div>
        </div>
      </InfoWindow>}
    </AdvancedMarker>
  );
};

type MarkerFilterProps = {
  selected: SelectedOption;
  setSelected: React.Dispatch<React.SetStateAction<SelectedOption>>;
};

const MarkerFilter: React.FC<MarkerFilterProps> = ({ setSelected }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelected(event.target.value as SelectedOption);

  return (
    <div className="w-auto bg-white rounded-md shadow-lg p-auto">
      <div className="form-check">
        <RadioGroup defaultValue={"all"} onChange={handleChange}>
          <FormControlLabel
            value={"all"}
            control={<Radio />}
            label="すべて表示"
          />
          <FormControlLabel
            value={"notreached"}
            control={<Radio />}
            label="未到達のみ表示"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default Maps;
