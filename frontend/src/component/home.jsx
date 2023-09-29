import React, { useEffect, useState } from 'react'
import img2 from '../img/features1.jpg'
import img7 from '../img/img7.png'
import { Link } from 'react-router-dom'
import { logout } from '../scripts/auth'
import nseData from './NseData.json'
// import live from './test.json'
import nseStockImg from "./NseDataImage.json"
import { wait } from "@testing-library/user-event/dist/utils";
import { getFromServer } from '../scripts/requests'

const Home = (props) => {  
    // const [liveData, setLiveData] = useState(live);
    // const getNiftyData = async() =>{
    //     console.log("Fetching.....");
    //     const data = await getFromServer("heat-map");
    //     setLiveData(data.data) ;
    //     console.log("OK");

    // }
    // setInterval(getNiftyData, 2000); 
    const logout_user = () =>{
        logout(props.setIsLogin)
    }
   

   
    return(
       <>
       <section className='home-section-01'>
        <div className='front-page'>
                <div className="section1">
                    <div className='quot' >DON'T BE SORRY BE BETTER</div>

                    <div className="stock_Text">
                        Indian Stock Market and Financials
                    </div>
                    <div className="my-button" onClick={logout_user}>
                        Logout 
                    </div>
                    <div className="index_list">
                        <div className="index">
                            <h1>Nifty</h1>
                            <p>LTP 19517.52</p>
                            <div className='change'>
                                <p> <span>-135.36  -0.70% <i className="fa-solid fa-arrow-down"></i> </span> </p>
                            </div>
                        </div>
                        <div className="index">
                            <h1>Sensex</h1>
                            <p>LTP 65,721.25</p>
                            <div className='change'>
                                <p>  <span>+480.57 +0.75% <i className="fa-solid fa-arrow-up"></i> </span> </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="section2">
                    <img src={img2} alt="" />
                </div>
        
        </div>
        <div className="relative-img">
            <img src={img7} alt="" />
        </div>
       </section>
       <section className='home-section-02'>
        <div className="head">
            <h1>Index Heat ❤️‍🔥 Map</h1>
            <div className="border"></div>
        </div>
        <div  className="heat-map">
        {/* {liveData.searchresult.response.map(function(stock,i){ */}
        {props.heatmap.data.map(function(stock,i){
                    let color = 'rgb(255, 6, 6)';
                    let border = '1px solid red';
                    let aero = 'down';
                    if (parseFloat(stock.change)>0){
                      color = "rgb(1, 248, 1)";
                      border = '1px solid green';
                      aero = 'up';
                    }
                return(
            <div key={i} className="stock" style={{border:border}} >
                <div className="stock-name"> <div className="stock-img"><img src={process.env.PUBLIC_URL+`/stock/${(nseStockImg[stock.symbol])}`} /></div> {(stock.symbol).length<=5?stock.symbol:(stock.symbol).slice(0,7)}</div>
                <div className="stock-price">LTP {stock.lastPrice}</div>
                <div className="stock-change" style={{color:color}}>{parseFloat(stock.change).toFixed(2)} ({stock.pChange}% <i className={`fa-solid fa-arrow-${aero}`}></i>    )</div>
             </div>)})}
    
         </div>
       </section>
       </>
    )
}

export default Home;