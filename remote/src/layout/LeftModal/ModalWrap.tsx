import React, { useEffect, useState } from 'react';
import searchSvg from 'images/search.svg';
import xSvg from 'images/x.svg';
import CafeCard from 'components/CafeCard';
import leftModalSvg from 'images/leftModal.svg';
import MenusComponent from 'components/MenusComponent';
import BlogReviewComponent from 'components/BlogReviewComponent';
import NaverFinderComponent from 'components/NaverFinderComponent';
import AppOrderDiscountComponent from 'components/AppOrderDiscountComponent';
import KioskOrderDiscountComponent from 'components/KioskOrderDiscountComponent';
import { isMobile } from 'react-device-detect';
import { getCafeInfo } from 'api/main';

interface menu {
  menu: string;
  price: number;
  discount: number
}

const ModalWrap = (props: any) => {

  const { setModalState, modalState, setMobileModalState, mobileModalState, logoCafes, cafeData } = props;

  const [searchCafeTxt, setSearchCafeTxt] = useState('')
  const [cafeID, setCafeID] = useState<number>()
  const [selectedCafe, setSelectedCafe] = useState<any>(); // type 체크 필요 
  const [selectedMenu, setSelectedMenu] = useState<menu[]>([]);

  const _getCafeInfo = async (cafeID: number) => {
    const response = await getCafeInfo(cafeID); // type 변경 필요 
    if (response.data) {
      setSelectedCafe(response.data)
    } else {
      setSelectedCafe([])
    }
  }

  useEffect(() => {
    if (cafeID) {
      _getCafeInfo(cafeID);
    }
  }, [cafeID])

  const search = () => {
    // setCafeData(getData)
  }

  return (
    <>
      {isMobile && mobileModalState === 2 ?
        <div className="mb-cafe-modal">
          <div className="search">
            <img className="" src={leftModalSvg} onClick={() => setMobileModalState(1)} />
            <input className="mgl50" type="text" value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색" onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            {searchCafeTxt !== '' ? <img className="mgl20 close-image" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe: any, i: any) => ( //type 수정 필요 
              <img key={i} src={logoCafe.src} // onClick = {logoCafe.onClick}
              />
            ))}
          </div>
          <div className="summary fw700 fs14 lh21 fc-gray">{cafeData.length > 0 ? `${cafeData.length}개의 카페` : null}</div>
          <div className="cafe-list">
            {cafeData.map((cafe: any, i: number) => ( // any type 체크 필요 
              <CafeCard
                key={i}
                cafeTitle={cafe.cafeNm}
                cafeAddress={cafe.roadAddr}
                naverRoadFinder={true}
                appOrderYn={cafe.appOrderYn}
                kioskYn={cafe.kioskYn}
                menu1={cafe.menu1}
                menu1_price={cafe.discountAmt}
                discountprice={cafe.discountprice}
                cafeId={cafe.cafeId}
                setCafeID={setCafeID}
                setModalState={setModalState}
                setMobileModalState={setMobileModalState}
              />
            ))}
          </div>
        </div> : null}
      {isMobile && mobileModalState === 3 ?
        <div className="mb-cafe-modal">
          <div className="search">
            <img className="" src={leftModalSvg} onClick={() => setMobileModalState(2)} />
            <div className="fw700 fs20 lh36 mgl25 mgr40 txt-overflow">{selectedCafe ? selectedCafe.title : ''}</div>
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="fw700 fs12 lh18 mgt17 discount-badge">{selectedCafe?.discountprice}원 할인</div>
              <div className="fw700 fs20 lh36 mgt12">{selectedCafe?.title}</div>
              <div className="fw400 fs12 lh18 mgt8">{selectedCafe?.address}</div>
              <NaverFinderComponent />
              <div className="flex-row-center mgt15">
                <div>
                  <AppOrderDiscountComponent />
                </div>
                <div className="mgl25">
                  <KioskOrderDiscountComponent />
                </div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">메뉴</div>
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
                <div className="fw400 fs10 lh18 fc-gray">메뉴 항목과 가격 및 텀블러 할인 가격은</div>
                <div className="fw400 fs10 lh18 fc-gray">각 매장의 사정에 따라 기재된 내용과 다를 수 있습니다.</div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">블로그 리뷰</div>
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
            </div>
          </div>
        </div>
        : null}
      {!isMobile && modalState !== 0 ?
        <div className="cafe-modal">
          <div className="search">
            <img className="img24" src={searchSvg} />
            <input className="mgl15" type="text" value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색" onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            {searchCafeTxt !== '' ? <img className="mgl15 img12" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe: any, i: number) => (
              <img key={i} src={logoCafe.src} // onClick = {logoCafe.onClick}
              />
            ))}
          </div>
          <div className="summary fw700 fs14 lh21 fc-gray">{cafeData.length > 0 ? `${cafeData.length}개의 카페` : null}</div>
          <div className="cafe-list">
            {cafeData.map((cafe: any, i: number) => (
              <CafeCard
                key={i}
                cafeTitle={cafe.cafeNm}
                cafeAddress={cafe.roadAddr}
                naverRoadFinder={true}
                appOrderYn={cafe.appOrderYn}
                kioskYn={cafe.kioskYn}
                menu1={cafe.menu1}
                menu1_price={cafe.discountAmt}
                discountprice={cafe.discountAmt}
                cafeId={cafe.cafeId}
                setCafeID={setCafeID}
                setModalState={setModalState}
                setMobileModalState={setMobileModalState}
              />
            ))}
          </div>
        </div> : null
      }
      {!isMobile && modalState === 2 &&
        <div className="cafe-modal">
          <div className="search">
            <img className="" src={leftModalSvg} onClick={(modalState) => setModalState(1)} />
            <div className="fw700 fs20 lh36 mgl25 mgr40 txt-overflow"></div>
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="fw700 fs12 lh18 mgt17 discount-badge">{selectedCafe?.discountAmt}원 할인</div>
              <div className="fw700 fs20 lh36 mgt12">{selectedCafe?.cafeNm}</div>
              <div className="fw400 fs12 lh18 mgt8">{selectedCafe?.roadAddr}</div>
              <div className="mgb25"> <NaverFinderComponent /></div>
              <div className="flex-row-center mgb30">
                <div>
                  {selectedCafe && selectedCafe.appOrderYn ? <AppOrderDiscountComponent /> : null}
                </div>
                <div className="mgl25">
                  {selectedCafe && selectedCafe.kioskYn ? <KioskOrderDiscountComponent /> : null}
                </div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">메뉴</div>
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
                <div className="fw400 fs10 lh18 fc-gray">메뉴 항목과 가격 및 텀블러 할인 가격은</div>
                <div className="fw400 fs10 lh18 fc-gray">각 매장의 사정에 따라 기재된 내용과 다를 수 있습니다.</div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">블로그 리뷰</div>
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
              <BlogReviewComponent />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ModalWrap;
