
import naverFinder from 'images/naverFinder.svg';


const NaverFinderComponent = (props) => {

  return (
    <div className="flex-row-center">
      <img className = "mgt1 mgr4" src={naverFinder} />
      <div className="fw700 fs10 lh18 fc-naver mgt3">네이버 길찾기</div>
    </div>
  );
};

export default NaverFinderComponent;
