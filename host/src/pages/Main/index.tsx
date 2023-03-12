import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userState } from "../../store/atoms";


const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const Menu = React.lazy(() =>
    // @ts-ignore
    import("remote/Menu").then((module) => {
      return { default: module.Menu };
    })
  );
  
  useEffect(() => {
    (async() => {
        const {data} = await axios.get("/login/success");
        try{
        if(data){
          setIsLogin(true);
          setUser({email : data.email, username : data.username});
        }
      }catch(error){
        console.log(error);
      }
    })();
  }, []);

  useEffect(()=> {
    console.log(user);
  },[user])
  

  const logout = () => {
    axios({
      url: "/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/login", "_self");
      }
    });
  };

  return (
    <div className="App">
      <div> 여기가 Host </div>
      <div> AOCE </div>
      {/* <p>Name: {user.email}</p>
      <p>Age: {user.username}</p> */}
      <div>
        {isLogin && <div>
          <button onClick={logout} className="loginButton">
            Logout
          </button>
        </div>}
        {!isLogin &&
          <div>
            <a href="/signup">회원가입</a>
            <a href="/login">로그인</a>
          </div>
        }
      </div>
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Menu />
        </React.Suspense>
      </div>
    </div>
  );
};

export default Main;