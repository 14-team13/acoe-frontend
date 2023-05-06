import React, { useEffect, useState } from 'react';
import acoeSvg from 'images/acoe.svg';
import acoeWebp from 'images/acoe.webp';
import kakaoSvg from 'images/kakao.svg';
import kakaoWebp from 'images/kakao.webp';
import googleSvg from 'images/google.svg';
import googleWebp from 'images/google.webp';
import FontFaceObserver from 'fontfaceobserver'

const AcoeLogin = (props: any) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false); 

  useEffect(() => {
    const font = new FontFaceObserver('Pretendard')
    font.load().then(() => {
      setIsFontLoaded(true);
    })
  },[])
  
  return (
    <React.Fragment>
      <div className="login-close" onClick={props.closeLogin} style = {{opacity : isFontLoaded? 1: 0 , transition : 'opacity 0.5s ease' }}>&times;</div>
      <picture>
        <source srcSet={acoeWebp} type="image/webp" />
        <img className="acoe-image" src={acoeSvg} />
      </picture>
      <div className="fw700 fs16 mgt3 lh24">내 주변 텀블러 할인 금액</div>
      <div className="fw700 fs16 mgb15 lh24"><span className="fc-primary">ACOE</span>에서 찾아보세요!</div>
      <div className="login-button kakao" onClick={props.loginKakao}>
        <picture>
          <source srcSet={kakaoWebp} type="image/webp" />
          <img className="acoe-image" src={kakaoSvg} />
        </picture>
        <div className="fw500 fs16 lh36 mgl15">카카오로 시작하기</div>
      </div>
      <div className="login-button google" onClick={props.loginGoogle}>
        <picture>
          <source srcSet={googleWebp} type="image/webp" />
          <img className="acoe-image" src={googleSvg} />
        </picture>
        <div className="fw500 fs16 lh36 mgl15">Google로 시작하기</div>
      </div>
    </React.Fragment>
  );
};

export default AcoeLogin;
