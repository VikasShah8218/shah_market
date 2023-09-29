import { wait } from "@testing-library/user-event/dist/utils";
import { getFromServer } from "./requests";



const getNiftyData = async() =>{
    console.log("Fetching.....");
    const data = await getFromServer("heat-map");
    window.niftyData = data ;
    console.log("OK");

 }

setInterval(getNiftyData, 2000);

// getNiftyData();

export { getNiftyData  };
