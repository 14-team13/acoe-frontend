import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import useInput from '@hooks/useInput';
import {
  Button,
  Error,
  Form,
  Header,
  Input,
  Label,
  LinkContainer,
} from '@pages/SignUp/styles';
import { login } from '@api/main';
import { authState } from 'store/auth';

const LogIn = () => {
  // const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [userInfo, setUserInfo] = useRecoilState(authState);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError(false);
      const response = await login(email, password);
      if (response.status === 200) {
        // localStorage에 유저 정보 저장
        setUserInfo(response.data.userInfo);
        window.open('/', '_self');
      }
    },
    [email, password, setUserInfo]
  );

  console.dir(userInfo);

  return (
    <div id='container'>
      <Header>ACOE</Header>
      <Form onSubmit={onSubmit}>
        <Label id='email-label'>
          <span>이메일 주소</span>
          <div>
            <Input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChangeEmail}
            />
          </div>
        </Label>
        <Label id='password-label'>
          <span>비밀번호</span>
          <div>
            <Input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChangePassword}
            />
          </div>
          {logInError && (
            <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>
          )}
        </Label>
        <Button type='submit'>로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href='/signup'>회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
