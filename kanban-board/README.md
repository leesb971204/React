# Kanban-Board

## 프로젝트 소개

접속한 사용자들이 소켓 통신을 기반, 실시간으로 작업을 시각화 하여 Drag & Drop 형태로 관리하는 애자일 프로젝트 관리 도구

<br>

## 사용 기술

React

[React-Beautiful-DND](https://github.com/atlassian/react-beautiful-dnd)

Node.js

Express.js

Socket.io

Styled-Components
<br>

## 프로젝트 주요 기능

<br>
### 최초 접속
<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060144-2149108e-4e4a-4cf7-a24c-389bb99b3a73.PNG">

> 👉 사용자가 최초로 접속하게 되면 고유 아이디(랜덤한 rgb값 3개)를 부여받게 되며 4개의 columns와 기본적인 task 아이템 2개가 존재합니다.

### 아이템 추가

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060421-539a2c20-de56-4123-918f-072c2e07ba26.gif">

> 👉 각 columns 이름의 우측에 위치한 + 버튼을 클릭해 아이템을 추가할 수 있습니다.

### 아이템 삭제

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060515-e79f1580-d9be-488e-a748-df137788ac09.gif">

> 👉 각 아이템 우측에 위치한 X 버튼을 클릭해 아이템을 삭제할 수 있습니다.

### 아이템 수정

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060625-3157b8a1-c12e-4c5c-98df-9134376b3894.gif">

> 👉 각 아이템 우측에 위치한 E 버튼을 클릭 후 나타나는 input 태그 안에 내용을 적고 다시 E 버튼을 클릭하면 아이템의 제목과 내용을 수정할 수 있습니다.

### 아이템 위치 변경

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060709-028e8d63-629f-4c56-b6f3-64c752522caa.gif">

> 👉 각 아이템을 마우스 왼쪽 클릭 후 끌어서 놓음으로 원하는 위치로 옮길 수 있습니다.

### 새로운 사용자 입장

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060821-1db34dd6-39e7-40b8-b0e6-310b1c607499.gif">

> 👉새로운 사용자가 입장하게 되면 자신의 아이디를 제외한 접속한 모든 유저들의 아이디(color)를 우측 상단에서 확인할 수 있습니다. (로컬에서는 탭을 여러개 띄워서 테스트)

### 소켓으로 실시간 통신

<br>
<img width="654" alt="스크린샷 2021-11-08 오전 9 21 00" src="https://user-images.githubusercontent.com/75251270/187060962-f001b0aa-2722-41c1-83a8-78a344dacece.gif">

> 👉구현한 모든 기능들은 접속한 유저들끼리 소켓으로 통신하기에 아이템 변경 내용을 실시간으로 확인 가능합니다.

## 사용 방법

```
git clone -> client, server 경로에서 각각 $npm i  -> \client > $npm run start & \server > $node app.js
```
