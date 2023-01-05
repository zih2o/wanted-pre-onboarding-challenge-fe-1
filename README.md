# Wanted 23년 1월 FE 사전과제
## 1. 기술 스택
<div align="center">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
<img src="https://img.shields.io/badge/-react--hook--form-%23EC5990?style=for-the-badge">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E">
<p>Axios Instance 사용을 통한 token 중복 코드 최소화</p>
<p>react-query 사용을 통한 실시간 데이터 상태관리</p>
<p>tailwind CSS를 통한 생산성 높은 CSS 작업</p>
<p>react-hook-form 사용을 통한 input value 관리</p>
<p>modal을 통한 Todo update</p>
<p>vite를 통한 신속한 빌드</p>
</div>

## 2. 요구 사항 구현 목록
### Assignment 1 - Login / SignUp
- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 @, . 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
 
### Assignment 2 - Todo List
- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요

  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x]  Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.

  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
  - [x] 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다
  
## 3. 상세화면
- 메인페이지
<img src="https://user-images.githubusercontent.com/85221728/210736523-f0ef9a21-1871-4914-989c-916271f46dce.png">
- TODO 수정
<img src="https://user-images.githubusercontent.com/85221728/210738636-28334638-6daa-47ca-b109-32b9919a3000.png">
- 로그인 페이지
<img src="https://user-images.githubusercontent.com/85221728/210737626-fe3f73b6-e03d-4e53-9a3e-4c178e2106a5.png">
<img src="https://user-images.githubusercontent.com/85221728/210738493-fbe4d0e5-5f18-4e0e-a8b9-ac5e9793e6d6.png">
- 회원가입 페이지
<img src="https://user-images.githubusercontent.com/85221728/210738326-5440c429-2a8a-402e-9e51-5186e6d20ec4.png">
<img src="https://user-images.githubusercontent.com/85221728/210737832-04f58b7c-d603-4be3-84b6-286add21fa5f.png">

## 4. 실행방법
```
npm install
npm run dev
```
