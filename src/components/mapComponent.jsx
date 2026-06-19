import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const ADDRESS = "Qala əyləncə parkı, Mərdəkan";
const POSITION = [40.464842, 50.119062];

const openMaps = () => {
  if (typeof window === "undefined") return;

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const destination = encodeURIComponent(ADDRESS);
  const mobileUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  const desktopUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;

  window.open(isMobile ? mobileUrl : desktopUrl, "_blank", "noopener,noreferrer");
};

const MapComponent = () => {
  return (
    <MapContainer
      center={POSITION}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={POSITION}>
        <Popup>
          <strong>Gala Cinema</strong>
          <br />
          <button
            type="button"
            onClick={openMaps}
            className="mt-1 text-left text-[#F03328] underline underline-offset-2"
          >
            {ADDRESS}
          </button>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
