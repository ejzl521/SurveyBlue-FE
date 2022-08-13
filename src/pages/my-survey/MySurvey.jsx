import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Card, Pagination } from "antd";
import img from "../../images/logo.png";
import "./mysurvey.scss";
import { useSelector } from "react-redux";
import { jwtUtils } from "../../utils/JwtUtils";
import { useNavigate, useSearchParams } from "react-router-dom";

const MySurvey = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useSelector((state) => state.Auth.token);
  const [surveyList, setSurveyList] = useState({
    surveys: [],
    page_size: 1,
    page_number: 1,
    total: 1,
  });
  const getSurveyList = async (page_number) => {
    const res = await api.get(`/api/survey/list?user_id=${jwtUtils.getId(token)}&page_number=${page_number}`);
    setSurveyList(res.data);
  };
  useEffect(() => {
    const page_number = searchParams.get("page_number");
    getSurveyList(Number(page_number));
  }, []);

  return (
    <div className="mysurvey-wrapper">
      <div className="surveylist">
        {surveyList.surveys.map((item, idx) => (
          <Card
            key={idx}
            className="survey-card"
            hoverable
            cover={<img alt="example" src={img} />}
            onClick={() => {
              navigate(`/mysurvey/${item.id}`);
            }}
          >
            <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username} />
          </Card>
        ))}
      </div>
      <div className="surveylist-footer">
        <div className="surveylist-paging">
          <Pagination
            onChange={(page_number) => {
              navigate(`/mysurvey?page_number=${page_number}`);
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
export default MySurvey;
