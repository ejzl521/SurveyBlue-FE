# React로 설문조사 플랫폼 만들기😎

# 개발 환경
- webStorm (React 프로젝트)

# 사용 라이브러리 및 기술
- Ant Design (CSS 프레임워크)
- scss
- axios (Http 요청)
- react router (라우팅)
- formik, yup (form 유효성 체크)
- react-toastify (토스트 알림)
- redux, redux-persist(로그인 성공시 생성되는 jwt-token 정보를 session storage에 저장)
- jwt-decode (jwt-token 파싱)
- axios interceptor 구현 (api에 인증 미들웨어를 설정해서 HTTP Header에 jwt-token 정보를 넘기기 위해 구현)
- Private Route 구현 (로그인에 성공해서 인증된 사용자만 통과시킬 수 있는 컴포넌트 구현, 사용자와 관리자도 )
- jwt-token 유효성 검증 & 해독 유틸리티 클래스 구현
- 이미지 업로더(설문조사 객관식 문제 등록 가능!)

# 기능
- 회원가입
- 로그인, 로그아웃
- 설문조사 전체 보기
- 설문조사 등록, 삭제, 수정 (로그인한 사용자만 가능)
- 설문조사 참여 (중복 설문 참여 방지)
- 설문조사 통계 보기
- 비밀번호 찾기 및 변경
- 사용자 역할 구분(관리자/사용자)

# 아래 링크에 기능 및 설명에 대해 하드코딩 해두었다😎
- http://surveyblue.site/explain

