const BlogReviewComponent = (props) => {

  return (
    <div className = "cafe-blog mgt24" href = {props.blogLink}>
      <div className = "fw400 fs12 lh18 fc-gray mgb8">{props.blogNm}</div>
      <div className = "fw700 fs16 lh24 mgb8">{props.title}</div>
      <div className = "fw400 fs14 lh21 mgb4">{props.desc}</div>
      <div className = "fw400 fs12 lh18 fc-gray mgb25">{props.postDt}</div>
    </div>
  );
};

export default BlogReviewComponent;
