import './App.css';
import loadable from '@loadable/component';
import { Routes, Route} from 'react-router-dom';

const LogIn = loadable(() => import('./pages/LogIn'));
const SignUp = loadable(() => import('./pages/SignUp'));
const Menu = loadable(() => import('./layouts/Menu'));

const App = () => (
  <Routes>
    <Route path="/" element={<div>main</div>} />
    <Route path="/login" element={<LogIn />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/menu/:menu" element={<Menu/>} />
  </Routes>
);

export default App;
