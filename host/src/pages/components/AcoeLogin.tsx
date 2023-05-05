import React from 'react';
import acoeImg from 'images/acoe.svg';
import googleImg from 'images/google.svg';
import kakaoImg from 'images/kakao.svg';


const AcoeLogin = (props: any) => {
  return (
    <React.Fragment>
      <div className="login-close" onClick={props.closeLogin}>&times;</div>
      <img className="acoe-image" src={acoeImg} />
      <div className="fw700 fs16 mgt3 lh24">내 주변 텀블러 할인 금액</div>
      <div className="fw700 fs16 mgb15 lh24">ACOE에서 찾아보세요!</div>
      <div className="login-button kakao" onClick={props.loginKakao}>
        <img src={kakaoImg} />
        <div className="fw500 fs16 lh36 mgl15">카카오로 시작하기</div>
      </div>
      <div className="login-button google" onClick={props.loginGoogle}>
        <img src={googleImg} />
        <div className="fw500 fs16 lh36 mgl15">Google로 시작하기</div>
      </div>
    </React.Fragment>
  );
};

export default AcoeLogin;
