import { useEffect} from 'react';
import FranchiseCard from 'components/FranchiseCard'
import { BrowserView, MobileView } from 'react-device-detect';

const DiscountWrap = (props: any) => {

  useEffect(() => {
    console.log(props.logoCafes)
  }, [props.logoCafes])


  return (
    <>
      <MobileView>
        <div className="mb-franchise">
          {props.logoCafes.map((logoCafe: any, i: number) => ( //type 수정 필요 
            <FranchiseCard
              key={i}
              logoImg={logoCafe.logoImg}
              name={logoCafe.franchiseNm}
              discountInfo={logoCafe.discountAmt}
            />
          ))}
        </div>
      </MobileView>
      <BrowserView>
        <div className="franchise">
          {props.logoCafes.map((logoCafe: any, i: number) => ( //type 수정 필요 
            <FranchiseCard
              key={i}
              logoImg={logoCafe.logoImg}
              name={logoCafe.franchiseNm}
              discountInfo={logoCafe.discountAmt}
            />
          ))}
        </div>
      </BrowserView>
    </>
  );
};

export default DiscountWrap;
