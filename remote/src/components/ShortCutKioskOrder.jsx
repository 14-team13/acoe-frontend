
const ShortCutKioskOrder = (props) => {

  const showKioskOrder = () => {
    props.setMarkerSetting('kiosk')
  }

  return (
    <div className="short-cut-component flex-column mgb5" onClick={showKioskOrder}>
      <div className = 'kiosk-svg' />
      <div className="fw700 fs12 lh18">키오스크</div>
    </div>
  );
};

export default ShortCutKioskOrder;
