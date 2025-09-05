"use client";
import { useEffect, useState } from "react";
import { fromAddress, setDefaults } from "react-geocode";
const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(28.439229);
  const [lng, setLng] = useState(77.040039);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  return <div>Property Map to be displayed here</div>;
};

export default PropertyMap;
