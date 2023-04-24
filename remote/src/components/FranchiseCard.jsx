const FranchiseCard = (props) => {

  return (
    <div className="franchise-card">
      <div className = "franchise-img">
        <img src={props.src} />
      </div>
      <div className = "pd10">
        <div className = "fw400 fs12 lh18 fc-gray">{props.name}</div>
        <div className = "fw700 fs14 lh24">{props.discountInfo}</div>
      </div>
    </div>
  );
};

export default FranchiseCard;
