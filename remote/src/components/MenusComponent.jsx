
import acoeTumblerSvg from 'images/acoe-tumbler.svg';


const MenusComponent = (props) => {

  return (
    <div className = "cafe-menu">
      <div className = "flex_row mg16">
        <img src={acoeTumblerSvg} />
        <div className = "flex_column mgl16">
        <div className = "fw400 fs14 lh21">	아메리카노 </div>
        <div className = "flex_row mgt3">
          <div className = "fw700 fs16 lh24">4500원</div>
          <div className = "fw700 fs16 lh24 fc-primary mgl8">4200원</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MenusComponent;
