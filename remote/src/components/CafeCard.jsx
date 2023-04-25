import NaverFinderComponent from 'components/NaverFinderComponent';
import AppOrderDiscountComponent from 'components/AppOrderDiscountComponent';
import KioskOrderDiscountComponent from 'components/KioskOrderDiscountComponent';



const CafeCard = (props) => {

  const findCafe = (item) => {
    // console.log(item)
    props.setCafeID((props) => item.cafeId)
    props.setModalState(2);
  }

  return (
    <div className="cafe-card" onClick={() => findCafe(props)}>
      <div className="fw700 fs18 lh30">{props.cafeTitle}</div>
      <div className="fw400 fs12 lh18">{props.cafeAddress}</div>
      <div className="mgt4"><NaverFinderComponent /></div>
      <div className="bottom-wrap mgt24">
        <div>
          <div className="mgb8">
            <AppOrderDiscountComponent />
          </div>
          <div>
            <KioskOrderDiscountComponent />
          </div>
        </div>
        <div className="mgt4">
          <div className="flex-row-end fw400 fs12 lh18 fc-gray mgt3"> {props.menu1} | {props.menu1_price}원</div>
          <div className="flex-row-end fw700 fs22 lh36 fc-third"> {props.discountprice}원 할인   </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
