# React로 설문조사 플랫폼 만들기😎
- 기존에 만들었던 Restful API + React 기반 게시판 사이트 개발을 해보고 기능을 추가해서 프로젝트를 진행해보고 싶었다!
- dynamic form을 구현해 설문조사 폼을 만드는 UX를 개발!
- http://surveyblue.site/
#### 메인화면
  ![image](https://user-images.githubusercontent.com/55455103/184560430-4cc91e9a-74dd-453f-a138-fe4c09dcf239.png)
#### 설문조사 등록
![27](https://user-images.githubusercontent.com/55455103/184561074-99e14bd2-24d9-48b2-aded-bc0d194dac90.gif)

# 개발 환경
- webStorm (React 프로젝트)

# Main Stack
  <div>
  <img src="http://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="http://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white" />
  <img src="http://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  </div>
  <div>
  <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">
  <img src="http://img.shields.io/badge/-Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white" />
  <img src="http://img.shields.io/badge/-Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white" />
  <img src="http://img.shields.io/badge/-Amazon EC2-FF4F8B?style=for-the-badge&logo=Amazon EC2&logoColor=white" />
  </div>  

# Main Library
### Redux & Redux-persist
- 전역 상태 유지
- redux-persist를 사용해서 redux의 state 저장소를 local storage로 사용
- ex) 사용자가 로그인 성공시 response로 받아오는 jwt 정보를 local storage에 저장 및 새로고침을 해도 local storage에 있는 jwt 정보가 남아있기 때문에 새로고침 될 때 별도의 로직을 사용해서 token을 redux에 저장하지 않아도 됨
### axios
- HTTP request & respose
### yup & formik
- form의 상태 관리 및 validation 검사
- formik ex) input의 상태를 관리하기 위해 별도의 useState와 useRef혹은 onChange를 사용하지 않아도 간단히 form의 상태 관리 가능
- yup ex) 회원가입할 때 비밀번호는 8글자 이상 및 숫자와 특수문자 하나 반드시 포함
### Material UI
- css 프레임워크
- 페이지네이션 컴포넌트와 같이 커스텀하기 까다로운 부분을 쉽게 가져다 사용
### scss
- 계층적 CSS 작업을 통해 가독성 및 보일러플레이트 감소
### react-router-dom v6
- 라우팅, 동적 라우팅, query parmeter와 uri parameter를 효율적으로 파싱
### jwt-decode
- jwt parsing
### emailJS
- 비밀번호 분실 시 이메일로 새 비밀번호 발급


# 주요 기능
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
- 다음에는 프로젝트를 진행할 때 다른 사람과 협업을 통해 소통하는 능력을 기르고 프론트엔드 기초부터 탄탄히 다져야 할 것 같다. 부트캠프를 들을까 생각중 ㅠㅠ
- 리액트 관련 공부를 더 많이 해야할 것 같다.. 코딩 컨벤션과 라이브러리 사용이 많이 부족하다!
- useEffect 훅으로 서버의 데이터를 가져올 때 렌더링 최적화를 할 필요가 있는 것 같다
- 다음에 프로젝트를 진행할 때는 recoil을 사용해서 전역 상태 관리를 하고 react-query를 사용해서 서버 상태 관리를 해봐야겠다!
- 다음에 인증기능을 구현할 때는 refresh token과 access token을 사용해서 csrf 공격과 xss 공격에 대응하는 방법을 익힐것이다!
# 아래 링크에 기능 및 설명에 대해 하드코딩 해두었다😎
- http://surveyblue.site/explain

# BE 소스코드 ↓↓↓'
- https://github.com/ejzl521/SurveyBlue-BE
