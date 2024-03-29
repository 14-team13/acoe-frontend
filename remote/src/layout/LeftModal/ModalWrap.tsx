import React, { useEffect, useState, useRef, InputHTMLAttributes } from 'react';
import searchSvg from 'images/search.svg';
import acoe_white from 'images/acoe_white.svg';
import xSvg from 'images/x.svg';
import CafeCard from 'components/CafeCard';
import leftModalSvg from 'images/leftModal.svg';
import MenusComponent from 'components/MenusComponent';
import BlogReviewComponent from 'components/BlogReviewComponent';
import NaverFinderComponent from 'components/NaverFinderComponent';
import AppOrderDiscountComponent from 'components/AppOrderDiscountComponent';
import KioskOrderDiscountComponent from 'components/KioskOrderDiscountComponent';
import { isMobile } from 'react-device-detect';
import { getCafeInfo, getCafeBlog} from 'api/main';
import NotFoundComponent from 'components/NotFoundComponent';

interface menu {
  menuNm: string;
  price: number;
  discountAmt: number
}

interface blog{
  blogLink: string;
  blogNm: string;
  desc: string;
  postDt: string;
  title: string;
}

const ModalWrap = (props: any) => {

  const { setModalState, modalState, setMobileModalState, mobileModalState, logoCafes, cafeData, getCafeKeyword, getCafesList, cafeInfo, setClickFranchise, focusText } = props;

  const [searchCafeTxt, setSearchCafeTxt] = useState('')
  const [cafeID, setCafeID] = useState<any>()
  const [selectedCafe, setSelectedCafe] = useState<any>(); // type 체크 필요 
  const [selectedMenu, setSelectedMenu] = useState<menu[]>([]);
  const [cafeBlogData, setCafeBlogData] = useState<blog[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const _getCafeInfo = async (cafeID: number) => {
    const response = await getCafeInfo(cafeID); // type 변경 필요 
    if (response.data) {
      setSelectedCafe(response.data)
      if (response.data.menuList && response.data.menuList.length > 0) {
        setSelectedMenu(response.data.menuList)
      }
    } else {
      setSelectedCafe([])
      setSelectedMenu([])
    }
  }

  const _getCafeBlog = async (cafeNm: string) => {
    const response = await getCafeBlog(cafeNm); 
    if (response.status === 200) {
      console.log(response.data)
      setCafeBlogData(response.data)
    }else{
      setCafeBlogData([])
    }
  }

  useEffect(() => {
    if (cafeID) {
      _getCafeInfo(cafeID.cafeId);
      _getCafeBlog(cafeID.cafeTitle)
    }
  }, [cafeID])

  useEffect(() => {
    if (!isMobile && cafeInfo && cafeInfo.cafeId) {
      _getCafeInfo(cafeInfo.cafeId);
      setModalState(2)
    }
  }, [cafeInfo])


  const search = () => {
    if (searchCafeTxt) {
      getCafeKeyword(searchCafeTxt)
    } else {
      getCafesList()
    }
  }

  useEffect(() => {
    if (focusText && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusText])

  return (
    <>
      {isMobile && mobileModalState === 2 ?
        <div className="mb-cafe-modal">
          <div className="search">
            <img className="" src={leftModalSvg} onClick={() => setMobileModalState(1)} />
            <input className="mgl50" type="text" value={searchCafeTxt} ref={inputRef} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름을 검색하세요." onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            {searchCafeTxt !== '' ? <img className="mgl20 close-image" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe: any, i: any) => ( //type 수정 필요 
              <img key={i} src={`data:image/jpg;base64,${logoCafe.logoImg}`} alt="base64-encoded image" onClick={() => setClickFranchise(logoCafe)} />
            ))}
          </div>
          {cafeData.length > 0 ?
            <div className="mb-scroll">
              <div className="summary fw700 fs14 lh21 fc-gray mgt5 mgb5">{cafeData.length > 0 ? `${cafeData.length}개의 카페` : null}</div>
              <div className="cafe-list">
                {cafeData.map((cafe: any, i: number) => ( // any type 체크 필요 
                  <CafeCard
                    key={i}
                    cafeTitle={cafe.cafeNm}
                    cafeAddress={cafe.roadAddr}
                    naverRoadFinder={true}
                    appOrderYn={cafe.appOrderYn}
                    kioskYn={cafe.kioskYn}
                    menuNm={cafe.menuList && cafe.menuList[0] ? cafe.menuList[0].menuNm : ''}
                    price={cafe.menuList && cafe.menuList[0] ? cafe.menuList[0].price : 0}
                    discountAmt={cafe.discountAmt}
                    cafeId={cafe.cafeId}
                    setCafeID={setCafeID}
                    setModalState={setModalState}
                    setMobileModalState={setMobileModalState}
                  />
                ))}
              </div>
            </div> :
            <NotFoundComponent />
          }
        </div> : null}
      {isMobile && mobileModalState === 3 ?
        <div className="mb-cafe-modal">
          <div className="search" style={{ justifyContent: 'space-between' }}>
            <img className="" src={leftModalSvg} onClick={() => setMobileModalState(2)} />
            <div className="fw700 fs20 lh36 mgl25 mgr40 txt-overflow"></div>
            <img className="" src={xSvg} onClick={() => setMobileModalState(0)} />
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="fw700 fs12 lh18 mgt17 discount-badge">{selectedCafe?.discountAmt || 0}원 할인</div>
              <div className="fw700 fs20 lh36 mgt12">{selectedCafe?.cafeNm}</div>
              <div className="fw400 fs12 lh18 mgt8">{selectedCafe?.roadAddr}</div>
              {/* <NaverFinderComponent /> */}
              <div className="flex-row-center mgt15">
                {selectedCafe && selectedCafe.appOrderYn ?
                  <div className="mgr25">
                    <AppOrderDiscountComponent />
                  </div> : null}
                <div>
                  {selectedCafe && selectedCafe.kioskYn ? <KioskOrderDiscountComponent /> : null}
                </div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">메뉴</div>
              {selectedMenu.map((item, i) => (
                <MenusComponent
                  key={i}
                  menuNm={item.menuNm}
                  price={item.price}
                  discountAmt={selectedCafe?.discountAmt}
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
              {cafeBlogData.map((item: any, i: number) => (
                <BlogReviewComponent
                  key={i}
                  blogNm={item.blogNm}
                  title={item.title}
                  desc={item.desc}
                  postDt={item.postDt}
                  blogLink={item.blogLink}
                />
              ))}
            </div>
          </div>
        </div>
        : null}
      {!isMobile && modalState !== 0 ?
        <div className="cafe-modal">
          <div className="bg-primary">
            <img className="mgt24 mgl15 mgb16" src={acoe_white} />
            <div className="search">
              <div className="flex-row-center outline">
                <img className="img24 mgl5" src={searchSvg} />
                <input className="mgl10" type="text" value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름을 검색하세요." onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
                {searchCafeTxt !== '' ? <img className="mgl15 img12" onClick={() => setSearchCafeTxt('')} src={xSvg} /> : null}
              </div>
            </div>
          </div>
          <div className="cafes">
            {logoCafes.map((logoCafe: any, i: number) => (
              <img key={i} src={`data:image/jpg;base64,${logoCafe.logoImg}`} onClick={() => setClickFranchise(logoCafe)} />
            ))}
          </div>
          {cafeData.length > 0 ?
            <div className="scroll">
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
                    menuNm={cafe.menuList && cafe.menuList[0] ? cafe.menuList[0].menuNm : ''}
                    price={cafe.menuList && cafe.menuList[0] ? cafe.menuList[0].price : 0}
                    discountAmt={cafe.discountAmt}
                    cafeId={cafe.cafeId}
                    setCafeID={setCafeID}
                    setModalState={setModalState}
                    setMobileModalState={setMobileModalState}
                  />
                ))}
              </div>
            </div> : <NotFoundComponent />}
        </div> : null
      }
      {!isMobile && modalState === 2 &&
        <div className="cafe-modal">
          <div className="search" style={{ justifyContent: 'space-between' }}>
            <img className="" src={leftModalSvg} onClick={(modalState) => setModalState(1)} />
            <div className="fw700 fs20 lh36 mgl25 mgr40 txt-overflow"></div>
          </div>
          <div className="cafe-detail">
            <div className="cafe-typical">
              <div className="fw700 fs12 lh18 mgt17 discount-badge">{selectedCafe?.discountAmt || 0}원 할인</div>
              <div className="fw700 fs20 lh36 mgt12">{selectedCafe?.cafeNm}</div>
              <div className="fw400 fs12 lh18 mgt8">{selectedCafe?.roadAddr}</div>
              {/* <div className="mgb25"> <NaverFinderComponent /></div> */}
              <div className="flex-row-center mgb30">
                {selectedCafe && selectedCafe.appOrderYn ?
                  <div className="mgr25">
                    <AppOrderDiscountComponent />
                  </div> : null}
                <div>
                  {selectedCafe && selectedCafe.kioskYn ? <KioskOrderDiscountComponent /> : null}
                </div>
              </div>
            </div>
            <div className="cafe-detail-component">
              <div className="fw700 fs14 lh24">메뉴</div>
              {selectedMenu.map((item, i) => (
                <MenusComponent
                  key={i}
                  menuNm={item.menuNm}
                  price={item.price}
                  discountAmt={selectedCafe?.discountAmt}
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
              {cafeBlogData.map((item: any, i: number) => (
                <BlogReviewComponent
                  key={i}
                  blogNm={item.blogNm}
                  title={item.title}
                  desc={item.desc}
                  postDt={item.postDt}
                  blogLink={item.blogLink}
                />
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ModalWrap;
