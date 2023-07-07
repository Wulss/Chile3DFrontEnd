/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";
import { MultiPoint } from "ol/geom";
import { getFilesByPolygon } from "../../services/api";
import TextField from "@mui/material/TextField";

const SearchMap = ({
  clearGeometry,
  setClearGeometry,
  onDrawEnd,
  onFinishDrawing,
}) => {
  const mapRef = useRef(null);
  const [vSource, setVSource] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [files, setFiles] = useState([]);
  const [mouseCoordinates, setMouseCoordinates] = useState(null);

  // Formatea las coordenadas para mostrarlas en el TextField
  const formatCoordinates = (coordinates) => {
    if (coordinates && coordinates.length === 2) {
      const lonLat = transform(coordinates, "EPSG:3857", "EPSG:4326");
      const lon = lonLat[0].toFixed(6);
      const lat = lonLat[1].toFixed(6);
      return `${lat}, ${lon}`;
    }
    return "";
  };

  // Maneja el cambio de pestaña al finalizar el dibujo
  const handleTabChanging = () => {
    onFinishDrawing();
  };

  // Configuración inicial del mapa y la interacción de dibujo
  useLayoutEffect(() => {
    const geometryStyle = [
      new Style({
        stroke: new Stroke({
          color: "#3388FF",
          width: 5,
        }),
        fill: new Fill({
          color: "rgba(51, 136, 255, 0.2)",
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({
            color: "white",
          }),
          stroke: new Stroke({
            color: "#0072ff",
            width: 4,
          }),
        }),
        geometry: function (feature) {
          const coordinates = feature.getGeometry().getCoordinates()[0];
          return new MultiPoint(coordinates);
        },
      }),
    ];

    const basemap = new TileLayer({
      source: new OSM(),
    });

    const vectorSource = new VectorSource({
      wrapX: false,
    });

    setVSource(vectorSource);

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: geometryStyle,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [basemap, vectorLayer],
      controls: [],
      view: new View({
        center: transform([-70.6506, -33.4372], "EPSG:4326", "EPSG:3857"),
        zoom: 6,
      }),
    });

    const draw = new Draw({
      source: vectorSource,
      type: "Polygon",
    });

    // Maneja el evento de mover el puntero del mouse y muestra las coordenadas correspondientes
    map.on("pointermove", (e) => {
      const [x, y] = map.getEventPixel(e.originalEvent);
      const coordinates = map.getCoordinateFromPixel([x, y]);
      setMouseCoordinates(coordinates);
    });

    map.addInteraction(draw);

    // Maneja el evento de finalizar el dibujo del polígono
    draw.on("drawend", async (e) => {
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords = geom.getCoordinates();
      for (let i = 0; i < coords[0].length; i++) {
        coords[0][i] = transform(coords[0][i], "EPSG:3857", "EPSG:4326");
      }

      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              coordinates: coords,
            },
          },
        ],
      };

      // Obtiene los archivos que intersectan con el polígono dibujado
      try {
        const response = await getFilesByPolygon(JSON.stringify(geojson));
        setFiles(response);
        handleTabChanging();
      } catch (error) {
        console.log("Error getting files by polygon");
        console.error(error);
      }

      setCoordinates(e.feature.getGeometry().getCoordinates());
    });
  }, []);

  useEffect(() => {
    onDrawEnd(files);
  }, [files, onDrawEnd]);

  useEffect(() => {
    if (clearGeometry === true) {
      vSource.clear();
      setClearGeometry(false);
    }
  }, [clearGeometry, setClearGeometry, vSource]);

  return (
    <div style={{ position: "relative", width: "100%", height: "93vh" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", bottom: 10, right: 10}}>
        <TextField
          label="Coordenadas"
          value={mouseCoordinates ? formatCoordinates(mouseCoordinates) : ""}
          variant="outlined"
          sx={{ backgroundColor: "white", width: "18vw", maxWidth: "200px"}}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </div>
  );
};

export default SearchMap;