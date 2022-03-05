import {useEffect, useState} from "react";
import api from "../../utils/api";
import {Card, Pagination} from "antd";
import img from "../../images/logo.png";
import "./mysurvey.scss";
import {useSelector} from "react-redux";
import {jwtUtils} from "../../utils/JwtUtils";
import queryString from "query-string";

const MySurvey = (props: any) => {
  const token = useSelector((state: any) => state.Auth.token);
  const [surveyList, setSurveyList]: any = useState({
    surveys: [],
    page_size: 1,
    page_number: 1,
    total: 1
  });
  const getSurveyList = async (page_number: number) => {
    const res = await api.get(
      `/api/survey/list?user_id=${jwtUtils.getId(token)}&page_number=${page_number}`);
    setSurveyList(res.data);
  }
  useEffect(()=>{
    const page_number = queryString.parse(props.history.location.search).page_number;
    props.setMenu("mysurvey");
    getSurveyList(Number(page_number));
  }, [props]);

  return (
    <div className="mysurvey-wrapper">
      <div className="surveylist">
          {surveyList.surveys.map((item: any, idx: number)=>(
              <Card
                key={idx}
                className="survey-card"
                hoverable
                cover={<img alt="example" src={img}/>}
                onClick={()=>{props.history.push(`/mysurvey/${item.id}`)}}
              >
                <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username}/>
              </Card>
          ))}
      </div>
      <div className="surveylist-footer">
        <div className="surveylist-paging">
          <Pagination
            onChange={(page_number: number) => {
              props.history.push(`/mysurvey?page_number=${page_number}`)
            }}
            defaultCurrent={surveyList.page_number}
            pageSize={surveyList.page_size}
            total={surveyList.total}
          />
        </div>
      </div>
    </div>
  );
}
export default MySurvey;