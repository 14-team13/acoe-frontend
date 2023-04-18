const FranchiseCard = (props) => {

  return (
    <div className="franchise-card">
      <div className = "franchise-img">
        <img src={props.src} />
      </div>
      <div className = "pd10">
        <div className = "franchise-name">{props.name}</div>
        <div className = "franchise-price">{props.discountInfo}</div>
      </div>
    </div>
  );
};

export default FranchiseCard;
