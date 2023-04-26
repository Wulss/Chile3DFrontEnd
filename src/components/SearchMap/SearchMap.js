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
import { Button } from "@mui/material";
import axios from "axios";

import { fromLonLat } from "ol/proj";

import { getFilesByPolygon } from "../../services/api";
import { set } from "ol/transform";

function SearchMap(
  /* { dibujoHabilitado } */ { clearGeometry, setClearGeometry, onDrawEnd }
) {
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
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: geometryStyle,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [basemap, vectorLayer],
      controls: [],
      view: new View({
        center: fromLonLat([-70.65, -33.45]),
        zoom: 1,
      }),
    });

    const draw = new Draw({
      source: vectorSource,
      type: "Polygon",
    });
    //setDraw(draw);

    map.addInteraction(draw);
    draw.on("drawend", async (e) => {
      console.log("drawend");
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords = geom.getCoordinates();
      for (let i = 0; i < coords[0].length; i++) {
        coords[0][i] = transform(coords[0][i], "EPSG:3857", "EPSG:4326");
      }

      var geojson = {
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

      // Make a request to the API with the polygon coordinates
      try {
        var response = await getFilesByPolygon(JSON.stringify(geojson));
        setFiles(response);
        
        console.log("trying to get files by polygon");
      } catch (error) {
        // Handle the error
        console.log("Error getting files by polygon");
        console.error(error);
      }      

      setCoordinates(e.feature.getGeometry().getCoordinates());
    });
  }, []);

  useEffect(() => {
    //console.log("files is " + files);
    onDrawEnd(files);
  }, [files]);

  useEffect(() => {
    console.log("useEffect3");
    console.log(clearGeometry);
    if (clearGeometry === true) {
      vSource.clear();
      setClearGeometry(false);
    }
  }, [clearGeometry, vSource]);

  return <div ref={mapRef} style={{ width: "100%", height: "93vh" }} />;
}

export default SearchMap;
