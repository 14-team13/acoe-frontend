import React, { useLayoutEffect } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { loginsuccess, logout } from '@api/main';
import MyInfo from '@pages/components/MyInfo';
import { BrowserView, MobileView } from 'react-device-detect';
import AcoeLogin from '@pages/components/AcoeLogin';

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);

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
    setShowMobileLogin(false);
  }

  const mobileShowLogin = () => {
    setShowLogin(true);
  }

  const tryMobileLogin = () => {
    setShowMobileLogin(true);
    setShowLogin(false);
  }


  return (
    <>
      <MobileView>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Menu mobileShowLogin={mobileShowLogin} />
        </React.Suspense>
        {showLogin ? (
          <div className="bg-black">
            <div className="start-with-acoe">
              <div className="flex-row">
                <div className="flex-column">
                  <div className="flex-row fw700 fs16 lh24 "><div className="fc-primary">로그인 회원가입</div><div>하고</div></div>
                  <div className="fw700 fs16 lh24">한잔의 지구, ACOE 여정을 시작해보세요</div>
                  <div className="start-with-acoe-intro">
                    <div className="fw700 fs12 lh18">
                      <span>텀블러는 이산화탄소 발생량을 </span>
                      <span className="fc-primary">일회용 플라스틱 컵보다 33배,일회용 종이컵보다 18배</span>
                      <span>줄일 수 있어요!</span>
                    </div>
                  </div>
                </div>
                <div className="left" onClick={tryMobileLogin} />
              </div>
              <div className="divide" />
              <div className="">
                <div className="mgb8 fw400 fs12 lh18 fc-gray">이용약관</div>
                <div className="mgb8 fw400 fs12 lh18 fc-gray">개인정보처리방침</div>
              </div>
            </div>
          </div>
        ) : null}
        {showMobileLogin ? (
          <div className="bg-black">
            <div className="mb-login-box">
              <AcoeLogin closeLogin={closeLogin} loginKakao={loginKakao} loginGoogle={loginGoogle} />
            </div>
          </div>
        ) : null}
      </MobileView>
      <BrowserView>
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
        {showMyPage ? <MyInfo /> : null}
        {showLogin ? (
          <div className="bg-black">
            <div className="login-box">
              <AcoeLogin closeLogin={closeLogin} loginKakao={loginKakao} loginGoogle={loginGoogle} />
            </div>
          </div>
        ) : null}
      </BrowserView>
    </>
  );
};

export default Main;
