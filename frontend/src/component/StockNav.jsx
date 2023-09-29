import React from 'react'
import nseData from './NseData.json'
import nseStockImg from "./NseDataImage.json"
export default function Stock(props){
      // nseData.data.forEach(e=>{
      //   var z =  e.symbol
      //   console.log(z)
      //   console.log(nseStockImg[z])
      // })
     
    return(
    <>
    <div className="stockNavBar" id='stockNavBar'>
    <marquee className="Stock-present"  behavior="scroll" direction={props.direction}>
        <div className='main-Stock-present'>
          {props.heatmap.data.map(function(stock,i){
            // const color = (parseFloat(stock.change)<0)?{color:"red"}:{color:'green'}
            let color = {color:'red'};
            let aero = 'down'
            if (parseFloat(stock.change)>0){
              color = {color:"rgb(1, 248, 1)"};
              aero = 'up';
            }
            
            
            return(<div className="stocks" key={i}>
            <div className="stocklogo"><img src={process.env.PUBLIC_URL+`/stock/${nseStockImg[stock.symbol]}`} /></div>
            <div className="stockName"> {stock.symbol} </div>
            <div className="dot">.</div>
            <div className="stockPrice"> {stock.lastPrice} </div>
            <div className="price-change" style={color}>{stock.change}</div>
            <div className="price-percent"style={color}>({stock.pChange}%  <i className={`fa-solid fa-arrow-${aero}`}></i>)</div>
            <div className="stock-end"></div>
        </div>)
          })}
        
        </div>
    </marquee>
    </div>
    </>       
    );
}
