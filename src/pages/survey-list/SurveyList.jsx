import { useEffect, useState } from "react";
import { Badge, Card, Pagination } from "antd";
import "./surveylist.scss";
import img from "../../images/logo.png";
import api from "../../utils/api";
import { jwtUtils } from "../../utils/JwtUtils";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const SurveyList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page_number = searchParams.get("page_number");
  const [surveyList, setSurveyList] = useState({
    surveys: [],
    page_size: 1,
    page_number: 1,
    total: 1,
  });

  const token = useSelector((state) => state.Auth.token);
  const [user_response, setUser_response] = useState([]);
  const getSurveyList = async (page_number) => {
    const res = await api.get(`/api/survey/list?page_number=${page_number}`);
    setSurveyList(res.data);
  };
  const getUserResponseSurvey = async (id) => {
    const res = await api.get(`/api/result/user_result/${id}`);
    setUser_response(res.data);
  };
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      getUserResponseSurvey(jwtUtils.getId(token));
    }
    getSurveyList(Number(page_number));
  }, []);

  return (
    <div className="surveylist-wrapper">
      <div className="surveylist">
        {surveyList.surveys.map((item, idx) =>
          // 이미 참여한 설문조사는 Badge를 보여주고 이미 참여했다는 alert 창을 보여준다!
          user_response.find((i) => i === item.id) ? (
            <Badge.Ribbon
              key={idx}
              text={<div style={{ color: "#254275", fontSize: "0.9em" }}>이미 참여함</div>}
              color="#ffd966"
            >
              <Card
                className="survey-card"
                hoverable
                cover={<img className="survey-image" alt="example" src={img} />}
                onClick={() => {
                  alert("이미 참여한 설문조사입니다!");
                }}
              >
                <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username} />
              </Card>
            </Badge.Ribbon>
          ) : (
            <Card
              key={idx}
              className="survey-card"
              hoverable
              cover={<img className="survey-image" alt="example" src={img} />}
              onClick={() => {
                navigate(`/surveylist/${item.id}`);
              }}
            >
              <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username} />
            </Card>
          ),
        )}
      </div>
      <div className="surveylist-footer">
        <div className="surveylist-paging">
          <Pagination
            onChange={(page_number) => {
              navigate(`/surveylist?page_number=${page_number}`);
            }}
            defaultCurrent={surveyList.page_number}
            pageSize={8}
            total={surveyList.total}
          />
        </div>
      </div>
    </div>
  );
};
export default SurveyList;
