import { useState } from "react";
import { postToServer } from "./requests";



var  socket = null ;
const makeConn =  async() =>{
    const res = await postToServer("communication/new-connection-req" ,  );
    console.log(res);
    const socket = new WebSocket(`ws://localhost:8000/ws/data?req_id=${res.data.req_id}&key=${res.data.one_time_key}`);
    socket.onopen = (event) => {
        console.log("Connection ok...");
        console.log(event);

    }
    socket.onmessage = (event) =>{
       
        console.log("Data Recieved");
        const live_data = JSON.parse(event.data)
        if (live_data.msg){
            console.log(live_data.msg)
        }
        // console.log(typeof event.data);
        else{
            console.log(live_data);
            window.setHeatMap(live_data);
        }

    }
    socket.onclose = (event) =>{
        console.log("Close Connection");
        console.log(event);
    }
    socket.onerror = (event) =>{
        console.log("error.......");
        console.log(event);
    }

} 

export {makeConn} ;