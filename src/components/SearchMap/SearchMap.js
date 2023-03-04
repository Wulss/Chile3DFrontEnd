import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";
import { MultiPoint } from "ol/geom";
import { Button } from "@mui/material";
import axios from "axios";

import { fromLonLat } from "ol/proj";

function SearchMap(/* { dibujoHabilitado } */ { clearGeometry, setClearGeometry, onDrawEnd }) {
  const mapRef = useRef(null);
  //const [draw, setDraw] = useState(null);
  const [vSource, setVSource] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [files, setFiles] = useState([]);


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
    const vectorLayer = new VectorLayer({ source: vectorSource, style: geometryStyle });
    

    const map = new Map({
      target: mapRef.current,
      layers: [basemap, vectorLayer],
      controls: [],
      view: new View({
        center: fromLonLat([-70.65, -33.45]),
        zoom: 9,
      }),
    });

    const draw = new Draw({
      source: vectorSource,
      type: "Polygon",
    });
    //setDraw(draw);

    /* const fetchFiles = async (geojson) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/geojson",
        geojson
      );
      console.log(response.data["inside"]);
      setFiles(response.data["inside"]);
      //setFiles(response.data);
    }; */

    map.addInteraction(draw);
    draw.on("drawend", (e) => {
      console.log("drawend");
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords = geom.getCoordinates();
      console.log(coords);
      setCoordinates(e.feature.getGeometry().getCoordinates());
      coords.map((coord) => {
        console.log(coord);
        onDrawEnd(coord);
      });
      //setFiles(["Archivo LAZ 1, Archivo LAZ 2"]);

      /* var geojson = {
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
      geojson = JSON.stringify(geojson);

      fetchFiles(geojson);
 */
    });
  }, []);


  useEffect(() => {
    console.log("useEffect3");
    console.log(clearGeometry);
    if ((clearGeometry === true)) {
      vSource.clear();
      setClearGeometry(false);
    }},[clearGeometry, vSource]);

  return <div ref={mapRef} style={{ width: "100%", height: "93vh" }} />;
}

export default SearchMap;
