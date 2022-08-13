import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtUtils } from "../utils/JwtUtils";

const PrivateRoute = (props) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path,
  const { component: RouteComponent, path } = props;
  const token = useSelector((state) => state.Auth.token);
  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    alert("로그인이 필요한 페이지입니다!");
    return <Navigate to={`/signin?redirectUrl=${path}`} />;
  }

  // url 입력하고 설문조사 등록, 내 설문조사 접근 방지
  if (jwtUtils.getRole(token) !== "ROLE_MANAGER") {
    if (path.split("/")[0] === "/mysurvey" || path.split("/")[0] === "/addsurvey") {
      alert("관리자만 접근할 수 있습니다!");
      return <Navigate to="/" />;
    }
  }

  return <RouteComponent />;
};

export default PrivateRoute;
