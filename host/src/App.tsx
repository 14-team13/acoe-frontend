import loadable from '@loadable/component';
import { Routes, Route } from 'react-router-dom';

const Main = loadable(() => import('@pages/Main'));
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Menu = loadable(() => import('@layouts/Menu'));


const App = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/login' element={<LogIn />} />
    <Route path='/oauth/redirect' element={<SignUp />} />
    <Route path='/menu' element={<Menu />} />
  </Routes>
);

export default App;
