import React, { useEffect, useState } from "react";
import { setToken } from "../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtUtils } from "../utils/JwtUtils";
import "./header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const token = useSelector((state) => state.Auth.token);

  const logout = () => {
    dispatch(setToken(""));
    setRole("");
  };

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
      setRole(jwtUtils.getRole(token));
    } else {
      setIsAuth(false);
    }
  }, [token]);
  return (
    <div className="header-wrapper">
      <div
        className="header-logo"
        onClick={() => {
          navigate("/");
        }}
      >
        Survey Blue
      </div>
      <div className="header-menu">
        <div
          className="header-menu-item"
          onClick={() => {
            navigate("/explain");
          }}
        >
          사용법
        </div>
        <div
          className="header-menu-item"
          onClick={() => {
            navigate("/surveylist?page_number=1");
          }}
        >
          설문조사 목록
        </div>
        {role === "ROLE_MANAGER" && (
          <>
            <div
              className="header-menu-item"
              onClick={() => {
                navigate("/mysurvey?page_number=1");
              }}
            >
              내가 등록한 설문조사
            </div>
            <div
              className="header-menu-item"
              onClick={() => {
                navigate("/addsurvey");
              }}
            >
              설문조사 등록
            </div>
          </>
        )}

        {isAuth ? (
          <>
            <div
              className="header-menu-item"
              onClick={() => {
                navigate("/myinfo");
              }}
            >
              내정보
            </div>
            <div
              className="header-menu-item"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div
              className="header-menu-item"
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </div>
            <div
              className="header-menu-item"
              onClick={() => {
                navigate("/signin");
              }}
            >
              로그인
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
