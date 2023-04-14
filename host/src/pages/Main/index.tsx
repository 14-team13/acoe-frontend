import React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { loginsuccess, logout } from '@api/main';
import { HostContainer, HostWrap } from './styles';

// TODO
const StartBtn = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  position: absolute;
  width: 193px;
  height: 54px;
  right: 22px;
  top: 22px;
  background: #2f44ff;
  border-radius: 100px;
  font-weight: 700;
  line-height: 30px;
  color: #ffffff;
  z-index: 2;
  font-size: 16px;
`;

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const Menu = React.lazy(() =>
    // @ts-ignore
    import('remote/Menu').then((module) => {
      return { default: module.Menu };
    })
  );

  useEffect(() => {
    (async () => {
      const { data } = await loginsuccess();
      try {
        if (data) {
          setIsLogin(true);
          setUser({ email: data.email, username: data.username });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setUser]);

  const logoutPage = async () => {
    const data = await logout();
    if (data.status === 200) {
      window.open('/login', '_self');
    }
  };

  return (
    <div className='App'>
      <HostContainer>
        <HostWrap>
          {isLogin ? (
            <div>
              <span>{user.username}</span>

              <button onClick={logoutPage} className='loginButton'>
                Logout
              </button>
            </div>
          ) : (
            // <div>
            //   <a href='/signup'>회원가입</a>
            //   <a href='/login'>로그인</a>
            // </div>
            <StartBtn>텀블러 여정 시작하기</StartBtn>
          )}
        </HostWrap>
        <div>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Menu />
          </React.Suspense>
        </div>
      </HostContainer>
    </div>
  );
};

export default Main;
