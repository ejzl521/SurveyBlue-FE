# React로 설문조사 플랫폼 만들기😎
- 기존에 만들었던 Restful API + React 기반 게시판 사이트 개발을 해보고 기능을 추가해서 프로젝트를 진행해보고 싶었다!
- http://surveyblue.site/
  ![image](https://user-images.githubusercontent.com/55455103/169725849-e1019dde-c7f9-4c0c-b67f-17a38b8d285f.png)


# 개발 환경
- webStorm (React 프로젝트)

# 사용 라이브러리 및 기술
- nvm 14.17.3
- Ant Design (CSS 프레임워크)
- scss
- axios (Http 요청)
- react router (라우팅)
- formik, yup을 이용해 Dynamic Form 구현 (Form의 Validation 체크 및 상태 관리)
- react-toastify (토스트 알림)
- redux, redux-persist(로그인 성공시 생성되는 jwt-token 정보를 session storage에 저장)
- jwt-decode (jwt-token 파싱)
- axios interceptor 구현 (api에 인증 미들웨어를 설정해서 HTTP Header에 jwt-token 정보를 넘기기 위해 구현)
- Private Route 구현 (로그인에 성공해서 인증된 사용자만 통과시킬 수 있는 컴포넌트 구현)
- jwt-token 유효성 검증 & 해독 유틸리티 클래스 구현
- 이미지 업로더(설문조사 객관식 문제 등록 가능!)
- emailJS(비밀번호 분실시 이메일로 발송)

# 기능
- 회원가입
- 로그인, 로그아웃
- 설문조사 전체 보기
- 설문조사 등록, 삭제, 수정 (로그인한 관리자만 가능)
- 설문조사 참여 (중복 설문 참여 방지)
- 설문조사 통계 보기
- 비밀번호 찾기 및 변경
- 사용자 역할 구분(관리자/사용자)

# 돌아보며 📝
- HTTP, 세션/쿠키, JWT TOKEN등 기본적인 웹 개발 지식에 대해 더 공부해야 할 것 같다📝
- 다음에는 프로젝트를 진행할 때 다른 사람과 협업을 통해 소통하는 능력을 길러야 할 것 같다! 부트캠프를 들을까 생각중 ㅠㅠ
- 리액트 관련 공부를 더 많이 해야할 것 같다.. 코딩 컨벤션과 라이브러리 사용이 많이 부족하다!
- useEffect 훅으로 데이터를 가져올 때 렌더링 최적화를 할 필요가 있는 것 같다
- 다음에 프로젝트를 진행할 때는 커스텀훅과 recoil을 사용해서 어플리케이션을 더욱 더 최적화 해야할 것 같다!
- 다음에 인증기능을 구현할 때 session storage에 토큰을 저장하는 것은 위험하므로 refresh Token을 httpOnly 쿠키로 설정하고 URL이 새로고침 될 때마다 refresh 토큰을 request에 담아 응답으로 새로운 access Token을 발급 받아서 Javascript private variable에 저장해봐야 겠다!

# 아래 링크에 기능 및 설명에 대해 하드코딩 해두었다😎
- http://surveyblue.site/explain

# BE 소스코드 ↓↓↓'
- https://github.com/ejzl521/SurveyBlue-BE
