import React, { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLoadScript } from "@react-google-maps/api";


const Maps = () => {
    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const containerStyle = {
        width: '500px',
        height: '500px'
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

    return (
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
      );
};
export default Maps;