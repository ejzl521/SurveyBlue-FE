# React로 게시판 사이트 만들기

# 개발 환경
- webStorm (React 프로젝트)

# 사용 라이브러리 및 기술
- Ant Design (CSS 프레임워크)
- scss
- axios (Http 요청)
- react router (라우팅)
- formik, yup (form 유효성 체크)
- react-toastify (토스트 알림)
- redux, redux-persist(로그인 성공시 생성되는 jwt-token 정보를 session storage에 저장: 새로고침해도 로그인 정보를 저장)
- jwt-decode (jwt-token 파싱)
- axios interceptor 구현 (api에 인증 미들웨어를 설정해서 HTTP Header에 jwt-token 정보를 넘기기 위해 구현)
- Private Route 구현 (로그인에 성공해서 인증된 사용자만 통과시킬 수 있는 컴포넌트 구현)
- jwt-token 유효성 검증 & 해독 유틸리티 클래스 구현

# 기능
- 회원가입
- 로그인, 로그아웃
- 설문조사 전체 보기
- 설문조사 등록, 삭제, 수정 (로그인한 사용자만 가능)
- 중복 설문 참여 방지
- 댓글 
- 댓글 등록(로그인한 사용자만 가능)
- 사용자 역할 구분(관리자/사용자)

# 아래 링크를 통해서 기능 및 설명에 대해 자세히 알아보자
- http://surveyblue.site/explain

