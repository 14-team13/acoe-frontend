import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import { login } from '@api/main';
import { authState } from 'store/auth';
import googleLogo from '../../img/google-logo.png';


const LogIn = () => {
  // const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [userInfo, setUserInfo] = useRecoilState(authState);

  const keys = {
    redirectUri: "http://localhost:3000/oauth2/redirect",
    apiBaseUrl: "http://localhost:8080"
  };
  const API_BASE_URL = keys.apiBaseUrl;
  const ACCESS_TOKEN = "accessToken";
  const OAUTH2_REDIRECT_URI = keys.redirectUri;
  const GOOGLE_AUTH_URL = 'http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect'


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
      <div className="social-signup">
          <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
              <img src={googleLogo} alt="Google" /> Sign up with Google</a>
      </div>
    </div>
  );
};

export default LogIn;
