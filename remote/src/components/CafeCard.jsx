import NaverFinderComponent from 'components/NaverFinderComponent';
import AppOrderDiscountComponent from 'components/AppOrderDiscountComponent';
import KioskOrderDiscountComponent from 'components/KioskOrderDiscountComponent';
import { isMobile } from 'react-device-detect';



const CafeCard = (props) => {

  const findCafe = (item) => {
    props.setCafeID({...item})
    if (isMobile) {
      props.setMobileModalState(3);
    } else {
      props.setModalState(2);
    }

  }

  return (
    <div className="cafe-card" onClick={() => findCafe(props)}>
      <div className="fw700 fs18 lh30">{props.cafeTitle}</div>
      <div className="fw400 fs12 lh18">{props.cafeAddress}</div>
      <div className="mgt4"><NaverFinderComponent /></div>
      <div className="bottom-wrap mgt24">
        <div>
          <div className="mgb8">
            {props.appOrderYn ? <AppOrderDiscountComponent /> : null}
          </div>
          <div>
            {props.kioskYn ? <KioskOrderDiscountComponent /> : null}
          </div>
        </div>
        <div className="mgt4">
          <div className="flex-row-end fw400 fs12 lh18 fc-gray mgt3">
            {props.menuNm} | {props.price}원
          </div>
          <div className="flex-row-end fw700 fs22 lh36 fc-third"> {props.discountAmt ? props.discountAmt : 0}원 할인   </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
