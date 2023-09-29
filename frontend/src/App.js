// import logo from './logo.svg';

import './Css/Stock.css'
import './Css/button.css'
import './Css/home.css'
import './Css/heatMap.css'

import Nav from './component/ui/Nav'
import Home from './component/home'
import StockNav from './component/StockNav';
import Login from './component/auth/Login';
import SignUp from './component/auth/SignUp';


import {BrowserRouter as Router, Routes,Switch, Route, Link} from "react-router-dom";
import { useEffect, useState } from 'react'
import { initiateAuth } from './scripts/auth'
import { getFromServer } from './scripts/requests'
// import {getNiftyData} from  "./scripts/globle" 
import {makeConn} from './scripts/ws'
import live from './component/test.json'

var firstLoad = true ; 

function App() {
  
  const [isLogin, setIsLogin] = useState(false);
  const [heatMap, setHeatMap] = useState(live);

   useEffect(() => {
    initiateAuth(setIsLogin);
    if (firstLoad){
    firstLoad = false
    makeConn();
    window.setHeatMap = setHeatMap;
    }
   },[])
  
  return (
    <>
    <Router>
    <Nav isLogin = {isLogin} />
    <StockNav  heatmap = {heatMap} direction="right"/>
      <Routes>
          <Route path="/login"  element={<Login  setIsLogin = {setIsLogin} />}></Route>
          <Route path="/signup" element={<SignUp/>} ></Route>
          <Route path="/" element={<Home  setIsLogin = {setIsLogin}  heatmap = {heatMap} />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
