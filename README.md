# React로 설문조사 플랫폼 만들기😎
- 기존에 만들었던 Restful API + React 기반 게시판 사이트 개발을 해보고 기능을 추가해서 프로젝트를 진행해보고 싶었다!
- 혼자서 백엔드와 프론트엔드 개발을 진행하고 배포까지 해보기!
- 제일 신경을 많이 쓴 부분은 dynamic form을 구현해 설문조사 폼을 만드는 UX를 개발한 것!
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
- 계층적 CSS 작업을 통해 가독성 증가 및 보일러플레이트 감소
### react-router-dom v6
- 라우팅, 동적 라우팅, query parmeter와 uri parameter를 효율적으로 파싱
### jwt-decode
- jwt parsing
### emailJS
- 비밀번호 분실 시 이메일로 새 비밀번호 발급


# 구현한 주요 기능
### ➀ 로그인/회원가입 → 사용자의 역할 구분
- yup을 이용한 validation 검증을 통해 사용자에게 적절한 정보를 입력하도록 유도
- 회원가입 시 관리자와 사용자를 구분하여 회원 가입
- 관리자는 설문조사 등록 및 참여를 할 수 있고 사용자는 참여만 가능
- 로그인 성공시 redux-persist를 이용해 local storage에 jwt 저장 ➔ 새로고침해도 로그인 상태 유지
- 로그아웃시 redux-persist에 있는 jwt 정보 삭제
  <details>
    <summary><h4>회원가입 form</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/188350768-52d74033-566f-426f-ba7e-134a13f27658.gif"/>
    </div>
  </details>
https://user-images.githubusercontent.com/55455103/184561074-99e14bd2-24d9-48b2-aded-bc0d194dac90.gif
### ➁ 설문조사 등록 → dynamic form
- jwt의 payload에 관리자임을 알려주는 정보가 있을 경우만 private route를 통과하여 기능을 사용할 수 있음!
- 관리자로 로그인한 사용자만 이용을 할 수 있는 기능
- formick과 yup을 이용해 dynamic form을 구현해서 설문조사 form을 구현함.
- 문제는 객관식/주관식/객관식(사진)으로 나뉘어져 있고 deep copy와 formick의 메서드 setValues를 이용해서 사용자가 UX와 상호작용 하면서 문항의 갯수를 늘리거나 문항의 유형을 변경할 수 있다.
  <details>
    <summary><h4>설문조사 등록 dynamic form</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/184561074-99e14bd2-24d9-48b2-aded-bc0d194dac90.gif"/>
    </div>
  </details>
### ➂ 설문조사 참여 → 중복 설문 참여 방지
- 설문조사 목록 페이지에서 설문조사에 참여할 수 있다.
- 로그인한 사용자만 설문조사에 참여할 수 있고 이미 참여한 설문조사는 다시 참여할 수 없다.
  <details>
    <summary><h4>설문조사 참여</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/188353729-de77d564-4996-49ad-b281-2f30970f695b.gif"/>
    </div>
  </details>
### ➃ 설문조사 수정/삭제
- 설문조사 수정의 경우 사용자가 이전에 작성한 게시물의 상태를 그대로 불러와서 보여줌
- 내가 등록한 설문조사 페이지에서 내가 작성한 게시물을 확인하고 수정/삭제할 수 있다.
  <details>
    <summary><h4>설문조사 수정</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/188354068-ebe61b1c-7aba-4c3d-9f6b-b37829968b76.gif"/>
    </div>
  </details>
### ⑤ 설문조사 통계 보기
- 내가 등록한 설문조사의 통계를 확인할 수 있으며 만약 설문조사를 수정할 경우 설문조사의 통계가 초기화된다!
  <details>
    <summary><h4>설문조사 통계 보기</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/188354269-f47a828c-ed63-4230-9732-927fe1e5c3d3.gif"/>
    </div>
  </details>
### ⑥ 비밀번호 찾기 및 변경
- emailJS를 이용하여 비밀번호 분실 시 이메일로 새로운 임시 비밀번호를 발급받을 수 있다.
  <details>
    <summary><h4>비밀번호 찾기</h4></summary>
    <div markdown="1">
    <img src="https://user-images.githubusercontent.com/55455103/188354287-b2ae44a7-9300-42ef-801c-a71d3cfd33f1.gif"/>
    </div>
  </details>
# Utility
### jwtUtils 클래스 구현
- jwt를 파싱해서 유효한 jwt인지 검증하거나 payload에 있는 사용자의 이름, DB에 저장되어 있는 ID등을 사용하는 로직이 여러 컴포넌트에서 중복되기 때문에 유틸리티 클래스 구현
### axios interceptor
- axios interceptor를 구현하여 HTTP 요청 시 redux의 store에 토큰이 있으면 넣어서 서버의 미들웨어(typeORM 인증 미들웨어)가 이를 검증하게 함
### PrivateRoutes - UX도 고려
- props로 가고자하는 URL과 보여줄 컴포넌트를 넘겨준다.
- 전역 상태(redux-persist)에 저장되어 있는 토큰을 검증하여 인증되지 않은 사용자가 인증된 사용자만 접근할 수 있는 페이지에 접근할 때, 원래 접근하려고 한 URL을 query parameter로 넘겨서 로그인 페이지로 들어가게 한 후, 로그인 페이지에서 로그인 완료시 query parameter로 받은 Redirect URL로 돌아게가 한다. UX적 관점에서 생각을 많이 했다.
- 만약 전역 상태에 저장되어 있는 토큰을 검증해서 유효한 jwt를 가지고 있는 사용자라면 원래 가고자한 페이지로 넘어가게 해준다.
- 관리자일 경우 관리자가 사용할 수 있는 메뉴를 보여주고 사용자일 경우에는 사용자만 사용할 수 있는 메뉴를 보여준다

# 돌아보며 📝
- HTTP, 세션/쿠키, JWT TOKEN등 기본적인 웹 개발 지식에 대해 더 공부해야 할 것 같다📝
- 다음에는 프로젝트를 진행할 때 다른 사람과 협업을 통해 소통하는 능력을 기르고 프론트엔드 기초부터 탄탄히 다져야 할 것 같다. 부트캠프를 들을까 생각중 ㅠㅠ
- 리액트 관련 공부를 더 많이 해야할 것 같다.. 코딩 컨벤션과 라이브러리 사용이 많이 부족하다!
- useEffect 훅으로 서버의 데이터를 가져올 때 렌더링 최적화를 할 필요가 있는 것 같다
- 다음에 프로젝트를 진행할 때는 recoil을 사용해서 전역 상태 관리를 하고 react-query를 사용해서 서버 상태 관리를 해봐야겠다!
- 다음에 인증기능을 구현할 때는 refresh token과 access token을 사용해서 좀 더 보안에 신경써서 프로젝트를 진행할 예정이다
# 아래 링크에 기능 및 설명에 대해 하드코딩 해두었다😎
- http://surveyblue.site/explain

# BE 소스코드 ↓↓↓'
- https://github.com/ejzl521/SurveyBlue-BE
