import axios from "axios";
import jwt_decode from "jwt-decode";
import { ENDPOINTS } from "../constants/endpoints";

// const isTokenExpired = () => {
//   console.log("isTokenExpired");
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return true; 
//   }

//   const tokenExpiration = jwt_decode(token).exp;
//   console.log("tokenExpiration is ");
//   console.log(tokenExpiration);
//   const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
//   console.log("currentTime is ");
//   console.log(currentTime);

//   const expirationTime = tokenExpiration - currentTime;
//   const expirationThreshold = 7200;

//   console.log("expirationTime is ");
//   console.log(expirationTime);

//   if (expirationTime < expirationThreshold) {
//     localStorage.removeItem("token");

//     window.location.href = "/login";

//     return true;
//   }

//   return false;
// };


// Obtener archivos por polígono 
export const getFilesByPolygon = async (geojson) => {
  console.log("getFilesByPolygon");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES + ENDPOINTS.POLYGON,
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

// Obtener archivos por texto 
export const getFilesByText = async (params) => {
  console.log("getFilesByText");
  console.log("params are ");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        nombre: params.searchValue,
        extension: params.fileExtension,
        institucion: params.institution,
        fecha_incio: params.startDate,
        fecha_fin: params.endDate,
      },
    };

    console.log(params.searchValue);
    const response = await axios.get(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES,
      config
    );

    console.log("getFilesByText response is ");
    console.log(Object.values(response.data));

    return Object.values(response.data);
  } catch (error) {
    console.log("Error en getFilesByText");
    console.error(error);
    throw error;
  }
};

// Descargar archivos 
export const downloadFiles = async (files) => {
  console.log("downloadFiles");
  console.log("the files are ");
  console.log(files);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES + ENDPOINTS.DOWNLOAD,
      { files: files },
      config
    );
    console.log("el statuso es" + response.status);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "archivos.zip");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log("Error en downloadFiles");
    console.error(error);
    throw error;
  }
};

// Subir archivos 
export const uploadFiles = async (files) => {
  console.log("uploadFiles");
  console.log("the files are ");
  console.log(files);

  const userToken = localStorage.getItem("token");

  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES,
      formData,
      config
    );

    console.log("uploadFiles response is ");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en uploadFiles");
    console.error(error.response.data);
    throw error;
  }
};

// Editar archivos
export const editFile = async (fileId, file) => {
  console.log(localStorage.getItem("token"));
  console.log("EditFile");
  console.log("the file is ");
  console.log(file);

  const userToken = localStorage.getItem("token");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.patch(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES + `/${fileId}`,
      file,
      config
    );

    console.log("editFile response is ");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en editFile");
    console.error(error.response.data);
    throw error;
  }
};

// Eliminar archivos
export const deleteFile = async (fileId) => {
  console.log("deleteFile");
  console.log("the fileId is ");
  console.log(fileId);

  const userToken = localStorage.getItem("token");


  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.delete(
      ENDPOINTS.BASE_URL + ENDPOINTS.FILES + `/${fileId}`,
      config
    );

    console.log("deleteFile response is ");
    console.log(response.data);

    if (response.status === 204) {
      return true;
    }

    return response.data;
  } catch (error) {
    console.log("Error en deleteFile");
    console.error(error.response.data);
    throw error;
  }
};

// Manejar inicio de sesión
export const handleLogin = async (email, password, navigate) => {
  console.log("handleLogin");
  console.log("email is ");
  console.log(email);
  console.log("password is ");
  console.log(password);
  try {
    const config = {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded; charset=UTF-8;application/json",
      },
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.TOKEN,
      {
        username: email,
        password: password,
      },
      config
    );
    console.log("handleLogin response is ");
    console.log(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    navigate("/admin");
  } catch (error) {
    throw error;
  }
};

// Crear institución
export const createInstitution = async (institution) => {
  console.log("createInstitution");
  console.log("the institution is ");
  console.log(institution);

  const userToken = localStorage.getItem("token");
  

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.post(
      ENDPOINTS.BASE_URL + ENDPOINTS.INSTITUTIONS,
      institution,
      config
    );

    console.log("createInstitution response is ");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en createInstitution");
    console.error(error.response.data);
    throw error;
  }
};

// Obtener instituciones por texto
export const getInstitutionsByText = async (text) => {
  console.log("getInstitutionsByText");
  const userToken = localStorage.getItem("token");

  console.log("the text is ");
  console.log(text);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.get(
      ENDPOINTS.BASE_URL + ENDPOINTS.INSTITUTIONS + "/" + text,
      config
    );

    console.log("getInstitutionsByText response is ");
    console.log(Object.values(response.data));

    return Object.values(response.data);
  } catch (error) {
    console.log("Error en getInstitutionsByText");
    console.error(error);
    throw error;
  }
};

// Editar institución
export const editInstitution = async (institutionId, institution) => {
  console.log("editInstitution");
  console.log("the institution is ");
  console.log(institution);

  const userToken = localStorage.getItem("token");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.put(
      ENDPOINTS.BASE_URL + ENDPOINTS.INSTITUTIONS + `/${institutionId}`,
      institution,
      config
    );

    console.log("editInstitution response is ");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en editInstitution");
    console.error(error.response.data);
    throw error;
  }
};

// Eliminar institución
export const deleteInstitution = async (institutionId) => {
  console.log("deleteFile");
  console.log("the fileId is ");
  console.log(institutionId);

  const userToken = localStorage.getItem("token");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.delete(
      ENDPOINTS.BASE_URL + ENDPOINTS.INSTITUTIONS + `/${institutionId}`,
      config
    );

    console.log("deleteInstitution response is ");
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error en deleteInstitution");
    console.error(error.response.data);
    throw error;
  }
};
