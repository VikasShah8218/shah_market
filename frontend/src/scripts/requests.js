import axios from "axios";
import { getUserAccessToken } from "./auth";
// const domain = "localhost:8000"
const domain = "shah-market-backend.techkingdom.in"
// import Cookies from "js-cookie";
window.baseURL = `http://${domain}/`

const handleDeniedResponse = () =>{
  
}

// --------------- get request ---------------
const getFromServer = async (urlPath) => {
  try {
    const res = await axios.get(`${window.baseURL}${urlPath}`);
    return { status: true, data: res.data };
  } 
  catch (error) {
    return { status: false, data: {} };
  }
};


const postToServer = async (urlPath, data = {}) => {
  
  try {
      const res = await axios.post(`${window.baseURL}${urlPath}`, data, {
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFToken": Cookies.get("csrftoken"),
          Authorization: `Token ${getUserAccessToken()}`,
        },
      });

      if (res.status == 403 || res.status == 401) {
        // return handleDeniedResponse();
        return { status: false, data: {} , msg:"Something Went Wrong"};
      } 

      else return { status: true, data: res.data.data  ,msg: res.data.msg };
    } 
  catch (error) {
    if (error.response.status == 403 || error.response.status == 401) {
      // return handleDeniedResponse();
      return { status: false, data: {} , msg:"Something Went Wrong"};
    } else return { status: false, data: {} , msg:"Something Went Wrong"};
  }
};




export {
  getFromServer,
  postToServer,
 domain,
};
