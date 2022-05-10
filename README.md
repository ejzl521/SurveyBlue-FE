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
- 게시판 전체 보기
- 게시판 등록, 삭제, 수정 (로그인한 사용자만 가능)
- 중복 설문 참여 
- 댓글 
- 댓글 등록(로그인한 사용자만 가능)

# 프로젝트 자세한 설명 ↓↓↓↓
https://duckgugong.tistory.com/category/%28typeORM%20%2B%20React%29%20%EA%B2%8C%EC%8B%9C%ED%8C%90%20%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EA%B5%AC%ED%98%84/React%EC%97%90%20API%20%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
