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
import naverFinder from 'images/naverFinder.svg';
import appDiscountSvg from 'images/appDiscount.svg';
import kioskDiscount from 'images/kioskDiscount.svg';
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
          <div className="search">
            <img className="" src={leftModalSvg} onClick={() => setModalState(1)} />
            <input className="mgl10" type="text" defaultValue={"cafe name"} />
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="cafe-typical-img">
                <img className="" src={acoeSvg} />
              </div>
              <div className="fw700 fs24 lh36 mgt15">보틀라운지</div>
              <div className="fw700 fs12 lh18 mgt8">텀블러 300원 할인</div>
              <div className="fw400 fs12 lh18 mgt20">서울 서대문구 홍연길 26 1층</div>
              <div className="fw700 fs12 lh18 fc-naver mgt4"><img src={naverFinder} /> 네이버 길찾기</div>
              <div className="flex_row mgt19">
                <div className="fw700 fs12 lh18 fc-gray"><img src={appDiscountSvg} />앱 주문 할인 가능</div>
                <div className="fw700 fs12 lh18 fc-gray"><img src={kioskDiscount} />키오스크 할인 가능</div>
              </div>
            </div>

            <div className="cafe-detail-component">
              <div className="fw700 fs16 lh24">메뉴</div>
              <MenusComponent />
              <MenusComponent />
              <MenusComponent />
              <div className="flex_column_center">
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
