import React from 'react';
import { useEffect, useState } from 'react';
import acoeImg from 'images/acoe.svg';
import googleImg from 'images/google.svg';
import kakaoImg from 'images/kakao.svg';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { loginsuccess, logout } from '@api/main';



const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [showLogin, setShowLogin] = useState(false);

  const Menu = React.lazy(() =>
    // @ts-ignore
    import('remote/Menu').then((module) => {
      return { default: module.Menu };
    })
  );

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await loginsuccess();
  //     try {
  //       if (data) {
  //         setIsLogin(true);
  //         setUser({ email: data.email, username: data.username });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [setUser]);

  // const logoutPage = async () => {
  //   const data = await logout();
  //   if (data.status === 200) {
  //     window.open('/login', '_self');
  //   }
  // };

  const startAcoe = () => {
    console.log("startACOE")
    setShowLogin(true);
  }

  const startMypage = () => {
    console.log("startMypage")
  }

  const loginKakao = () => {
    
  }

  const loginGoogle = () => {

  }

  return (
    <div className='App'>
      <div>
        <div>
          {isLogin ? (
            <div className="discount" onClick={startMypage}>
              <span>YERANG</span>
            </div>
          ) : (
            <div className="acoe-start" onClick={startAcoe}><span>텀블러 여정 시작하기</span></div>
          )}
        </div>
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </React.Suspense>
        </div>
      </div>
      {showLogin ? (
        <div className="login-modal">
          <div className = "login-box">
            <img src={acoeImg}/>
            <button className = "login-button kakao" onClick = {loginKakao}><img src={kakaoImg}/>카카오로 시작하기</button>
            <button className = "login-button google" onClick = {loginGoogle}> <img src={googleImg}/>구글로 시작하기</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
