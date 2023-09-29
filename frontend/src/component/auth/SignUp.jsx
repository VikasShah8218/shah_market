import React , { useRef } from 'react'
import { Link , useNavigate  } from 'react-router-dom';
import {getFromServer ,postToServer} from '../../scripts/requests'
import { setUserAccessToken ,  } from '../../scripts/auth';

const Login = (props) => {
    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const phone = useRef();
    const navigate = useNavigate();
    const test = async() => {
        const data = {
            username: userName.current.value,
            password: password.current.value,
            email: email.current.value,
            phone: phone.current.value,
        }
        const res  = await postToServer("account/signup",data);
        if (res.status){
            navigate("/login");
        }
    }
    
    return(
        <>
            <div className="login-box">
                <div className="logo">Mr.Shah</div>
                    <div className="details">
                        {/* <form action="" onSubmit={test}> */}
                            <div className='form' >
                                
                                <label htmlFor="username"><i className="fa-solid fa-user"></i>User Name</label>
                                <input type="text" id="username" required ref={userName}  name="username" placeholder="Type Your Email" />
                                <div className="area"></div>

                                <label htmlFor="email"><i className="fa-solid fa-user"></i>Email</label>
                                <input type="email" id="email" required ref={email} name="Email" placeholder="Type Your Email" />
                                <div className="area"></div>
                                
                                <label htmlFor="phone"><i className="fa-solid fa-user"></i>Phone</label>
                                <input type="phone" id="phone"  required ref={phone} name="phone" placeholder="Type Your Phone" />
                                <div className="area"></div>
                                
                                <label htmlFor="lname"><i className="fa-solid fa-lock"></i> Password</label>
                                <input type="password" id="lname" required ref={password} name="password" placeholder="Your Password" />
                                <div className="area"></div>
                                
                                <button type="submit" onClick={test} > <i className="fa-solid fa-right-to-bracket"></i> Sign Up </button>
                            </div>
                        {/* </form> */}
                    </div>
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

