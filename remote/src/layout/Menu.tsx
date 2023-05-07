import { useState, useRef, useEffect } from 'react';
import { Maps } from 'components/Maps';
import { MixedBoundary } from 'components/Common';
import { NavContainer } from 'layout/Nav';
import ModalWrap from './LeftModal/ModalWrap'
import ShortCutAppOrder from 'components/ShortCutAppOrder';
import ShortCutKioskOrder from 'components/ShortCutKioskOrder';
import { BrowserView, MobileView } from 'react-device-detect';
import starbucksSvg from 'images/starbucks.svg';
import paulbassettSvg from 'images/paul.svg';
import angelinusSvg from 'images/angelinus.svg';
import hollysSvg from 'images/hollys.svg';
import passcucciSvg from 'images/passcucci.svg';
import ediyaSvg from 'images/ediya.svg';
import coffeebeanSvg from 'images/coffeebean.svg';
import twosomeSvg from 'images/twosome.svg';
import { getFranchises, getCafesList } from 'api/main';

interface logoCafes {
  rmk: null;
  regrId: number;
  regDttm: Date;
  modrId: number;
  modDttm: Date;
  franchiseId: number;
  franchiseNm: string;
  discountAmt: number;
  logoImg: null;
  useYn: boolean;
  menuList: any; // 수정필요
  src: string;
}

interface cafe {
  rmk: string | null,
  regrId: string | null,
  regDttm: string | null,
  modrId: string | null,
  modDttm: string | null,
  cafeId: string | null,
  cafeNm: string | null,
  areaCd: number,
  trdStateCd: number,
  dtlStateCd: number,
  telNo:  string | null,
  roadAddr: string,
  roadPostNo: number,
  x: number,
  y: number,
  discountAmt: number | null,
  refNo: string,
  appOrderYn: string | null,
  kioskYn: string | null,
  useYn: string | null,
  franchise: string | null,
  menuList: any
}

export const Menu: React.FC = (props: any) => {


  const [modalState, setModalState] = useState(1);
  const leftModalComponent = useRef<HTMLDivElement>(null);
  const [mobileModalState, setMobileModalState] = useState(1);
  const [searchCafeTxt, setSearchCafeTxt] = useState('')
  const [logoCafes, setLogoCafes] = useState<logoCafes[]>([]);
  const [cafeData, setCafeData] = useState<cafe[]>([]);

  const showLeftModal = () => {
    if (modalState === 0) {
      setModalState(1);
    } else {
      setModalState(0);
    }
  }

  const setButtonState = () => {
    let state = ''
    if (modalState === 1) {
      state = 'openState1'
    } else if (modalState === 2) {
      state = 'openState2'
    }
    return state
  }

  const search = () => {
    console.log("search")
  }

  useEffect(() => {
    _getFranchises();
    _getCafesList();
  }, [])

  const _getFranchises = async () => {
    const response = await getFranchises();
    if (response.data.length > 0) {
      const cafesMap = new Map([
        [6, starbucksSvg], // title: "starbucks",
        [7, paulbassettSvg],
        [1, angelinusSvg],
        [2, hollysSvg],
        [3, passcucciSvg],
        [4, ediyaSvg],
        [5, coffeebeanSvg],
        [8, twosomeSvg]
      ])
      response.data.forEach((item: logoCafes) => {
        item.src = cafesMap.get(item.franchiseId) || ''
      })
      setLogoCafes(response.data)
    } else {
      setLogoCafes([])
    }
  }

  const _getCafesList = async () => {
    const response = await getCafesList(); // type 변경 필요 
    if (response.data.length > 0) {
      setCafeData(response.data)
      console.log(response.data)
    } else {
      setCafeData([])
    }
  }

  return (
    <>
      <MobileView>
        <div className="mb-container">
          <div className="mb-search">
            <div className="mg16 mb-hambergerSvg" onClick={props.mobileShowLogin} />
            <input className="fs16 fw700 lh24 mgr50" type="text"
              onFocus={() => setMobileModalState(2)}
              value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색하세요." onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            <div className="mgr10 mb-searchSvg" />
          </div>
          {mobileModalState !== 1 ?
            <ModalWrap
              setMobileModalState={setMobileModalState}
              mobileModalState={mobileModalState}
              logoCafes={logoCafes}
              cafeData = {cafeData}
            />
            : null}
          <NavContainer logoCafes={logoCafes} />
        </div>
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </MobileView>
      <BrowserView>
        <div className="container">
          {modalState === 2 ? null :
            <div className={modalState === 1 ? 'navOpen' : ''}>
              <NavContainer logoCafes={logoCafes} />
            </div>
          }
          <div className="left-modal" ref={leftModalComponent}>
            <div className="left-container ">{modalState !== 0 ?
              <ModalWrap
                setModalState={setModalState}
                modalState={modalState}
                logoCafes={logoCafes}
                cafeData = {cafeData}
              />
              : null}
            </div>
            <div className={`openButton ${setButtonState()}`} onClick={showLeftModal}>
              <div className={`left ${modalState !== 0 ? 'move' : ''}`}></div>
            </div>
          </div>
          <div className="maps">
            <MixedBoundary>
              <Maps />
            </MixedBoundary>
          </div>
          <div className="short-cut">
            <ShortCutAppOrder />
            <ShortCutKioskOrder />
          </div>
        </div>
      </BrowserView>
    </>
  );
};
export default Menu;
