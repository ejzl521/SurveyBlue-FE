import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {Layout, Menu} from "antd";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import {useDispatch, useSelector} from "react-redux";
import {jwtUtils} from "./utils/JwtUtils";
import {setToken} from "./redux/reducers/AuthReducer";
import './App.css';

import PrivateRoute from "./routes/PrivateRoute";
import AddSurvey from "./pages/add-survey/AddSurvey";
import SurveyList from "./pages/survey-list/SurveyList";
import SurveyView from "./pages/survey-view/SurveyView";
import MySurvey from "./pages/my-survey/MySurvey";
import SurveyInfo from "./pages/survey-info/SurveyInfo";
import EditSurvey from "./pages/edit-survey/EditSurvey";
import SurveyResult from "./pages/survey-result/SurveyResult";
import MyInfo from "./pages/my-info/MyInfo";
import Explain from "./pages/explain/Explain";

const {Header, Footer, Content} = Layout;

const App = (props: any) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("home");
  const [role, setRole] = useState("")
  const [isAuth, setIsAuth] = useState(false);
  const token = useSelector((state: any) => state.Auth.token);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
      setRole(jwtUtils.getRole(token));
    } else {
      setIsAuth(false);
    }
  }, [token]);

  const logout = () => {
    dispatch(setToken(''));
    setRole("");
  }

  return (
    <Layout>
      <Header style={{backgroundColor: "#212429"}}>
        <div
          className="logo"
          onClick={() => {
            props.history.push('/');
            setMenu("home");
          }}
        >
          Survey Blue
        </div>
        <Menu theme="dark" mode="horizontal"
              style={{backgroundColor: "#212429"}}
              selectedKeys={[menu]}
        >
          <Menu.Item
            key="explain"
            onClick={() => {
              props.history.push('/explain');
            }}
          >
            사용법
          </Menu.Item>
          <Menu.Item
            key="surveylist"
            onClick={() => {
              props.history.push('/surveylist?page_number=1');
            }}
          >
            설문조사 목록
          </Menu.Item>
          {role === "ROLE_MANAGER" && (
            <>
              <Menu.Item
                key="mysurvey"
                onClick={() => {
                  props.history.push(`/mysurvey?page_number=1`);
                }}
              >
                내가 등록한 설문조사
              </Menu.Item>
              <Menu.Item
                key="addsurvey"
                onClick={() => {
                  props.history.push('/addsurvey');
                }}
              >
                설문조사 등록
              </Menu.Item>
            </>
          )}

          {
            isAuth ? (
              <>
                <Menu.Item
                  key="myinfo"
                  onClick={() => {
                    props.history.push('/myinfo');
                    setMenu("myinfo");
                  }}
                >
                  내정보
                </Menu.Item>
                <Menu.Item
                  key="logout"
                  onClick={() => {
                    logout();
                    props.history.push('/');
                    setMenu("home");
                  }}
                >
                  로그아웃
                </Menu.Item>
              </>

            ) : (
              <>
                <Menu.Item
                  key="signup"
                  onClick={() => {
                    props.history.push('/signup');
                  }}
                >
                  회원가입
                </Menu.Item>
                <Menu.Item
                  key="signin"
                  onClick={() => {
                    props.history.push('/signin');
                  }}
                >
                  로그인
                </Menu.Item>
              </>
            )
          }

        </Menu>
      </Header>
      <Content>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/explain" render={(props) => <Explain setMenu={setMenu} {...props}/>}/>
            <Route path="/signup" render={(props) => <SignUp setMenu={setMenu} {...props}/>}/>
            <Route path="/signin" render={(props) => <SignIn setMenu={setMenu} {...props}/>}/>
            <PrivateRoute path="/addsurvey" pathname={props.location.pathname} setMenu={setMenu} component={AddSurvey}/>
            <Route exact path="/surveylist"
                   render={(props) => <SurveyList setMenu={setMenu} {...props}/>}/>
            <PrivateRoute path="/surveylist/:id" pathname={props.location.pathname} setMenu={setMenu}
                          component={SurveyView}/>
            <PrivateRoute exact path="/mysurvey" pathname={props.location.pathname} setMenu={setMenu}
                          component={MySurvey}/>
            <PrivateRoute exact path="/mysurvey/:id" pathname={props.location.pathname} setMenu={setMenu}
                          component={SurveyInfo}/>
            <PrivateRoute path="/mysurvey/edit/:id" pathname={props.location.pathname} setMenu={setMenu}
                          component={EditSurvey}/>
            <PrivateRoute path="/mysurvey/result/:id" pathname={props.location.pathname} setMenu={setMenu}
                          component={SurveyResult}/>
            <PrivateRoute path="/myinfo" pathname={props.location.pathname} setMenu={setMenu}
                          component={MyInfo}/>
          </Switch>
      </Content>
      <Footer style={{textAlign: "center", backgroundColor: "#212429", color: "#fff"}}>
        😎Duckgugong😎
      </Footer>
    </Layout>
  );
}

export default withRouter(App);