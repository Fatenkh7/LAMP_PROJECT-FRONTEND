import React,{useState} from "react";
import "./style.css";
import LoginImage from "../../images/auth-v2-login-illustration-light.png";
import LoginImage2 from "../../images/login-page-image-2.png";

import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
 
  const [login , setlogin]=useState({
    username:'',
    password:'',
})

const handleloginChange = (e) => {
  const value = e.target.value;
  setlogin({
    ...login,
    [e.target.name]: value,
  });
};

 async function handelSubmit(e){
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      username: login.username,
      password: login.password
    });

    const token = response.data.access_token
    ;
    console.log(response)
    // Set the token in the cookies
    Cookies.set('token', token    );
    
    axios.create({

      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    console.log(token)
    // Redirect the user to the dashboard page

    if (token) {window.location.href = 'http://localhost:3000/dashboard'};
    
  } catch (error) {
    console.log(error);
  }

}
console.log(login)


  return (
    <div className="login-page">
      <div className="login-animated-background">
        <svg
          className="login-page-svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0"
          y="0"
          preserveAspectRatio="xMidYMax slice"
          viewBox="0 0 1600 900"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="bg">
              <stop offset="0%" stopColor="#3d0066"></stop>
              <stop offset="50%" stopColor="#3d0066"></stop>
              <stop offset="100%" stopColor="#3d0066"></stop>
            </linearGradient>
            <path
              id="wave"
              fill="url(#bg)"
              d="M-363.852 502.589s236.988-41.997 505.475 0 371.981 38.998 575.971 0 293.985-39.278 505.474 5.859 493.475 48.368 716.963-4.995v560.106H-363.852v-560.97z"
            ></path>
          </defs>
          <use opacity="0.3" xlinkHref="#wave">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              calcMode="spline"
              dur="10s"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              keyTimes="0; .5; 1"
              repeatCount="indefinite"
              type="translate"
              values="270 230; -334 180; 270 230"
            ></animateTransform>
          </use>
          <use opacity="0.6" xlinkHref="#wave">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              calcMode="spline"
              dur="8s"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              keyTimes="0; .6; 1"
              repeatCount="indefinite"
              type="translate"
              values="-270 230;243 220;-270 230"
            ></animateTransform>
          </use>
          <use xlinkHref="#wave">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              calcMode="spline"
              dur="6s"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              keyTimes="0; .4; 1"
              repeatCount="indefinite"
              type="translate"
              values="0 230;-140 200;0 230"
            ></animateTransform>
          </use>
        </svg>
      </div>
      <div className="login-image-logo">
        <div className="login-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 512 512"
          >
            <defs>
              <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
              <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
              <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
            </defs>
            <g
              fill="#3d0066"
              fill-rule="evenodd"
              stroke="none"
              stroke-width="1"
            >
              <path
                fill="url(#BG1)"
                d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
              ></path>
              <path
                fill="url(#BG2)"
                d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
              ></path>
              <path
                fill="url(#BG3)"
                d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
              ></path>
            </g>
          </svg>
        </div>
        <div className="image">
          <div className="login-image">
            <img src={LoginImage2} width="100%" height="100%" />
          </div>
        </div>
      </div>
      <div className="login-form">
        <div
          className="login-form-logo"
          style={{
            margin: 0,
            // marginRight: "auto",
            width: "75%",
            height: "75px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="100%"
            height="100%"
            viewBox="0 0 512 512"
          >
            <defs>
              <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
              <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
              <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#3d0066"></stop>
                <stop offset="100%" stopColor="#3d0066"></stop>
              </linearGradient>
            </defs>
            <g
              fill="#3d0066"
              fill-rule="evenodd"
              stroke="none"
              stroke-width="1"
            >
              <path
                fill="url(#BG1)"
                d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
              ></path>
              <path
                fill="url(#BG2)"
                d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
              ></path>
              <path
                fill="url(#BG3)"
                d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
              ></path>
            </g>
          </svg>
        </div>
        <div className="login-form-title">
          <h2>Welcome To Our Dashboard!</h2>
          <p>Please sign-in to your account and start the adventure</p>
        </div>
        <form className="login-form-design" onClick={handelSubmit} >
          <div className="login-username">
            <input type="text" placeholder="Username" value={login.username} name="username" onChange={handleloginChange} />
          </div>
          <div className="login-password">
            <input type="password" placeholder="Password" value={login.password} name="password"  onChange={handleloginChange}/>
          </div>
          <div className="login-form-btn">
            <button type="submit" >Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;