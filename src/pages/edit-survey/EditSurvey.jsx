import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Input, Button, Select, Menu, Modal } from "antd";
import {
  QuestionCircleTwoTone,
  CloseOutlined,
  DeleteFilled,
  PlusOutlined,
  DiffOutlined,
  DesktopOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "./editsurvey.scss";
import api from "../../utils/api";
import * as Yup from "yup";
import ImageUploader from "../../components/ImageUploader";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";

const EditSurvey = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [survey, setSurvey] = useState({
    id: "",
    title: "",
    questions: [
      {
        type: "objective",
        title: "",
        choices: [{ text: "" }],
      },
      {
        type: "subjective",
        title: "",
      },
      {
        type: "img_objective",
        title: "",
        images: [{ file: "", preview_URL: "", loaded: false }],
      },
    ],
  });
  // 원본을 복사한 내용을 담는 state. 설문조사가 변경되었는지 확인하기 위한 용도
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("설문조사의 제목이 필요합니다!"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().required(),
          title: Yup.string().required("문제의 제목이 필요합니다!"),
          choices: Yup.array()
            .of(
              Yup.object().shape({
                text: Yup.string().required("보기에 내용을 넣어주세요!"),
              }),
            )
            .min(1, "객관식에 최소 보기 하나는 등록하세요!"),
          images: Yup.array()
            .of(
              Yup.object().shape({
                file: Yup.mixed().required("사진을 추가해주세요"),
                preview_URL: Yup.string(),
                loaded: Yup.boolean(),
              }),
            )
            .min(1, "객관식(사진)에 최소 사진 하나는 등록하세요!"),
        }),
      )
      .min(1, "최소 한 문제는 등록하세요!"),
  });
  // 이미지 파일의 blob을 가져와서 파일 객체로 변환.
  const getSurvey = async () => {
    try {
      const res = await api.get(`/api/survey/${id}`);
      const survey_id = res.data.id;
      const survey_title = res.data.title;
      const survey_questions = [];
      for (const item of res.data.questions) {
        if (item.type === "objective") {
          const parsed_choices = item.choices.map((choice) => ({ text: choice }));
          survey_questions.push({ type: item.type, title: item.title, choices: parsed_choices });
        } else if (item.type === "subjective") {
          survey_questions.push({ type: item.type, title: item.title });
        } else if (item.type === "img_objective") {
          const db_images = await api.get(`/api/image/blob?question_id=${item.id}`);
          const images = [];
          for (let i = 0; i < item.img_count; i++) {
            // blob 데이터를 파일로 변환
            const image_file = new File(
              [new Blob([new Uint8Array(db_images.data[i].data.data)])],
              db_images.data[i].original_name,
              { type: db_images.data[i].mimetype },
            );
            images.push({
              file: image_file,
              preview_URL: `/api/image/get_objective_img?question_id=${item.id}&image_index=${i}`,
              loaded: true,
            });
          }
          survey_questions.push({
            type: "img_objective",
            title: item.title,
            images: images,
          });
        }
      }
      setSurvey({
        id: survey_id,
        title: survey_title,
        questions: survey_questions,
      });
    } catch (err) {}
  };
  const handleSubmit = async () => {
    const questions_for_db = _.cloneDeep(result);
    const img_objective = [];
    questions_for_db.questions.forEach((item, idx) => {
      if (item.type === "objective") {
        const choices_for_db = item.choices.map((choice) => choice.text);
        questions_for_db.questions[idx].choices = choices_for_db;
      } else if (item.type === "img_objective") {
        item.images.forEach((image) => {
          img_objective.push({ file: image.file, question_index: idx });
        });
        questions_for_db.questions[idx] = { type: item.type, title: item.title };
      }
    });
    const update_survey = { ...questions_for_db };
    await api.put(`/api/survey/${survey.id}`, update_survey);
    for (const item of img_objective) {
      const formData = new FormData();
      formData.append("file", item.file);
      await api.post(
        `/api/image/upload_img_obj?survey_id=${survey.id}&question_index=${item.question_index}`,
        formData,
      );
    }
    alert("설문조사 수정이 완료되었습니다!");
    navigate(`/mysurvey/${id}`);
  };
  // 최상단 메뉴 상태 및 survey 가져오기
  useEffect(() => {
    // survey 데이터를 가져온 후 원본을 복제한 값을 담는 state에 저장하기
    getSurvey();
  }, []);
  // 삭제 확인 모달
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    setIsModalVisible(false);
    await api.delete(`/api/survey/${id}`);
    alert("삭제가 완료되었습니다!");
    navigate("/mysurvey?page_number=1");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 수정 확인 모달
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = (value) => {
    setResult(value);
    setIsModalVisible2(true);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
    handleSubmit().then();
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  // 설문조사 변경 결과를 저장할 state
  const [result, setResult] = useState({});

  console.log(survey);
  return (
    <div className="survey">
      <Formik
        initialValues={survey}
        validationSchema={validationSchema}
        onSubmit={showModal2}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, handleChange, setValues }) => (
          <div className="survey-wrapper">
            <Form onSubmit={handleSubmit}>
              <div className="survey-header">
                <Menu mode="horizontal" className="surveyinfo-menu" selectedKeys={["2"]}>
                  <Menu.Item
                    key="1"
                    icon={<DesktopOutlined />}
                    className="menu-item"
                    onClick={() => {
                      navigate(`/mysurvey/${id}`);
                    }}
                  >
                    등록된 화면
                  </Menu.Item>
                  <Menu.Item key="2" icon={<SettingOutlined />} className="menu-item">
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
                <div className="survey-title">
                  <Input
                    size="large"
                    placeholder="설문조사 제목을 입력하세요"
                    bordered={false}
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    autoComplete="off"
                  />
                </div>
                <div className="error-message">
                  <ErrorMessage name="title" />
                </div>
              </div>
              {values.questions.map((item, index) => {
                // 객관식일때만 보기와 보기추가 버튼 사용
                let obj_container = null;
                let add_choice_button = null;

                let type = "";
                if (item.type === "objective") {
                  type = "객관식";
                } else if (item.type === "subjective") {
                  type = "주관식";
                } else if (item.type === "img_objective") {
                  type = "객관식(사진)";
                }
                // 객관식일 경우에만 객관식 보기를 담는 컨테이너와 보기 추가 버튼이 생김
                if (item.type === "objective") {
                  const choices = item.choices.map((choice, idx) => (
                    <div key={idx}>
                      <div className="obj-choice">
                        <QuestionCircleTwoTone />
                        <div className="obj-choice-input">
                          <Input
                            placeholder="보기를 입력하세요"
                            bordered={false}
                            name={`questions.${index}.choices.${idx}.text`}
                            value={values.questions[index].choices[idx].text}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                        </div>
                        <CloseOutlined
                          style={{ color: "#FF3399", cursor: "pointer" }}
                          onClick={() => {
                            const delete_choice = { ...values };
                            delete_choice.questions[index].choices.splice(idx, 1);
                            setValues(delete_choice);
                          }}
                        />
                      </div>
                      <div className="error-message">
                        <ErrorMessage name={`questions.${index}.choices.${idx}.text`} />
                      </div>
                    </div>
                  ));
                  obj_container = <div className="obj-wrapper">{choices}</div>;
                  add_choice_button = (
                    <div
                      className="add-choice-button"
                      onClick={() => {
                        let add_choice = { ...values };
                        add_choice.questions[index].choices.push({ text: "" });
                        setValues(add_choice);
                      }}
                    >
                      <PlusOutlined />
                      <span>보기 추가</span>
                    </div>
                  );
                }
                // 객관식(사진)
                else if (item.type === "img_objective") {
                  const img_choices = item.images.map((image, idx) => (
                    <div key={idx}>
                      <div className="img-obj-choice">
                        <ImageUploader
                          preview_URL={image.preview_URL}
                          loaded={image.loaded}
                          upload_img={(file, preview_URL) => {
                            const upload_img_choice = { ...values };
                            upload_img_choice.questions[index].images[idx] = {
                              file: file,
                              preview_URL: preview_URL,
                              loaded: true,
                            };
                            setValues(upload_img_choice);
                          }}
                        />
                        <CloseOutlined
                          style={{ color: "#FF3399", cursor: "pointer", fontSize: "80px" }}
                          onClick={() => {
                            const delete_img_choice = { ...values };
                            delete_img_choice.questions[index].images.splice(idx, 1);
                            setValues(delete_img_choice);
                          }}
                        />
                      </div>
                      <div
                        className="error-message"
                        style={{ textAlign: "center", fontWeight: "bold", color: "khaki" }}
                      >
                        <ErrorMessage name={`questions.${index}.images.${idx}.file`} />
                      </div>
                    </div>
                  ));
                  obj_container = <div className="obj-wrapper">{img_choices}</div>;
                  add_choice_button = (
                    <div
                      className="add-choice-button"
                      onClick={() => {
                        let add_img_choice = { ...values };
                        add_img_choice.questions[index].images.push({ file: "", preview_URL: "", loaded: false });
                        setValues(add_img_choice);
                      }}
                    >
                      <PlusOutlined />
                      <span>보기 추가</span>
                    </div>
                  );
                }

                //객관식 주관식 공통
                return (
                  <div className="question-wrapper" key={index}>
                    <div className="question-header">
                      <div className="question-title">
                        <Input
                          size="large"
                          placeholder={`${type}의 제목을 입력하세요`}
                          bordered={false}
                          name={`questions.${index}.title`}
                          onChange={handleChange}
                          value={values.questions[index].title}
                          autoComplete="off"
                        />
                        <div className="error-message">
                          <ErrorMessage name={`questions.${index}.title`} />
                        </div>
                      </div>

                      <div className="choice-type">
                        <Select
                          style={{ width: 130 }}
                          value={item.type}
                          onChange={(value) => {
                            const changed_type = { ...values };
                            if (value === "objective") {
                              changed_type.questions[index] = { type: value, title: "", choices: [{ text: "" }] };
                            } else if (value === "subjective") {
                              changed_type.questions[index] = { type: value, title: "" };
                            } else if (value === "img_objective") {
                              changed_type.questions[index] = {
                                type: value,
                                title: "",
                                images: [{ file: "", preview_URL: "", loaded: false }],
                              };
                            }
                            setValues(changed_type);
                          }}
                        >
                          <Select.Option value="objective">객관식</Select.Option>
                          <Select.Option value="subjective">주관식</Select.Option>
                          <Select.Option value="img_objective">객관식(사진)</Select.Option>
                        </Select>
                      </div>
                    </div>
                    {obj_container}
                    <div className="question-footer">
                      <div
                        className="delete-question-button"
                        onClick={() => {
                          const deleted_questions_list = { ...values };
                          deleted_questions_list.questions.splice(index, 1);
                          setValues(deleted_questions_list);
                        }}
                      >
                        <DeleteFilled />
                        <span>삭제하기</span>
                      </div>
                      {add_choice_button}
                    </div>
                  </div>
                );
              })}
              <div className="survey-footer">
                <div
                  className="add-question-button"
                  onClick={() => {
                    let new_question_list = [
                      ...values.questions,
                      {
                        type: "objective",
                        title: "",
                        choices: [{ text: "" }],
                      },
                    ];
                    setValues({ ...values, questions: new_question_list });
                  }}
                >
                  <DiffOutlined />
                  <span>문제 추가</span>
                </div>
                <div className="submit-button">
                  <Button type="primary" size="large" danger style={{ marginRight: "12px" }} onClick={showModal}>
                    삭제하기
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    onClick={() => {
                      validationSchema.validate(values).catch(() => {
                        alert("모든 항목을 올바르게 등록해주세요!");
                      });
                    }}
                  >
                    수정하기
                  </Button>
                  <Modal title="설문조사 삭제하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <p>정말 삭제하시겠습니까?</p>
                  </Modal>
                  <Modal title="설문조사 수정하기" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
                    <p>정말 수정하시겠습니까?</p>
                    <p>저장된 응답 결과가 모두 초기화됩니다.</p>
                  </Modal>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default EditSurvey;
