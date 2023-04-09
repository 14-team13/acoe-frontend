import React, { useEffect } from 'react';
import { useLocation, Navigate } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();

  const getUrlParameter = (name: string) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  useEffect(() => {
    (async () => {
      const token = getUrlParameter('token');
      const error = getUrlParameter('error');

      if (token) {
        localStorage.setItem('accessToken', token);
        console.log(token)
        console.log(location)
        window.open('/', '_self');
        //return <Navigate to="/" state={{ from: location }} />;
      } else {
        //return <Navigate to="/login" state={{ from: location, error: error }}/>;
        window.open('/login', '_self');
      }
      
    })()
  }, [])

  return <></>
}


export  default SignUp;
