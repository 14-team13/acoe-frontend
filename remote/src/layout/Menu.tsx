import { useState, useRef, useEffect } from 'react';
import { Maps } from 'components/Maps';
import { MixedBoundary } from 'components/Common';
import { NavContainer } from 'layout/Nav';
import ModalWrap from './LeftModal/ModalWrap'
import ShortCutAppOrder from 'components/ShortCutAppOrder';
import ShortCutKioskOrder from 'components/ShortCutKioskOrder';
import { BrowserView, MobileView } from 'react-device-detect';
import { getFranchises, getCafesList } from 'api/main';
import { getCafeKeyword } from 'api/main';

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
  telNo: string | null,
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
  const cafeBasicDataRef = useRef<cafe[]>([])
  const [markerSetting, setMarkerSetting] = useState<string | null>(null)
  const [clickedCafe, setClickedCafe] = useState<cafe | null>(null)
  const [clickFranchise, setClickFranchise]= useState<logoCafes | null>(null);

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
    console.log(searchCafeTxt)
    if (searchCafeTxt) {
      _getCafeKeyword(searchCafeTxt)
    } else {
      _getCafesList();
    }
  }

  useEffect(() => {
    _getFranchises();
    _getCafesList();
  }, [])

  useEffect(() => {
    if(clickFranchise){
      // 전체에서 찾기 cafeBasicDataRef.current  
      const _cafeData = cafeBasicDataRef.current.filter((item: any) => item.franchise && item.franchise.franchiseId === clickFranchise.franchiseId)
      setCafeData([..._cafeData])
    }
  },[clickFranchise])


  useEffect(() => {
    if (markerSetting !== null && Number(markerSetting) >= 0) {
      const _cafeData = cafeBasicDataRef.current.filter((item: cafe) => item.discountAmt !== null && item.discountAmt >= Number(markerSetting))
      setCafeData([..._cafeData])
    } else if (markerSetting === 'app') {
      const _cafeData = cafeBasicDataRef.current.filter((item: cafe) => item.appOrderYn)
      setCafeData([..._cafeData])
    } else if (markerSetting === 'kiosk') {
      const _cafeData = cafeBasicDataRef.current.filter((item: cafe) => item.kioskYn)
      setCafeData([..._cafeData])
    } else {
      setCafeData([...cafeBasicDataRef.current])
    }
  }, [markerSetting])

  const _getFranchises = async () => {
    const response = await getFranchises();
    if (response.data.length > 0) {
      setLogoCafes(response.data)
    } else {
      setLogoCafes([])
    }
  }

  const _getCafesList = async () => {
    const response = await getCafesList(); 
    if (response.data.length > 0) {
      const _data = response.data.filter((item: any) => item.useYn)
      // setCafeBasicData(JSON.parse(JSON.stringify(_data))) // 카페 전체 데이터 
      cafeBasicDataRef.current = JSON.parse(JSON.stringify(_data))
      setCafeData(_data)
      console.log(_data)
    } else {
      cafeBasicDataRef.current = []; 
      setCafeData([])
    }
  }

  const _getCafeKeyword = async (cafeTitle: string) => {
    const response = await getCafeKeyword(cafeTitle); 
    if (response.data.length > 0) {
      const _data = response.data.filter((item: any) => item.useYn)
      setCafeData(_data)
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
              value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름을 검색하세요." onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            <div className="mgr10 mb-searchSvg" />
          </div>
          {mobileModalState !== 1 ?
            <ModalWrap
              setMobileModalState={setMobileModalState}
              mobileModalState={mobileModalState}
              logoCafes={logoCafes}
              cafeData={cafeData}
              getCafeKeyword={_getCafeKeyword}
              getCafesList={_getCafesList}
              clickedCafe = {clickedCafe}
              setClickFranchise={setClickFranchise}
            />
            : null}
          <NavContainer logoCafes={logoCafes} setMarkerSetting={setMarkerSetting} />
        </div>
        <MixedBoundary>
          <Maps
            setClickedCafe={setClickedCafe}
            newMarkers={cafeData}
          />
        </MixedBoundary>
      </MobileView>
      <BrowserView>
        <div className="container">
          {modalState === 2 ? null :
            <div className={modalState === 1 ? 'navOpen' : ''}>
              <NavContainer logoCafes={logoCafes} setMarkerSetting={setMarkerSetting} />
            </div>
          }
          <div className="left-modal" ref={leftModalComponent}>
            <div className="left-container ">{modalState !== 0 ?
              <ModalWrap
                setModalState={setModalState}
                modalState={modalState}
                logoCafes={logoCafes}
                cafeData={cafeData}
                getCafeKeyword={_getCafeKeyword}
                getCafesList={_getCafesList}
                clickedCafe = {clickedCafe}
                setClickFranchise={setClickFranchise}
              />
              : null}
            </div>
            <div className={`ope  nButton ${setButtonState()}`} onClick={showLeftModal}>
              <div className={`left ${modalState !== 0 ? 'move' : ''}`}></div>
            </div>
          </div>
          <div className="maps">
            <MixedBoundary>
              <Maps
                setClickedCafe={setClickedCafe}
                newMarkers={cafeData}
              />
            </MixedBoundary>
          </div>
          <div className="short-cut">
            <ShortCutAppOrder setMarkerSetting={setMarkerSetting} />
            <ShortCutKioskOrder setMarkerSetting={setMarkerSetting} />
          </div>
        </div>
      </BrowserView>
    </>
  );
};
export default Menu;
