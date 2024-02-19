import React, { useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Maps = () => {
    const auth = getAuth();
    const html = `<iframe width="90%" height="450" style="border:0" Load="lazy" allowfullscreen
    src="https://www.google.com/maps/embed/v1/place?q=大阪工業大学枚方キャンパス&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"></iframe>`;
    
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
};
export default Maps;