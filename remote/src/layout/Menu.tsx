import { useEffect, useState, useRef } from 'react';
import { Maps } from 'components/Maps';
import { MixedBoundary } from 'components/Common';
import { NavContainer } from 'layout/Nav';
import leftImg from 'images/left.png';
import { isModalOpenState } from 'store';
import { useRecoilState } from 'recoil';
import ModalWrap from './LeftModal/ModalWrap'

export const Menu: React.FC =  () => {
  const [isModalOpen] = useRecoilState(isModalOpenState('first'));
  const [isShowingLeftModal, setIsShowingLeftModal] = useState(false);
  const navContainerRef = useRef<Node>(null);

  const showLeftModal = () => {
    setIsShowingLeftModal(!isShowingLeftModal)
    console.log(navContainerRef.current)
    console.log("aa")
  }

  return (
    <section className="container">
      <NavContainer ref ={navContainerRef} />
      <div>
        <div className="left-container">{isShowingLeftModal && <ModalWrap />}</div>
        <div className={`openButton ${isShowingLeftModal && "open"}`} onClick={showLeftModal}>
          <img src={leftImg} />
        </div>
      </div>
      <div className="maps">
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </div>
    </section>
  );
};
export default Menu;
