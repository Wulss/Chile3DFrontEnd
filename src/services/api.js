import axios from "axios";
import { ObjectEvent } from "ol/Object";
import { ENDPOINTS } from "../constants/endpoints";

export const getFilesByPolygon = async (geojson) => {
  console.log("getFilesByPolygon");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.BUSQUEDA_POLIGONO,
      geojson,
      config
    );

    console.log("getFilesByPolygon response is ");
    console.log(Object.values(response.data));

    return Object.values(response.data);
  } catch (error) {
    console.log("Error en getFilesByPolygon");
    console.error(error);
    throw error; 
  }
};