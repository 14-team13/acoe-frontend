import React, { useEffect, useState } from 'react';
import searchImg from 'images/search.png';
import xImg from 'images/x.png';
import brandImg from 'images/brand.png';
import leftImg from 'images/left.png';
import acoeImg from 'images/acoe.svg';
import CardWrap from '../../components/CardWrap';

const ModalWrap = (props : any) => {

  

  const clickDetailCafe = (a : any) => {
    console.log(a)
  }

  return (
    <React.Fragment>
    <div className="cafe-modal">
      <div className="search">
        <img src={searchImg} />
        <input type="text" placeholder="카페 이름 검색" />
        <img src={xImg} />
      </div>
      <div className="cafes">
        {Array.from({ length: 5 }).map((_, i) => (
          <img key={i} src={brandImg} onClick = {clickDetailCafe} />
        ))}
      </div>
      <div className="summary">38개의 카페</div>
      <CardWrap />
    </div>
    <div className="cafe-modal">
      <div className="search">
        <img src={leftImg} />
        <h1>Bottle Lounge</h1>
      </div>
      <img src={acoeImg}/>
      <div>
      </div>
      <div className = "divide"></div>
      <div>
        <h1>MENU</h1>
      </div>
      <div>
        <h1>BLOG REVIEW</h1>
      </div>
    </div>
    </React.Fragment>
  );
};

export default ModalWrap;
