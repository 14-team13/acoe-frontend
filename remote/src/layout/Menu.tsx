import { useState, useRef } from 'react';
import { Maps } from 'components/Maps';
import { MixedBoundary } from 'components/Common';
import { NavContainer } from 'layout/Nav';
import ModalWrap from './LeftModal/ModalWrap'
import ShortCutAppOrder from 'components/ShortCutAppOrder';
import ShortCutKioskOrder from 'components/ShortCutKioskOrder';
import { BrowserView, MobileView } from 'react-device-detect';

export const Menu: React.FC = (props : any) => {

  const [modalState, setModalState] = useState(1);
  const leftModalComponent = useRef<HTMLDivElement>(null);
  const [mobileModalState, setMobileModalState] = useState(1);
  const [searchCafeTxt, setSearchCafeTxt] = useState('')


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


  return (
    <>
      <MobileView>
        <div className="mb-container">
          <div className="mb-search">
            <div className="mg16 mb-hambergerSvg" onClick={props.mobileShowLogin}/>
            <input className="fs16 fw700 lh24 mgr50" type="text"
              onFocus={() => setMobileModalState(2)}
              value={searchCafeTxt} onChange={(e) => setSearchCafeTxt(e.target.value)} placeholder="카페 이름 검색하세요." onKeyDown={(e) => { if (e.key === 'Enter') { search() } }} />
            <div className="mgr10 mb-searchSvg" />
          </div>
          {mobileModalState !== 1 ?
            <ModalWrap
              setMobileModalState={setMobileModalState}
              mobileModalState={mobileModalState} />
            : null}
          <NavContainer />
        </div>
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </MobileView>
      <BrowserView>
        <div className="container">
          {modalState === 2 ? null :
            <div className={modalState === 1 ? 'navOpen' : ''}>
              <NavContainer />
            </div>
          }
          <div className="left-modal" ref={leftModalComponent}>
            <div className="left-container ">{modalState !== 0 ?
              <ModalWrap
                setModalState={setModalState}
                modalState={modalState} />
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
