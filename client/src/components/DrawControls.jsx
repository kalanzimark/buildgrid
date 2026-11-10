import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { useAddDigMutation } from "../api/digApi";

export default function DrawControls() {
  const map = useMap();
  const [addDig] = useAddDigMutation();

  useEffect(() => {
    map.pm.addControls({
      position: "topleft",
      drawMarker: false,
      drawCircleMarker: false,
      drawCircle: false,
      drawRectangle: false,
      drawText: false,
      cutPolygon: false,
      rotateMode: false,
      dragMode: false,
      editMode: false,
      removalMode: false,
    });

    function handleCreate(e) {
      const feature = e.layer.toGeoJSON();
      addDig({
        purpose: "Temporary test dig",
        start: "2026-12-10",
        end: "2026-12-12",
        geometry: feature.geometry,
      });
      e.layer.remove();
      console.log("Drawn shape:", feature);
    }

    map.on("pm:create", handleCreate);

    return () => {
      map.off("pm:create", handleCreate);
      map.pm.removeControls();
    };
  }, [map, addDig]);

  return null;
}
