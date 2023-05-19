import { isMobile } from 'react-device-detect';

const ShortCutAppOrder = (props) => {

  const showAppOrder = () => {
    props.setMarkerSetting('app')
  }

  return (
    <div className={`flex-column mgb5 ${isMobile? 'mb-short-cut-component' : 'short-cut-component'}`} onClick={showAppOrder}>
      <div className='app-svg' />
      {!isMobile ? <div className="fw700 fs12 lh18" style={{ wordBreak: "keep-all" }}>앱 주문</div> : null}
    </div>
  );
};

export default ShortCutAppOrder;
