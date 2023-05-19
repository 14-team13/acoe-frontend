import { isMobile } from 'react-device-detect';

const ShortCutKioskOrder = (props) => {

  const showKioskOrder = () => {
    props.setMarkerSetting('kiosk')
  }

  return (
    <div className={`flex-column mgb5 ${isMobile? 'mb-short-cut-component' : 'short-cut-component'}`} onClick={showKioskOrder}>
      <div className = 'kiosk-svg' />
      {!isMobile ? <div className="fw700 fs12 lh18">키오스크</div> : null}
    </div>
  );
};

export default ShortCutKioskOrder;
