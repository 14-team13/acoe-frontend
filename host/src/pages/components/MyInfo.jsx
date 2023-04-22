
import myImage from 'img/google-logo.png'

const MyInfo = (props) => {

  const logOut = () => {

  }

  return (
    <div className="myinfo">
      <div className = "myinfo-user">
        <div className="flex-row">
          <img src={myImage} />
          <div className="flex-column mgl16">
            <div className = "mgb16">
              <div className="fw700 fs20 lh30 mgb4">예랑님</div>
              <div className="fw400 fs12 lh18 " >텀블러 한잔으로 오늘도</div>
              <div className="fw400 fs12 lh18 fc-primary">탄소배출을 00g 줄였어요! </div>
            </div>
            <div className="logout-btn" onClick={logOut}>로그아웃</div>
          </div>
        </div>
        <div className="divide" />
        <div className="">
          <div className = "mgb8 fw400 fs12 lh18 fc-gray">이용약관</div>
          <div className = "mgb8 fw400 fs12 lh18 fc-gray">개인정보처리방침</div>
          <div className = "fw400 fs12 lh18 fc-gray">위치기반서비스 이용약관</div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
