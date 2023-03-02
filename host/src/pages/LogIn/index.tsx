import React from 'react';

const LogIn = () => {

  const Card = React.lazy(() =>
    // @ts-ignore
    import("remote/Card").then((module) => {
      return {
        default: module.Card,
      };
    })
  );


  return (
    <div className="App">
      <header className="App-header">
        LogIn
      </header>
      <div style={{ margin: 20 }}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Card />
        </React.Suspense>
      </div>
    </div>
  );
};

export default LogIn;