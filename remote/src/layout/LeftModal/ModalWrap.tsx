import React, { useEffect, useState } from 'react';
import searchSvg from 'images/search.svg';
import xSvg from 'images/x.svg';
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

const ModalWrap = (props: any) => {

  const { setModalState, modalState } = props;

  const [logoCafes, setLogoCafes] = useState<logoCafes[]>([]);
  const [searchCafeTxt, setSearchCafeTxt] = useState('')
  const [currentCafe, setCurrentCafe] = useState(null)

  useEffect(() => {
    const cafes = [
      { title: "starbucks", src: starbucksSvg },
      { title: "paulbassett", src: paulbassettSvg },
      { title: "angelinus", src: angelinusSvg },
      { title: "hollys", src: hollysSvg },
      { title: "passcucci", src: passcucciSvg },
      { title: "ediya", src: ediyaSvg },
      { title: "coffeebean", src: coffeebeanSvg },
      { title: "twosome", src: twosomeSvg },
    ]
    setLogoCafes(cafes)
  }, [])

  useEffect(() => {
    if (currentCafe) {
      console.log(currentCafe)
      setModalState(2);
    }
  }, [currentCafe])

  const clickDetailCafe = (a: any) => {
    console.log(a)
  }

  return (
    <React.Fragment>
      {modalState !== 0 ?
        <div className="cafe-modal">
          <div className="search">
            <img className="serach-image" src={searchSvg} />
            <input className="mgl10" type="text" value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색" />
            {searchCafeTxt !== '' ? <img className="mgl10 close-image" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe, i) => (
              <img key={i} src={logoCafe.src} // onClick = {logoCafe.onClick}
              />
            ))}
          </div>
          <div className="summary">10 개의 카페지롱</div>
          <div className="cafe-list">
            {Array.from({ length: 10 }).map((_, i) => (
              <CafeCard
                key={i}
                cafeTitle={"Twosome place"}
                cafeAddress={"서울특별시 관악구 은천로 12길"}
                naverRoadFinder={true}
                appOrderPossible={true}
                kioskDiscountPossible={true}
                priceOfAmericano={"5000"}
                tumblerDiscount={"500"}
                cafeId={'1002010'}
                setCurrentCafe={setCurrentCafe}
              />
            ))}
          </div>
        </div> : null
      }
      {modalState === 2 &&
        <div className="cafe-modal">



        </div>
      }
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
