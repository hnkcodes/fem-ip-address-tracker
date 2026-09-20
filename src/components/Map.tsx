import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

import iconLocation from "../assets/icon-location.svg";

interface MapProp {
  lat: number;
  lng: number;
}

const coloredIcon = L.icon({
  iconUrl: iconLocation,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

function SetMap({ lat, lng }: MapProp) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);

  const mapKey = import.meta.env.VITE_CARTO_API_KEY;

  return (
    <>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${mapKey}`}
      />
      <Marker position={[lat, lng]} icon={coloredIcon} />
    </>
  );
}

export default function Map({ lat, lng }: MapProp) {
  return (
    <section>
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        scrollWheelZoom={false}
        id="map"
      >
        <SetMap lat={lat} lng={lng} />
      </MapContainer>
    </section>
  );
}
