import React, { useLayoutEffect } from 'react';
import { useEffect, useState } from 'react';
import acoeImg from 'images/acoe.svg';
import googleImg from 'images/google.svg';
import kakaoImg from 'images/kakao.svg';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { loginsuccess, logout } from '@api/main';
import MyInfo from '@pages/components/MyInfo';



const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [showLogin, setShowLogin] = useState(false); 
  const [showMyPage, setShowMyPage]= useState(false);

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

  const KAKAO_AUTH_URL = 'http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect'
  const GOOGLE_AUTH_URL = 'http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect'

  const startAcoe = () => {
    setShowLogin(true);
  }

  const startMypage = () => {
    setShowMyPage(!showMyPage)
  }

  const loginKakao = () => {
    //window.location.assign(KAKAO_AUTH_URL);
    setShowLogin(false);
    setIsLogin(true)
  }

  const loginGoogle = () => {
    //window.location.assign(GOOGLE_AUTH_URL);
    setShowLogin(false);
    setIsLogin(true)
  }

  useLayoutEffect(() => {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   setIsLogin(true)
    // } else {
    //   setIsLogin(false)
    // }
  }, [])

  const closeLogin = () => {
    setShowLogin(false);
  }

  return (
    <div className='App'>
      <div>
        <div>
          {isLogin ? (
            <div>
              <div className="user fw700 fs16 lh30" onClick={startMypage}>
                <div>USER</div>
              </div>
            </div>
          ) : (
            <div className="acoe-start fw700 fs16 lh30 on" onClick={startAcoe}>
              <div>텀블러 여정 시작하기</div>
            </div>
          )}
        </div>
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </React.Suspense>
        </div>
      </div>
      {showMyPage?  <MyInfo/>: null }
      {showLogin ? (
        <div className="login-modal">
          <div className="login-box">
            <div className="login-close" onClick={closeLogin}>&times;</div>
            <img className="acoe-image" src={acoeImg} />
            <div className="fw700 fs20 mgt10 lh24">내 주변 텀블러 할인 금액</div>
            <div className="fw700 fs20 mgb15 lh24">ACOE에서 찾아보세요!</div>
            <div className="login-button kakao" onClick={loginKakao}>
              <img src={kakaoImg} />
              <div className="fw500 fs16 lh36 mgl15">카카오로 시작하기</div>
            </div>
            <div className="login-button google" onClick={loginGoogle}>
              <img src={googleImg} />
              <div className="fw500 fs16 lh36 mgl15">Google로 시작하기</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
