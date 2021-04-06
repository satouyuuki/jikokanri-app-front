import React from "react";
import { Redirect } from "react-router-dom"
import { Cookie } from "service/cookieService";

interface Props { 
  children?: React.ReactNode;
};
const Auth = (props: Props) => (new Cookie().isLoggedIn ? <>{props.children}</> : <Redirect to={'/login'} />)

export default Auth;