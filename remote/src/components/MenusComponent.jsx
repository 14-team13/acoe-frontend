
import acoeTumblerSvg from 'images/acoe-tumbler.svg';


const MenusComponent = (props) => {

  return (
    <div className = "cafe-menu">
      <div className = "flex_row mg16">
        <img src={acoeTumblerSvg} />
        <div className = "flex_column mgl16">
        <div className = "fw400 fs14 lh21">	{props.menu} </div>
        <div className = "flex_row mgt3">
          <div className = "fw700 fs16 lh24">{props.price}원</div>
          <div className = "fw700 fs16 lh24 fc-primary mgl8">{props.price - props.discountprice}원</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MenusComponent;
