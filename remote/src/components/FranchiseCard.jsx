import { BrowserView, MobileView } from 'react-device-detect';


const FranchiseCard = (props) => {

  return (
    <>
      <MobileView>
        <div className="mb-franchise-card">
          <div className="mb-franchise-img">
            <img 
              src={`data:image/jpg;base64,${props.logoImg}`} 
            />
          </div>
          <div className="pd10">
            <div className="fw400 fs12 lh18 fc-gray">{props.name}</div>
            <div className="fw700 fs14 lh24">{props.discountInfo}원 할인</div>
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className="franchise-card">
          <div className="franchise-img">
            <img src={`data:image/jpg;base64,${props.logoImg}`} />
          </div>
          <div className="pd10">
            <div className="fw400 fs12 lh18 fc-gray">{props.name}</div>
            <div className="fw700 fs14 lh24">{props.discountInfo}원 할인</div>
          </div>
        </div>
      </BrowserView>
    </>

  );
};

export default FranchiseCard;
