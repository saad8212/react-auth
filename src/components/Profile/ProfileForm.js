import classes from './ProfileForm.module.css';
import React,{useContext} from 'react';
import { useNavigate} from 'react-router-dom';

import AuthContext from '../../store/auth-context';
const ProfileForm = () => { 
  const cntx = useContext(AuthContext);
  console.log(cntx.token);
  const navigate = useNavigate();
  const updateHandler = async(event) =>{
    event.preventDefault();
    let password = event.target.new_password.value;
    //validation
    const update_password = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAHRVXCasMjXJe5uqG-YOwlU68eEzz1mo0`,{
      method:"post",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        password:password,
        idToken:cntx.token,
        returnSecureToken:false
      }),
    });
    const jsonData = await update_password.json();

    console.log(jsonData);
    return navigate("/");
  }
  return (
    <form className={classes.form} onSubmit = {updateHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' name = "new_password"/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
