import appDiscountSvg from 'images/appDiscount.svg';

const AppOrderDiscountComponent = (props) => {

  return (
    <div className = "flex-row-center">
        <img className = "mgr9" src={appDiscountSvg}/>
       <div className="fw700 fs10 lh18 fc-gray">앱 주문 할인 가능</div>
    </div>
  );
};

export default AppOrderDiscountComponent;
