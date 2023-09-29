import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFromServer } from '../../scripts/requests'

export default function Navbar(props){
    const openMenu = () => {
        document.getElementById("Menu").classList.add("overlay--active")
    }
    const closeMenu = () => {
        document.getElementById("Menu").classList.remove("overlay--active")
    }
    const getHeatMap = async() =>{
        const data = await getFromServer("heat-map");
        console.log("Fetched Data...");
     }
  
    useEffect( () => {
        const nav = document.getElementById('navbar-scroll')
    window.onscroll = function() {
        var scrollPosition = parseInt(window.pageYOffset || document.documentElement.scrollTop);
        // console.log("Scroll position:", scrollPosition);
        if (scrollPosition > 45){
            nav.style.background = '#220c52'
            nav.style.boxShadow = 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }
        else{
            nav.style.backgroundColor = 'transparent'
            nav.style.boxShadow = "none"
        }
    }
     } , [] )
    
    return(
        <div className='checkIsLogin' id='navbar-scroll'>
            <header>
                <a className="logo" href="/"><img src="images/logo.svg" alt="logo" /></a>
                <nav>
                    <ul className="nav__links">
                        <li onClick={getHeatMap}><Link to="#">Services</Link></li>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </nav>
                {props.isLogin ? <Link className="cta" > Acc </Link>  :<Link className="cta" to="/login">Login</Link>}
                
            
                <p className="menu cta" onClick={openMenu}>Menu</p>
            </header>
            <div className="overlay" id='Menu' onClick={closeMenu}>
                <a className="close">&times;</a>
                <div className="overlay__content">
                    <a href="#">Services</a>
                    <a href="#">Projects</a>
                    <a href="#">About</a>
                </div>
            </div>
        </div>
    )
}