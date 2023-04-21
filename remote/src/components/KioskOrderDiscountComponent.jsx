import kioskDiscount from 'images/kioskDiscount.svg';

const KioskOrderDiscountComponent = (props) => {

  return (
    <div className = "flex-row-center">
        <img className = "mgr9" src={kioskDiscount}/>
      <div className = "fw700 fs12 lh18 fc-gray">키오스크 할인 가능</div>
    </div>
  );
};

export default KioskOrderDiscountComponent;
