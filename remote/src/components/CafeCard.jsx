import appDiscountSvg from 'images/appDiscount.svg';
import kioskDiscount from 'images/kioskDiscount.svg';
import naverFinder from 'images/naverFinder.svg';



const CafeCard = (props) => {

  const findCafe = (item) => {
    props.setCafeID(item.cafeId)
  }

  return (
    <div className="cafe-card" onClick={() => findCafe(props)}>
      <div className="cafe-title">{props.cafeTitle}</div>
      <div className="flex_row mgt4 mgb35">
        <div className="cafe-address">{props.cafeAddress}</div>
        <div className="cafe-naver"><img src={naverFinder} />네이버 길찾기</div>
      </div>
      <div className="bottom-wrap">
        <div>
          <div><img src={appDiscountSvg} />앱 주문 할인가능 </div>
          <div><img src={kioskDiscount} />키오스크 할인기능 </div>
        </div>
        <div>
          <div> 아메카리노 S </div>
          <div> 500원 할인   </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;
