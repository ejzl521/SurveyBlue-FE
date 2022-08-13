import React, { useEffect, useState } from "react";
import ResultCard from "../../components/ResultCard";
import "./surveyresult.scss";
import api from "../../utils/api";
import { Menu } from "antd";
import { BarChartOutlined, DesktopOutlined, SettingOutlined } from "@ant-design/icons";

const SurveyResult = (props) => {
  const [result, setResult] = useState({
    title: "",
    answers: [
      {
        id: "",
        type: "",
        title: "",
        choices: "",
        img_count: "",
        answers: [],
      },
    ],
  });
  const getResult = async () => {
    const res = await api.get(`/api/result/${props.match.params.id}`);
    setResult(res.data);
  };

  useEffect(() => {
    getResult();
    props.setMenu("mysurvey");
  }, [props]);

  return (
    <div className="surveyresult">
      <div className="surveyresult-wrapper">
        <div className="surveyresult-header">
          <Menu mode="horizontal" className="surveyresult-menu" selectedKeys={["3"]}>
            <Menu.Item
              key="1"
              icon={<DesktopOutlined />}
              className="menu-item"
              onClick={() => {
                props.history.push(`/mysurvey/${props.match.params.id}`);
              }}
            >
              등록된 화면
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<SettingOutlined />}
              className="menu-item"
              onClick={() => {
                props.history.push(`/mysurvey/edit/${props.match.params.id}`);
              }}
            >
              수정하기
            </Menu.Item>
            <Menu.Item key="3" icon={<BarChartOutlined />} className="menu-item">
              통계보기
            </Menu.Item>
          </Menu>
          <div className="surveyresult-title">{result.title}</div>
        </div>

        {result.answers.map((question, idx) => {
          return (
            <ResultCard
              id={question.id}
              num={idx + 1}
              title={question.title}
              choices={question.choices}
              type={question.type}
              answers={question.answers}
              img_count={question.img_count}
              key={idx}
            ></ResultCard>
          );
        })}
      </div>
    </div>
  );
};

export default SurveyResult;
