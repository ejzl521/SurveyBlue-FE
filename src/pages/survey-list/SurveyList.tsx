import {useEffect, useState} from "react";
import {Badge, Card, Pagination} from 'antd';
import "./surveylist.scss";
import img from "../../images/logo.png"
import api from "../../utils/api";
import queryString from "query-string";
import {jwtUtils} from "../../utils/JwtUtils";
import {useSelector} from "react-redux";

const SurveyList = (props: any) => {

  const [surveyList, setSurveyList]: any = useState({
    surveys: [],
    page_size: 1,
    page_number: 1,
    total: 1,
  });

  const token = useSelector((state: any) => state.Auth.token);
  const [user_response, setUser_response] = useState([])
  const getSurveyList = async (page_number: number) => {
    const res = await api.get(`/api/survey/list?page_number=${page_number}`);
    setSurveyList(res.data);
  }
  const getUserResponseSurvey = async (id: number) => {
    const res = await api.get(`/api/result/user_result/${id}`)
    setUser_response(res.data);
  }
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      getUserResponseSurvey(jwtUtils.getId(token));
    }
    const page_number = queryString.parse(props.history.location.search).page_number;
    props.setMenu("surveylist");
    getSurveyList(Number(page_number));
  }, [props]);

  return (
    <div className="surveylist-wrapper">
      <div className="surveylist">
        {surveyList.surveys.map((item: any, idx: number) =>
          // 이미 참여한 설문조사는 Badge를 보여주고 이미 참여했다는 alert 창을 보여준다!
          user_response.find(i => i === item.id) ?
            (
              <Badge.Ribbon text={<div style={{color:"#254275", fontSize:"0.9em"}}>이미 참여함</div>} color="#ffd966">
                <Card
                  key={idx}
                  className="survey-card"
                  hoverable
                  cover={<img className="survey-image" alt="example" src={img}/>}
                  onClick={() => {
                    alert("이미 참여한 설문조사입니다!")
                  }}
                >
                  <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username}/>
                </Card>
              </Badge.Ribbon>
            )

            : (
              <Card
                key={idx}
                className="survey-card"
                hoverable
                cover={<img className="survey-image" alt="example" src={img}/>}
                onClick={() => {
                  props.history.push(`/surveylist/${item.id}`)
                }}
              >
                <Card.Meta title={<div className="survey-title">{item.title}</div>} description={item.user.username}/>
              </Card>
            )
        )}
      </div>
      <div className="surveylist-footer">
        <div className="surveylist-paging">
          <Pagination
            onChange={(page_number: number) => {
              props.history.push(`/surveylist?page_number=${page_number}`)
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
export default SurveyList;