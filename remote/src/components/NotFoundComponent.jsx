import notfoundSvg from 'images/notfound.svg';

const NotFoundComponent = (props) => {

    return (
        <div className = "not-found">
        <div className = "flex-column-center">
          <img className="mgt70" src={notfoundSvg}/>
          <div className = "fw400 fs16 lh24 mgt10">앗! 이 근처에는</div>
          <div className = "fw400 fs16 lh24 mgt3 mgb20">찾으시는 카페가 없어요.</div>
        </div>             
        <div className = "not-found-box">
          <div className = "fw700 fs14 lh21 mgb10">이건 어때요? </div>
          <div className = "fw700 fs12 lh18 fc-gray mgb4">* 카페 이름을 정확히 검색해 보세요. </div>
          <div className = "fw700 fs12 lh18 fc-gray mgb4">  (예 : 스타 벅스 ? 스타벅스) </div>
          <div className = "fw700 fs12 lh18 fc-gray">* ACOE에서 준비한 프랜차이즈 카페 필터를 활용해보세요.</div>
        </div>
    </div>
    );
  };
  
  export default NotFoundComponent;
  