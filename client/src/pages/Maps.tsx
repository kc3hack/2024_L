import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
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
    if (!apiUser) return;
    getUserMarkers(apiUser.id).then(setUserMarkers);
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
        backgroundImage: "url(/home_bg.jpg)",
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
              <MarkerComponent
                marker={currentPosition}
                draggable={true}
                background={"black"}
                scale={2}
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

type MarkerComponentProps = {
  marker: Marker | CurrentPosition;
  background: string;
  scale?: number;
  draggable?: boolean;
  setPosition?: React.Dispatch<React.SetStateAction<CurrentPosition>>;
  zoom?: number;
};

const MarkerComponent: React.FC<MarkerComponentProps> = ({
  marker,
  background,
  scale,
  draggable = false,
  setPosition,
  zoom,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setFirstPosition } = useFirstPosition();
  const handleDrag = (e: google.maps.MapMouseEvent) => {
    if (!draggable || e.latLng === null || !setPosition) {
      return;
    }
    marker.latitude = e.latLng.lat();
    marker.longitude = e.latLng.lng();
    setPosition({ latitude: marker.latitude, longitude: marker.longitude });
    setFirstPosition({
      latitude: marker.latitude,
      longitude: marker.longitude,
      defaultZoom: zoom,
    });
  };

  return (
    <AdvancedMarker
      position={{ lat: marker.latitude, lng: marker.longitude }}
      draggable={draggable}
      onDragEnd={handleDrag}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Pin
        background={background}
        borderColor={"white"}
        glyphColor={"white"}
        scale={scale}
      />
      {isOpen && (
        <InfoWindow
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onCloseClick={() => setIsOpen(!isOpen)}
        >
          <div className="leading-loose bg-transparent">
            {"name" in marker &&
            "description" in marker &&
            "point" in marker ? (
              <div>
                <p>{marker.name}</p>
                <p>{marker.description}</p>
                <p className="underline shadow-lg">{marker.point}ポイント</p>
              </div>
            ) : (
              <div>
                {marker.latitude}, {marker.longitude}
              </div>
            )}
          </div>
        </InfoWindow>
      )}
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
