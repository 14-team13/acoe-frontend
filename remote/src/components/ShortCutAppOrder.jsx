
const ShortCutAppOrder = (props) => {

  const showAppOrder = () => {
    props.setMarkerSetting('app')
  }

  return (
    <div className="short-cut-component flex-column mgb5" onClick={showAppOrder}>
      <div className = 'app-svg' />
      <div className="fw700 fs12 lh18" style = {{wordBreak: "keep-all"}}>앱 주문</div>
    </div>
  );
};

export default ShortCutAppOrder;
