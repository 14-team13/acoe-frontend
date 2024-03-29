import { useEffect, useState } from 'react';
import { DiscountWrap } from 'layout/Nav';
import starbucksImg from 'images/starbucks.svg';
import lowImg from 'images/low.png';
import mediumImg from 'images/medium.png';
import highImg from 'images/high.png';
import { BrowserView, MobileView } from 'react-device-detect';

const NavContainer = (props: any) => {

  const [isShowDiscount, setIsShowDiscount] = useState(false);
  const [isShowMore300, setIsShowMore300] = useState(false);
  const [isShowMore500, setIsShowMore500] = useState(false);
  const [isShowMore1000, setIsShowMore1000] = useState(false);

  const showFranchiseDiscount = () => {
    setIsShowDiscount(!isShowDiscount)
    setIsShowMore300(false)
    setIsShowMore500(false)
    setIsShowMore1000(false)
  }

  const showMore300Discount = () => {
    if(!isShowMore300){
      props.setMarkerSetting('300')
    }else{
      props.setMarkerSetting(null)
    }
    setIsShowMore300(!isShowMore300)
    setIsShowDiscount(false)
    setIsShowMore500(false)
    setIsShowMore1000(false)
  }

  const showMore500Discount = () => {
    if(!isShowMore500){
      props.setMarkerSetting('500')
    }else{
      props.setMarkerSetting(null)
    }
    setIsShowMore500(!isShowMore500)
    setIsShowDiscount(false)
    setIsShowMore300(false)
    setIsShowMore1000(false)
  }

  const showMore1000Discount = () => {
    if(!isShowMore1000){
      props.setMarkerSetting('1000')
    }else{
      props.setMarkerSetting(null)
    }
    setIsShowMore1000(!isShowMore1000)
    setIsShowDiscount(false)
    setIsShowMore300(false)
    setIsShowMore500(false)
  }

  const closeAllButtton = () => {
    setIsShowMore300(false)
    setIsShowMore500(false)
    setIsShowMore1000(false)
    setIsShowDiscount(false)
  }

  //logoCafes = {logoCafes}
  return (
    <>
      <MobileView>
        <div className="mb-wrap">
          <div className="mb-wrap-search">
            <div className="mb-nav-box">
              <div className="mb-nav-wrap">
                <div className={`mb-discount fw700 fs12 lh18 ${isShowDiscount && "on"}`} onClick={showFranchiseDiscount} >
                  <img src={starbucksImg} />
                  <span>프렌차이즈 할인</span>
                </div>
                <div className={`mb-discount fw700 fs12 lh18 ${isShowMore300 && "on"}`} onClick={showMore300Discount}>
                  <img src={lowImg} />
                  <span>300원 이상~</span>
                </div>
                <div className={`mb-discount fw700 fs12 lh18 ${isShowMore500 && "on"}`} onClick={showMore500Discount}>
                  <img src={mediumImg} />
                  <span>500원 이상~</span>
                </div>
                <div className={`mb-discount fw700 fs12 lh18 ${isShowMore1000 && "on"}`} onClick={showMore1000Discount}>
                  <img src={highImg} />
                  <span>1,000원 이상~</span>
                </div>
              </div>
              {isShowDiscount ? <DiscountWrap  logoCafes = {props.logoCafes}/> : null}
            </div>
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className="wrap">
          <div className="search">
            <div className="nav-box">
              <div className="nav-wrap">
                <div className={`discount fw700 fs16 lh30 ${isShowDiscount && "on"}`} onClick={showFranchiseDiscount} >
                  <img src={starbucksImg} />
                  <span>프렌차이즈 할인</span>
                </div>
                <div className={`discount fw700 fs16 lh30 ${isShowMore300 && "on"}`} onClick={showMore300Discount}>
                  <img src={lowImg} />
                  <span>300원 이상~</span>
                </div>
                <div className={`discount fw700 fs16 lh30 ${isShowMore500 && "on"}`} onClick={showMore500Discount}>
                  <img src={mediumImg} />
                  <span>500원 이상~</span>
                </div>
                <div className={`discount fw700 fs16 lh30 ${isShowMore1000 && "on"}`} onClick={showMore1000Discount}>
                  <img src={highImg} />
                  <span>1,000원 이상~</span>
                </div>
              </div>
              {isShowDiscount ? <DiscountWrap logoCafes = {props.logoCafes}/> : null}
            </div>
          </div>
        </div>
      </BrowserView>
    </>
  );
};

export default NavContainer;
