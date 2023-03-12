import React from "react";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { userState } from "host/atoms";
import { countState } from "host/atoms";

export const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  const user = useRecoilValue(userState);
  const resetCount = useResetRecoilState(countState);

  const increase = () => {
    setCount(count + 1);
  };

  const reset = () => {
    resetCount();
  };

  return (
    <div>
      <div>
        <div>{user.email}</div>
        <div>{user.username}</div>
      </div>
      <h2>{count}</h2>
      <button onClick={() => increase()}>+</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};
