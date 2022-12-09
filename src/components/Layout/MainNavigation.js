import { Link, useNavigate } from 'react-router-dom';
import React,{useContext} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const cntx = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(cntx);
  let isLoggedIn = cntx.isLoggedIn;
  console.log(isLoggedIn);
  const logoutHandler = () =>{
    cntx.logout(); 
    navigate("/auth")
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!isLoggedIn&&<Link to='/auth'>Login</Link>}
          </li>
          <li>
            {isLoggedIn&& <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {isLoggedIn&&<button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
