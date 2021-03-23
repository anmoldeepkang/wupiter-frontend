import React, {FC, useContext,useEffect} from "react";
import {Route, RouteProps} from "react-router";
import {UserContext, UserContextModel} from "../context";
import {Redirect} from "react-router-dom";
import authService from "./AuthService";
import {Home} from "../../components/pages";

export const PrivateRoute: FC<RouteProps> = ({children, ...rest}) => {
  const {setUser, user} = useContext<UserContextModel>(UserContext);


  return (
    <Route {...rest}>
      {user ? (
        <>{children}</>
      ) : (
        <Redirect to='/'/>
      )
      }
    </Route>
  )
}
