import { useState,useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import {useNavigate} from 'react-router-dom';
const AuthForm = () => { 
  const cntx = useContext(AuthContext);
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef();
  const password = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) =>{
    event.preventDefault(); 
    const user_email = email.current.value;
    const user_password = password.current.value;
    if(isLogin){
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
      AIzaSyAHRVXCasMjXJe5uqG-YOwlU68eEzz1mo0`,{
        method : "POST",
        body:JSON.stringify({
          email:user_email,
          password:user_password,
          returnSecureToken:true
        }),
        headers:{'Content-type':'application/json'}
      }).then(res =>{
        if(res.ok){
          res.json().then(resp=>{ 
            cntx.login(resp.idToken);
            navigate("/");
          })
         
         }else 
        {
          return res.json().then(data =>{
            let message = "Authentication Failed!..."
            if(data&&data.error.message){
              message = data.error.message
            }
            alert(message);
          })
        }
      })
    }else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
      AIzaSyAHRVXCasMjXJe5uqG-YOwlU68eEzz1mo0`,{
        method : "POST",
        body:JSON.stringify({
          email:user_email,
          password:user_password,
          returnSecureToken:true
        }),
        headers:{'Content-type':'application/json'}
      }).then(res =>{
        if(res.ok){
          console.log(res.json());
          navigate("/");
        }else 
        {
          return res.json().then(data =>{
            let message = "Authentication Failed!..."
            if(data&&data.error.message){
              message = data.error.message
            }
            alert(message);
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref = {email} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref = {password} id='password' required />
        </div>
        <div className={classes.actions}>
          <button onClick = {submitHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
