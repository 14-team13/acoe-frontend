
import myImage from 'img/google-logo.png'

const MyInfo = (props) => {
  const logOut = () => {
    
  }
  
  return (
    <div className="myinfo">
      <div className = "flex_row">
          <img src={myImage} />
        <div className = "flex_column mgl16">
          <div className = "myinfo-text">
            <div className = "bold body1 lh30 mgb4">예랑님</div>
            <div className = "regular body4 lh18 " >텀블러 한잔으로 오늘도</div>
            <div className = "regular body4 lh18 primary_txt">탄소배출을 00g 줄였어요! </div>
          </div>
          <div className = "small-btn" onClick={logOut}>로그아웃</div>
        </div>
      </div>
      <div className="divide"/>
      <div className="commercial-text">
        <div>이용약관</div>
        <div>개인정보처리방침</div>
        <div>위치기반서비스 이용약관</div>
      </div>
    </div>
  );
};

export default MyInfo;
