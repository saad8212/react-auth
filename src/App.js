 import { Routes, Route, useNavigate} from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import AuthContext from './store/auth-context';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import React,{useContext} from 'react';
function App(props) { 
  const cntx = useContext(AuthContext); 
  return (
    <Layout>
      <Routes>
        <Route path='/' element = {<HomePage />}/>
        <Route path='/auth' element = {!cntx.isLoggedIn && <AuthPage/>}/>
        <Route path='/profile' element = {cntx.isLoggedIn &&<UserProfile />}/>
      </Routes>
    </Layout>
  );
}

export default App;
