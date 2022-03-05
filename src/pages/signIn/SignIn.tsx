import * as Yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import {Formik, ErrorMessage} from "formik";
import {Form, Input, Button, Modal} from 'antd'
import "./singin.scss"
import {useDispatch} from "react-redux";
import {setToken} from "../../redux/reducers/AuthReducer";
import queryString from "query-string";
import {useEffect, useState} from "react";
import emailjs, {init} from 'emailjs-com';
import api from "../../utils/api";
import axios from "axios";

const SignIn = (props: any) => {
  // emailjs유저 정보
  init("user_grlvG2L9uYW2IN1PMYs3m");
  const dispatch = useDispatch();
  const history = props.history;

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup
      .string()
      .required("패스워드를 입력하세요!")
  })
  const submit = async (values: any) => {
    const {email, password} = values;
    try {
      const {data} = await api.post('/api/auth/signin', {email, password});
      dispatch(setToken(data.jwt));
      // 원래 페이지로 돌아가는 부분
      const redirectUrl = queryString.parse(history.location.search).redirectUrl;

      if (redirectUrl) {
        history.push(redirectUrl.toString());
      } else {
        history.push('/');
      }

    } catch (e) {
      toast.error(<div>로그인에 실패하셨습니다!<br/>아이디와 패스워드를 확인해주세요!</div>
        , {
          position: "top-center",
        });
    }
  }

  // 비밀번호 찾기 모달창
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user_email, setEmail] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    try {
      const res = await axios.post('/api/user/reset_password', {user_email});
      toast.success(<div>이메일로 새 비밀번호를 발송했습니다!<br/>이메일을 확인해주세요!</div>, {
        position: "top-center",
        autoClose: 2000
      });
      const emailTemplate = {
        to_email: user_email,
        to_name: res.data.username,
        password: res.data.pwd
      }
      emailjs.send('survey_blue', 'template_sneybvk', emailTemplate, 'user_grlvG2L9uYW2IN1PMYs3m')

      window.setTimeout(()=>{
        setIsModalVisible(false);
      }, 2000);
    } catch(e) {
      toast.error(<div>존재하지 않는 이메일입니다!</div>, {
        position: "top-center",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    props.setMenu("signin");
  }, [props]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="signin-wrapper">
          <ToastContainer/>
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={handleSubmit}
          >
            <Form.Item className="input-form" label="이메일">
              <Input value={values.email} name="email" onChange={handleChange}/>
              <div className="error-message">
                <ErrorMessage name="email"/>
              </div>
            </Form.Item>
            <Form.Item className="input-form" label="비밀번호">
              <Input.Password value={values.password} name="password" onChange={handleChange}/>
              <div className="error-message">
                <ErrorMessage name="password"/>
              </div>
            </Form.Item>
            <Form.Item>
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <a href={void(0)} onClick={showModal}>
                  Forget Password?
                </a>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </div>
            </Form.Item>
          </Form>
          <ToastContainer/>
          <Modal title="비밀번호 찾기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>회원가입시 등록한 이메일 주소를 적어주세요.</p>
            <p>새로운 비밀번호가 이메일로 발송됩니다.</p>
            <Input value={user_email} onChange={(e) => {
              setEmail(e.target.value)
            }}/>
          </Modal>
        </div>
      )}
    </Formik>
  );
}

export default SignIn;