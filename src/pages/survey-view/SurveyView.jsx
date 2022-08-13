import React, { useEffect, useState } from "react";
import { Badge, Card, Input, Radio, Form, Button } from "antd";
import api from "../../utils/api";
import { Formik } from "formik";
import * as Yup from "yup";
import "./surveyview.scss";
import { jwtUtils } from "../../utils/JwtUtils";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const SurveyView = () => {
  const token = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const [survey, setSurvey] = useState({
    id: "",
    title: "",
    questions: [],
  });

  useEffect(() => {
    getSurvey();
  }, []);

  const getSurvey = async () => {
    const res = await api.get(`/api/survey/${id}`);
    setSurvey(res.data);
  };

  const initialValues = {
    answers: Array.from({ length: survey.questions.length }, () => ({ answer: "" })),
  };

  const validationSchema = Yup.object().shape({
    answers: Yup.array().of(
      Yup.object().shape({
        answer: Yup.string().required("문제에 응답해 주세요!"),
      }),
    ),
  });

  const handleSubmit = async (value) => {
    const answer_for_db = value.answers.map((item) => item.answer);

    const result = {
      user_id: jwtUtils.getId(token),
      survey_id: survey.id,
      answers: answer_for_db,
    };

    await api.post("/api/result", result);
    alert("설문조사에 응해주셔서 감사합니다!");
    navigate("/surveylist?page_number=1");
  };
  return (
    <div className="surveyview">
      <div className="surveyview-wrapper">
        <div className="surveyview-header">
          <div className="surveyview-title">{survey.title}</div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ values, setValues, handleSubmit, handleChange, errors }) => (
            <div className="surveyview-contents">
              <Form onFinish={handleSubmit}>
                {survey.questions.map((item, index) => {
                  if (item.type === "objective") {
                    return (
                      <div className="objective-wrapper" key={item.id}>
                        <Badge.Ribbon text="객관식" color="pink">
                          <Card
                            title={
                              <>
                                <div className="objective-title">{`${index + 1}. ${item.title}`}</div>
                                {/* <div className="error-message">{errors.answers[index].answer}</div>*/}
                              </>
                            }
                          >
                            <Radio.Group
                              className="objective-radio-group"
                              onChange={(e) => {
                                const new_val = { ...values };
                                new_val.answers[index].answer = e.target.value;
                                setValues(new_val);
                              }}
                            >
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
                          <Card
                            title={
                              <>
                                <div className="subjective-title">{`${index + 1}. ${item.title}`}</div>
                                <div className="error-message"></div>
                              </>
                            }
                          >
                            <div className="subjective-input">
                              <Input.TextArea
                                placeholder="주관식 답을 입력하세요"
                                autoComplete="off"
                                size="large"
                                name={`answers.${index}.answer`}
                                onChange={handleChange}
                              />
                            </div>
                          </Card>
                        </Badge.Ribbon>
                      </div>
                    );
                  } else if (item.type === "img_objective") {
                    return (
                      <div className="img-objective-wrapper" key={item.id}>
                        <Badge.Ribbon text="객관식(사진)" color="blue">
                          <Card
                            title={
                              <>
                                <div className="img-objective-title">{`${index + 1}. ${item.title}`}</div>
                                <div className="error-message"></div>
                              </>
                            }
                          >
                            <Radio.Group
                              className="img-objective-radio-group"
                              onChange={(e) => {
                                const new_val = { ...values };
                                new_val.answers[index].answer = e.target.value;
                                setValues(new_val);
                              }}
                            >
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
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  onClick={() => {
                    validationSchema.validate(values).catch((err) => alert("모든 항목에 응답해주세요!"));
                  }}
                >
                  제출하기
                </Button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyView;
