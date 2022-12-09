import React,{useState} from "react";

const AuthContext = React.createContext({
    isLoggedIn:false,
    token:'',
    login:(token) =>{
        console.log("token: " + token);
    },
    logout:() =>{}
})
export const AuthContextProvider = (props) => {
    const localToken = localStorage.getItem('token');
    const [token, setToken] = useState(localToken);
    const userIsLoggedIn = !!token;
    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem('token',token)
    }
    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext