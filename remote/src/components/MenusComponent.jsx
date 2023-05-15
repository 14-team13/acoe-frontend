import React, { useState, useEffect } from 'react';

const MenusComponent = (props) => {

  const [image, setImage] = useState(null);

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const loadImage = async () => {
      const { default: myImage } = await import(`images/C_tumbler${rand(1, 5)}.svg`);
      setImage(myImage);
    };
    loadImage();
  }, []);


  return (
    <div className="cafe-menu">
      <div className="flex-row mg8">
        {/* <img src={`images/C_tumbler${rand(1, 5)}.svg`} /> */}
        <img src={image} />
        <div className="flex-column mgl16">
          <div className="fw400 fs14 lh21">	{props.menuNm} </div>
          <div className="flex-row mgt3">
            <div className="fw700 fs14 lh24">{props.price}원</div>
            <div className="fw700 fs14 lh24 fc-primary mgl8">{props.price - props.discountAmt}원</div>
          </div>
          <div className="discount-rec"></div>
        </div>
      </div>
    </div>
  );
};

export default MenusComponent;
