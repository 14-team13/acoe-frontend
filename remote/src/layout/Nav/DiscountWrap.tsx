import FranchiseCard from 'components/FranchiseCard'
import paulSvg from 'images/paul.svg';
import starbucksSvg from 'images/starbucks.svg';
import angelinusSvg from 'images/angelinus.svg';
import coffeebeanSvg from 'images/coffeebean.svg';
import ediyaSvg from 'images/ediya.svg';
import hollysSvg from 'images/hollys.svg';
import passcucciSvg from 'images/passcucci.svg';
import twosomeSvg from 'images/twosome.svg';


const DiscountWrap = () => {
  return (

    <div className="franchise">
      <FranchiseCard
        src={paulSvg}
        name={"폴바셋"}
        discountInfo={"500원 할인"}
      />
      <FranchiseCard
        src={starbucksSvg}
        name={"STARBUCKS"}
        discountInfo={"400 할인"}
      />
      <FranchiseCard
        src={angelinusSvg}
        name={"angelinus"}
        discountInfo={"400 할인"}
      />
      <FranchiseCard
        src={twosomeSvg}
        name={"twosomeplace"}
        discountInfo={"300 할인"}
      />
      <FranchiseCard
        src={coffeebeanSvg}
        name={"coffeebean"}
        discountInfo={"300 할인"}
      />
      <FranchiseCard
        src={hollysSvg}
        name={"hollys"}
        discountInfo={"300 할인"}
      />
      <FranchiseCard
        src={passcucciSvg}
        name={"pascucci"}
        discountInfo={"500원 할인"}
      />
      <FranchiseCard
        src={ediyaSvg}
        name={"ediya"}
        discountInfo={"300 할인"}
      />
    </div>
  );
};

export default DiscountWrap;
