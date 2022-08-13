import { Button, Form, Input, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Formik, ErrorMessage } from "formik";
import "./myinfo.scss";
import { useEffect } from "react";
import { jwtUtils } from "../../utils/JwtUtils";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { setToken } from "../../redux/reducers/AuthReducer";
import { useNavigate } from "react-router-dom";

const MyInfo = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.Auth.token);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("현재 비밀번호를 입력해주세요!"),
    changed_password: Yup.string().required("변경할 비밀번호를 입력해주세요!"),
    changed_password2: Yup.string()
      .oneOf([Yup.ref("changed_password"), null], "변경할 비밀번호가 일치하지 않습니다")
      .required("필수 입력 값입니다!"),
  });
  const submit = async (values) => {
    const { password, changed_password } = values;
    try {
      await axios.post("/api/user/change_password", { password, changed_password, user_id: jwtUtils.getId(token) });
      toast.success(
        <div>
          비밀번호 변경이 완료되었습니다!
          <br />
          다시 로그인해주세요!
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
        },
      );
      window.setTimeout(() => {
        navigate("/signin");
        dispatch(setToken(""));
        window.location.reload();
      }, 2000);
    } catch (e) {
      toast.error(<div>현재 비밀번호가 올바르지 않습니다!</div>, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="myinfo-wrapper">
      <ToastContainer />
      <div className="myinfo-content">
        <div className="change-password">
          <Formik
            initialValues={{
              password: "",
              changed_password: "",
              changed_password2: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ values, handleSubmit, handleChange }) => (
              <div className="change-password-wrapper">
                <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
                  <Form.Item className="input-form" label="현재 비밀번호">
                    <Input.Password value={values.password} name="password" onChange={handleChange} />
                    <div className="error-message">
                      <ErrorMessage name="password" />
                    </div>
                  </Form.Item>
                  <Form.Item className="input-form" label="변경할 비밀번호">
                    <Input.Password value={values.changed_password} name="changed_password" onChange={handleChange} />
                    <div className="error-message">
                      <ErrorMessage name="changed_password" />
                    </div>
                  </Form.Item>
                  <Form.Item className="input-form" label="변경할 비밀번호 확인">
                    <Input.Password value={values.changed_password2} name="changed_password2" onChange={handleChange} />
                    <div className="error-message">
                      <ErrorMessage name="changed_password2" />
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default MyInfo;
