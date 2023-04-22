import { useEffect, useState } from 'react';
import { DiscountWrap } from 'layout/Nav';
import starbucksImg from 'images/starbucks.svg';
import lowImg from 'images/low.png';
import mediumImg from 'images/medium.png';
import highImg from 'images/high.png';

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
    setIsShowMore300(!isShowMore300)
    setIsShowDiscount(false)
    setIsShowMore500(false)
    setIsShowMore1000(false)
  }

  const showMore500Discount = () => {
    setIsShowMore500(!isShowMore500)
    setIsShowDiscount(false)
    setIsShowMore300(false)
    setIsShowMore1000(false)
  }

  const showMore1000Discount = () => {
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


  return (
    <div className="wrap">
      <div className="search">
        <div className="nav-box">
          <div className="nav-wrap">
            <div className={`discount fw700 fs20 lh30 ${isShowDiscount && "on"}`} onClick={showFranchiseDiscount} >
              <img src={starbucksImg} />
              <span>프렌차이즈 할인</span>
            </div>
            <div className={`discount fw700 fs20 lh30 ${isShowMore300 && "on"}`} onClick={showMore300Discount}>
              <img src={lowImg} />
              <span>300원 이상~</span>
            </div>
            <div className={`discount fw700 fs20 lh30 ${isShowMore500 && "on"}`} onClick={showMore500Discount}>
              <img src={mediumImg} />
              <span>500원 이상~</span>
            </div>
            <div className={`discount fw700 fs20 lh30 ${isShowMore1000 && "on"}`} onClick={showMore1000Discount}>
              <img src={highImg} />
              <span>1,000원 이상~</span>
            </div>
          </div>
          {isShowDiscount ? <DiscountWrap /> : null}
        </div>
      </div>
    </div>
  );
};

export default NavContainer;
