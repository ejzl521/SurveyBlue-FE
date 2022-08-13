import React, { useEffect, useState } from "react";
import { Badge, Card, Input, Radio, Menu } from "antd";
import api from "../../utils/api";
import "./surveyinfo.scss";
import { BarChartOutlined, DesktopOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const SurveyInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [survey, setSurvey] = useState({
    id: "",
    title: "",
    questions: [],
  });

  useEffect(() => {
    getSurvey(id);
  }, []);

  const getSurvey = async (id, source) => {
    const res = await api.get(`/api/survey/${id}`);
    setSurvey(res.data);
    return () => {
      source.cancel();
    };
  };

  return (
    <div className="surveyinfo">
      <div className="surveyinfo-wrapper">
        <div className="surveyinfo-header">
          <Menu mode="horizontal" className="surveyinfo-menu" selectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DesktopOutlined />} className="menu-item">
              등록된 화면
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<SettingOutlined />}
              className="menu-item"
              onClick={() => {
                navigate(`/mysurvey/edit/${id}`);
              }}
            >
              수정하기
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<BarChartOutlined />}
              className="menu-item"
              onClick={() => {
                navigate(`/mysurvey/result/${id}`);
              }}
            >
              통계보기
            </Menu.Item>
          </Menu>
          <div className="surveyinfo-title">{survey.title}</div>
        </div>
        <div className="surveyinfo-contents">
          {survey.questions.map((item, index) => {
            if (item.type === "objective") {
              return (
                <div className="objective-wrapper" key={item.id}>
                  <Badge.Ribbon text="객관식" color="pink">
                    <Card title={<div className="objective-title">{`${index + 1}. ${item.title}`}</div>}>
                      <Radio.Group className="objective-radio-group">
                        {item.choices.map((choice, key) => (
                          <Radio value={choice} key={key}>
                            {choice}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Card>
                  </Badge.Ribbon>
                </div>
              );
            } else if (item.type === "subjective") {
              return (
                <div className="subjective-wrapper" key={item.id}>
                  <Badge.Ribbon text="주관식" color="yellow">
                    <Card title={<div className="subjective-title">{`${index + 1}. ${item.title}`}</div>}>
                      <div className="subjective-input">
                        <Input.TextArea placeholder="주관식 답을 입력하세요" autoComplete="off" size="large" />
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </div>
              );
            } else if (item.type === "img_objective") {
              return (
                <div className="img-objective-wrapper" key={item.id}>
                  <Badge.Ribbon text="객관식(사진)" color="blue">
                    <Card title={<div className="img-objective-title">{`${index + 1}. ${item.title}`}</div>}>
                      <Radio.Group className="img-objective-radio-group">
                        {Array.from({ length: item.img_count }, () => "").map((image, idx) => (
                          <div className="img-objective-radio" key={idx}>
                            <div className="objective-img">
                              <img
                                src={`/api/image/get_objective_img?question_id=${item.id}&image_index=${idx}`}
                                alt=""
                              />
                            </div>
                            <Radio value={idx} style={{ margin: "12px 0" }} />
                          </div>
                        ))}
                      </Radio.Group>
                    </Card>
                  </Badge.Ribbon>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default SurveyInfo;
