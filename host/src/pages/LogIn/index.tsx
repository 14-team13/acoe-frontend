import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';

const LogIn = () => {
  // const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLogInError(false);
    axios.post('/login', // 임시 server 
      { email, password }, {
      withCredentials: true
    })
      .then((response) => {
        if (response.status === 200) {
          // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          window.open('/', '_self')
        }
      })
      .catch((error) => {
        console.log("error")
        setLogInError(error.response?.data?.code === 401);
      });
  },
    [email, password],
  );

  return (
    <div id="container">
      <Header>ACOE</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;