import React, { useEffect, useState } from 'react';
import searchSvg from 'images/search.svg';
import xSvg from 'images/x.svg';
import brandImg from 'images/brand.png';
import leftImg from 'images/left.png';
import acoeImg from 'images/acoe.svg';
import CafeCard from '../../components/CafeCard';
import starbucksSvg from 'images/starbucks.svg';
import paulbassettSvg from 'images/paul.svg';
import angelinusSvg from 'images/angelinus.svg';
import hollysSvg from 'images/hollys.svg';
import passcucciSvg from 'images/passcucci.svg';
import ediyaSvg from 'images/ediya.svg';
import coffeebeanSvg from 'images/coffeebean.svg';
import twosomeSvg from 'images/twosome.svg';

interface logoCafes {
  title: string;
  src: string;
}

const ModalWrap = (props : any) => {

  const [logoCafes, setLogoCafes] = useState<logoCafes[]>([]);
  const [searchCafeTxt, setSearchCafeTxt] = useState('')


  useEffect(() => {
    const cafes = [
      { title : "starbucks", src : starbucksSvg},
      { title : "paulbassett" , src : paulbassettSvg},
      { title : "angelinus" , src : angelinusSvg},
      { title : "hollys" , src : hollysSvg},
      { title : "passcucci" , src : passcucciSvg},
      { title : "ediya" , src : ediyaSvg},
      { title : "coffeebean" , src : coffeebeanSvg},
      { title : "twosome" , src : twosomeSvg},
    ]
    setLogoCafes(cafes)
  },[])

  const clickDetailCafe = (a : any) => {
    console.log(a)
  }

  return (
    <React.Fragment>
    <div className="cafe-modal">
      <div className="search">
        <img className = "serach-image" src={searchSvg} />
        <input className = "mgl10" type="text" value ={searchCafeTxt} onChange = {(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색" />
        {searchCafeTxt !== ''? <img className = "mgl10 close-image" onClick = {() => setSearchCafeTxt('')} src={xSvg} /> : null}
      </div>
      <div className="cafes">
        {logoCafes.map((logoCafe, i) => (
          <img key={i} src ={logoCafe.src} 
          // onClick = {logoCafe.onClick}
          />
        ))}
      </div>
      <div className="summary">38개의 카페</div>
      <div className = "cafe-list"> 
          <CafeCard
            cafeTitle = {"twosome place"}
            cafeAddress = {"seoul"}
            naverRoadFinder = {true}
            appOrderPossible = {true}
            kioskDiscountPossible = {true}
            priceOfAmericano = {"5000"}
            tumblerDiscount = {"500"}
          /> 
      </div>
      {/* <CardWrap /> */}
    </div>
    {/* <div className="cafe-modal">
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
    </div> */}
    </React.Fragment>
  );
};

export default ModalWrap;
