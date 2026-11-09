import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetAssetsQuery, useGetDigsQuery } from "../api/digApi";
import DrawControls from "./DrawControls";

const KAMPALA = [0.3136, 32.5811];
const ASSET_COLOURS = {
  water_main: "#1f78d1",
  power_cable: "#d62828",
  fibre_duct: "#7b2cbf",
};

function assetStyle(feature) {
  const colour = ASSET_COLOURS[feature.properties.type] || "#555";
  return {
    color: colour,
    weight: 4,
    dashArray: feature.properties.accuracy === "approximate" ? "8 6" : null,
  };
}

function digStyle(feature) {
  const approved = feature.properties.status === "approved";
  return {
    color: approved ? "#2a9d8f" : "#d9822b",
    weight: 3,
    fillOpacity: 0.25,
  };
}

function assetPoint(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 7,
    color: "#1d2b2a",
    fillColor: "#f4f1ea",
    fillOpacity: 1,
    weight: 3,
  });
}

function assetPopup(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(
    `<strong>${p.type}</strong><br>
     Owner: ${p.owner}<br>
     Depth: ${p.depth_m} m<br>
     Accuracy: ${p.accuracy}`,
  );
}

function digPopup(feature, layer) {
  const p = feature.properties;
  layer.bindPopup(
    `<strong>${p.purpose}</strong><br>
  ${p.start.slice(0, 10)} to ${p.end.slice(0, 10)}<br> 
     Status: ${p.status}`,
  );
}
export default function MapView() {
  const {
    data: assets,
    error: assetsError,
    fulfilledTimeStamp: assetsTime,
  } = useGetAssetsQuery();
  const {
    data: digs,
    error: digsError,
    fulfilledTimeStamp: digsTime,
  } = useGetDigsQuery();
  return (
    <>
      {(assetsError || digsError) && (
        <p>Could not load map data. Is the API running?</p>
      )}

      <MapContainer center={KAMPALA} zoom={15} className="map">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <DrawControls />

        {assets && (
          <GeoJSON
            key={assetsTime}
            data={assets}
            style={assetStyle}
            pointToLayer={assetPoint}
            onEachFeature={assetPopup}
          />
        )}
        {digs && (
          <GeoJSON
            key={digsTime}
            data={digs}
            style={digStyle}
            onEachFeature={digPopup}
          />
        )}
      </MapContainer>

      <ul className="legend">
        <li>
          <span className="legend__swatch legend__swatch--water" /> Water main
        </li>
        <li>
          <span className="legend__swatch legend__swatch--power" /> Power cable
        </li>
        <li>
          <span className="legend__swatch legend__swatch--fibre" /> Fibre duct
        </li>
        <li>
          <span className="legend__swatch legend__swatch--dig" /> Dig / road
          works
        </li>
        <li>Dashed line = approximate location</li>
      </ul>
    </>
  );
}
