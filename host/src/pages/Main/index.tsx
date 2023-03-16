import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userState } from "../../store/atoms";
import { loginsuccess, logout } from "@api/main"

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
    (async () => {
      const { data } = await loginsuccess();
      try {
        if (data) {
          setIsLogin(true);
          setUser({ email: data.email, username: data.username });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  const logoutPage = async () => {
    const data = await logout();
    if (data.status === 200) {
      window.open("/login", "_self");
    }

  };

  return (
    <div className="App">
      <div> 여기가 Host </div>
      <div> AOCE </div>
      {/* <p>Name: {user.email}</p>
      <p>Age: {user.username}</p> */}
      <div>
        {isLogin && <div>
          <button onClick={logoutPage} className="loginButton">
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