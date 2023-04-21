import { useState, useRef } from 'react';
import { Maps } from 'components/Maps';
import { MixedBoundary } from 'components/Common';
import { NavContainer } from 'layout/Nav';
import leftModalSvg from 'images/leftModal.svg';
import ModalWrap from './LeftModal/ModalWrap'

export const Menu: React.FC = () => {

  const [modalState, setModalState] = useState(1);
  const leftModalComponent = useRef<HTMLDivElement>(null);

  const showLeftModal = () => {
    if(modalState === 0){
      setModalState(1);
    }else{
      setModalState(0);
    }
  }

  const setButtonState = () => {
    let state = '' 
    if(modalState === 1){
      state = 'openState1'
    }else if(modalState === 2){
      state = 'openState2'
    }
    return state
  }

  return (
    <div className="container">
      {modalState === 2 ? null :
        <div className= {modalState === 1? 'navOpen'  : ''}>
          <NavContainer />
        </div>
      }
      <div className="left-modal" ref={leftModalComponent}>
        <div className="left-container ">{modalState !== 0? 
          <ModalWrap
            setModalState = {setModalState}
            modalState = {modalState}/> 
          : null}
        </div>
        <div className={`openButton ${setButtonState()}`} onClick={showLeftModal}>
          <img src={leftModalSvg} />
        </div>
      </div>
      <div className="maps">
        <MixedBoundary>
          <Maps />
        </MixedBoundary>
      </div>
    </div>
  );
};
export default Menu;
