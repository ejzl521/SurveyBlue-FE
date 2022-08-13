import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import { Form, Input, Button, Checkbox } from "antd";
import "./signup.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate;
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("올바른 이메일 형식이 아닙니다!").required("이메일을 입력하세요!"),
    username: Yup.string().required("이름을 입력하세요!"),
    password: Yup.string().required("패스워드를 입력하세요!"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
      .required("필수 입력 값입니다!"),
  });
  const submit = async (values) => {
    const { email, password, username, roles } = values;
    try {
      await axios.post("/api/auth/signup", { email, password, username, roles });
      toast.success(
        <div>
          회원등록이 완료되었습니다.
          <br />
          로그인해주세요!
        </div>,
        {
          position: "top-center",
          autoClose: 2000,
        },
      );
      window.setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (e) {
      toast.error(<div>이미 존재하는 이메일입니다.</div>, {
        position: "top-center",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        password2: "",
        roles: [],
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
      validateOnMount={true}
    >
      {({ values, handleSubmit, handleChange, setValues, errors }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
            <Form.Item className="input-form" label="이메일">
              <Input value={values.email} name="email" onChange={handleChange} />
              <div className="error-message">{errors.email}</div>
            </Form.Item>
            <Form.Item className="input-form" label="이름">
              <Input value={values.username} name="username" onChange={handleChange} />
              <div className="error-message">
                <div className="error-message">{errors.username}</div>
              </div>
            </Form.Item>
            <Form.Item className="input-form" label="비밀번호">
              <Input.Password value={values.password} name="password" onChange={handleChange} />
              <div className="error-message">
                <div className="error-message">{errors.password}</div>
              </div>
            </Form.Item>
            <Form.Item className="input-form" label="비밀번호 확인">
              <Input.Password value={values.password2} name="password2" onChange={handleChange} />
              <div className="error-message">
                <div className="error-message">{errors.password2}</div>
              </div>
            </Form.Item>
            <Checkbox.Group
              style={{ marginBottom: "24px" }}
              onChange={(e) => {
                const add_role = { ...values };
                add_role.roles = e;
                setValues(add_role);
              }}
            >
              <Checkbox value="ROLE_MANAGER">관리자</Checkbox>
              <div style={{ fontSize: "0.8em", color: "blueviolet" }}>
                *관리자가 아닌 사용자는 설문에 참여만 할 수 있습니다.
              </div>
            </Checkbox.Group>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
