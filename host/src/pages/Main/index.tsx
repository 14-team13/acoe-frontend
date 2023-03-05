import React from 'react';

const Main = () => {

  const Menu = React.lazy(() =>
    // @ts-ignore
    import("remote/Menu").then((module) => {return {default: module.Menu};
    })
  );


  return (
    <div className="App">
      <div> 여기가 Host </div>
      <div> AOCE </div>
      <div> 
        <a href="/signup">회원가입</a>
        <a href="/login">로그인</a>
      </div>
      <div>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Menu/>
        </React.Suspense>
      </div>
    </div>
  );
};

export default Main;