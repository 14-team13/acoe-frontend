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
import leftModalSvg from 'images/leftModal.svg';
import acoeSvg from 'images/acoe.svg';
import MenusComponent from 'components/MenusComponent';
import BlogReviewComponent from 'components/BlogReviewComponent';
import NaverFinderComponent from 'components/NaverFinderComponent';
import AppOrderDiscountComponent from 'components/AppOrderDiscountComponent';
import KioskOrderDiscountComponent from 'components/KioskOrderDiscountComponent';
import { getData } from 'store/cafeData';

interface logoCafes {
  title: string;
  src: string;
}

interface menu {
  menu: string;
  price: number;
  discount: number
}
interface infoCafes {
  number: number;
  title: string;
  telephone: string;
  address: string;
  x: number;
  y: number;
  type: string;
  discountprice: number;
  kiosk: string;
  app: string;
  menu1: string;
  menu1_price: number;
  menu2: string;
  menu2_price: number;
  menu3: string;
  menu3_price: number;
}

const ModalWrap = (props: any) => {

  const { setModalState, modalState } = props;

  const [logoCafes, setLogoCafes] = useState<logoCafes[]>([]);
  const [searchCafeTxt, setSearchCafeTxt] = useState('')
  const [cafeID, setCafeID] = useState<number>()
  const [selectedCafe, setSelectedCafe] = useState<infoCafes>();
  const [cafeData, setCafeData] = useState<infoCafes[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<menu[]>([]);

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
    if (cafeID && cafeData.length > 0) {
      setModalState(2);
      const cafe = cafeData.filter((item) => item.number === cafeID)
      setSelectedCafe(cafe[0])
      const menus = [
        { menu: cafe[0].menu1, price: cafe[0].menu1_price, discount: cafe[0].discountprice },
        { menu: cafe[0].menu2, price: cafe[0].menu2_price, discount: cafe[0].discountprice },
        { menu: cafe[0].menu3, price: cafe[0].menu3_price, discount: cafe[0].discountprice }
      ]
      setSelectedMenu(menus)
    }
  }, [cafeID])

  const search = () => {
    setCafeData(getData)
  }

  return (
    <React.Fragment>
      {modalState !== 0 ?
        <div className="cafe-modal">
          <div className="search">
            <img className="serach-image" src={searchSvg} />
            <input className="mgl10" type="text" value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색" onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            {searchCafeTxt !== '' ? <img className="mgl10 close-image" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe, i) => (
              <img key={i} src={logoCafe.src} // onClick = {logoCafe.onClick}
              />
            ))}
          </div>
          <div className="summary fw700 fs14 lh21 fc-gray">{cafeData.length > 0 ? `${cafeData.length}개의 카페` : null}</div>
          <div className="cafe-list">
            {cafeData.map((cafe, i) => (
              <CafeCard
                key={i}
                cafeTitle={cafe.title}
                cafeAddress={cafe.address}
                naverRoadFinder={true}
                appOrderPossible={true}
                kioskDiscountPossible={true}
                menu1={cafe.menu1}
                menu1_price={cafe.menu1_price}
                discountprice={cafe.discountprice}
                cafeId={cafe.number}
                setCafeID={setCafeID}
              />
            ))}
          </div>
        </div> : null
      }
      {modalState === 2 &&
        <div className="cafe-modal">
          <div className="search">
            <img className="" src={leftModalSvg} onClick={() => setModalState(1)} />
            <div className="fw700 fs24 lh36 mgl25">{selectedCafe ? selectedCafe.title : ''}</div>
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="cafe-typical-img">
                <img className="" src={acoeSvg} />
              </div>
              <div className="fw700 fs24 lh36 mgt15">{selectedCafe?.title}</div>
              <div className="fw700 fs12 lh18 mgt8">텀블러 {selectedCafe?.discountprice}원 할인</div>
              <div className="fw400 fs12 lh18 mgt20">{selectedCafe?.address}</div>
              <NaverFinderComponent />
              <div className="flex-row mgt19">
                <div>
                  <AppOrderDiscountComponent />
                </div>
                <div className="mgl25">
                  <KioskOrderDiscountComponent />
                </div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs16 lh24">메뉴</div>
              {selectedMenu.map((item, i) => (
                <MenusComponent
                  key={i}
                  menu={item.menu}
                  price={item.price}
                  discountprice={item.discount}
                  naverRoadFinder={true}
                />
              ))}
              <div className="flex-column-center">
                <div className="fw400 fs12 lh18 fc-gray">메뉴 항목과 가격 및 텀블러 할인 가격은</div>
                <div className="fw400 fs12 lh18 fc-gray">각 매장의 사정에 따라 기재된 내용과 다를 수 있음</div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs16 lh24 mgb25">블로그 리뷰</div>
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default ModalWrap;
