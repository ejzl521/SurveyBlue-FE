import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/JwtUtils";

const PrivateRoute = (props) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, setMenu, ....
  const {component: RouteComponent, setMenu, path, pathname} = props;
  const token = useSelector(state => state.Auth.token);
  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    alert('로그인이 필요한 페이지입니다!');
    return <Redirect to={`/signin?redirectUrl=${pathname}`}/>
  }

  // url 입력하고 설문조사 등록, 내 설문조사 접근 방지
  if (jwtUtils.getRole(token) !== "ROLE_MANAGER"){
    if(pathname === "/mysurvey" || pathname === "/addsurvey"){
      alert('관리자만 접근할 수 있습니다!');
      return <Redirect to={'/'}/>
    }
  }

  return (
    <Route
      path={path}
      render={
        props => <RouteComponent setMenu={setMenu} {...props}/>
      }
    />
  );
}

export default PrivateRoute;