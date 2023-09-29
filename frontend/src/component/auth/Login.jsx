import React , { useRef } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import {getFromServer ,postToServer} from '../../scripts/requests'
import { setUserAccessToken ,  } from '../../scripts/auth';

const Login = (props) => {
    const userName = useRef();
    const password = useRef();
    const navigateToHome = useNavigate();

    const loginHandel = async() =>{
        
        const data = {username: userName.current.value, password: password.current.value,}
        const res = await postToServer("account/login",data);
        if (res.status){
            setUserAccessToken(res.data.token);
            props.setIsLogin(true);
            navigateToHome("/")
        }
    }
    return(
        <>
        <div className="login-box">
            <div className="logo">Mr.Shah</div>
                <div className="details">
                    <div className='form' >
                        
                        <label for="fname"><i className="fa-solid fa-user"></i> User ID</label>
                        <input type="text" id="fname"  ref={userName} name="userid" placeholder="Type your username" />
                        <div className="area"></div>
                        
                        <label for="lname"><i className="fa-solid fa-lock"></i> Password</label>
                        <input type="password" id="lname" ref={password} name="password" placeholder="Your Password" />
                        <div className="area"></div>
                        <button type="button" onClick={loginHandel}> <i className="fa-solid fa-right-to-bracket"></i> Login </button>
                    </div>
                </div>
                <Link to="/signup"><div className="forgot" >Sign Up</div></Link> 
                <div className="extra">
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-linkedin"></i>
                <div className="text">You can connect with us</div>

            </div>
        </div>  
        </>
    )
}
export default Login

