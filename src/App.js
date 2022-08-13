import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import "./App.scss";
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
import Header from "./components/Header";

const App = () => {
  const location = useLocation();
  return (
    <div className="surveyblue-wrapper">
      <div className="surveyblue-header">
        <Header />
      </div>
      <div className="surveyblue-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/addsurvey" element={<PrivateRoute path="/addsurvey" component={AddSurvey} />} />
          <Route path="/surveylist" element={<SurveyList />} />
          <Route path="/surveylist/:id" element={<PrivateRoute path={location.pathname} component={SurveyView} />} />
          <Route path="/mysurvey" element={<PrivateRoute path="/mysurvey" component={MySurvey} />} />
          <Route path="/mysurvey/:id" element={<PrivateRoute path={location.pathname} component={SurveyInfo} />} />
          <Route path="/mysurvey/edit/:id" element={<PrivateRoute path={location.pathname} component={EditSurvey} />} />
          <Route
            path="/mysurvey/result/:id"
            element={<PrivateRoute path={location.pathname} component={SurveyResult} />}
          />
          <Route path="/myinfo" element={<PrivateRoute path="/myinfo" component={MyInfo} />} />
        </Routes>
      </div>
      <div className="surveyblue-footer">😎Duckgugong😎</div>
    </div>
  );
};

export default App;
