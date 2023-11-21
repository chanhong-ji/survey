# Survey Project

## Description

Survey backend program built using NestJS, Graphql, TypeORM

## 설치 및 구성

### 설치

1. 프로젝트 생성

```bash
$ git clone https://github.com/chanhong-ji/survey.git

$ cd survey/
```

2. .env 파일 생성

```bash
$ touch .env
```

3. 의존성 설치

```bash
$ npm install
```

### .env 추가

```bash
# 자신의 데이터베이스 정보에 맞게 수정해주세요
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=1234
DATABASE_NAME=survey
```

### 실행

```bash
# 개발환경으로 실행
$ npm run start
```

### Playground


브라우저에서 Graphql Playground 실행

```
http://localhost:4000/graphql
```

## Features

### ⭐ Model

```text
Survey - Question : One-To-Many

Question - Choice : One-To-Many

AnswerSheet - Answer : One-To-Many

Survey - AnswerSheet : One-To-Many
```

#### Unique features

- **답변**(Answer) 스키마의 id를 답변지(AnswerSheet)와 질문(Question)의 아이디를 이용한 **Composite primary key, 복합 프라이머리 키**로 사용

---

### ⭐Operation

- Survey (설문지)

  - getSurvey(id:number)
    - 설문지의 질문(Question)과 선택지(Choice)가 순서(order)에 따라 정렬되어 조회
  - getSurveys(page?:number)
    - 페이지 번호에 따른 설문지를 최근 순으로 조회
  - createSurvey
  - updateSurvey
  - removeSurvey

- Question (질문)

  - getQuestion
  - createQuestion
  - updateQuestion
  - removeQuestion

- Choice (선택지)

  - getChoice
  - createChoice
  - updateChoice
  - removeChoice

- AnswerSheet (답변지)
  - createAnswerSheet
    - 설문지의 ID 와 답변(Answer)의 배열을 입력받아 답변지 생성
    - 데이터무결성을 위해 transaction 처리
  - getAnswerSheet
    - 제출한 답변지를 질문(Question)과 선택한 선택지(Choice)와 함께 조회 가능
    - 총점(totalScore) 조회 가능
  - getAnswerSheets
    - 설문지 Id 를 입력받아 해당 답변지 조회
  - removeAnswerSheet
- Answer (답변)
  - updateAnswer
    - 단일한 답변(Answer)에 대해 변경 가능

---

### ⭐ Error & Log

#### 1. Error

- 예측 가능한 error 에 대해 Nestjs 의 [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions) 를 발생
- GraphqlModule 이 제공하는 global interceptor 를 이용해 Graphql Error 로 변환 후, 응답
- NestJS 의 [Exception filter](https://docs.nestjs.com/exception-filters) 를 확장(extends)하는 Custom Exception filter 생성하여 전역적으로 에러를 필터링

#### 2. Logging

- NestJS 의 [Interceptor](https://docs.nestjs.com/interceptors)를 implement 하는 LoggingInterceptor 를 생성하여 전역적으로 에러에 대한 로그 출력
- NestJS 의 built-in [Logger](https://docs.nestjs.com/techniques/logger) 를 사용
- 500번대 에러에 대해 error 로 처리
- 400번대 에러에 대해 warn 으로 처리

---

## Project structure

```
src
├─ main.ts
├─ app.module.ts
├─ config
│  └─ configuration.ts
│
├─ common
│  ├─ dtos
│  │  └─ coreOutput.dto.ts
│  ├─ entities
│  │  └─ common.entity.ts
│  ├─ filter
│  │  └─ allExceptions.filter.ts
│  └─ interceptors
│     └─ loging.interceptor.ts
│
├─ answer-sheets
│  ├─ answer-sheets.module.ts
│  ├─ answer-sheets.resolver.ts
│  ├─ answer-sheets.service.ts
│  ├─ dtos
│  │  ├─ answer
│  │  │  ├─ create-answer.dto.ts
│  │  │  └─ update-answer.dto.ts
│  │  └─ answerSheet
│  │     ├─ create-answersheet.dto.ts
│  │     ├─ get-answersheet.dto.ts
│  │     ├─ get-answersheets.dto.ts
│  │     └─ remove-answersheet.dto.ts
│  ├─ entities
│  │  ├─ answer.entity.ts
│  │  └─ answerSheet.entity.ts
│  └─ test
│     ├─ answer-sheets.controller.spec.ts
│     └─ answer-sheets.service.spec.ts
│
└─ surveys
   ├─ surveys.module.ts
   ├─ surveys.resolver.ts
   ├─ surveys.service.ts
   ├─ dtos
   │  ├─ choice
   │  │  ├─ create-choice.dto.ts
   │  │  ├─ get-choice.dto.ts
   │  │  ├─ remove- choice.dto.ts
   │  │  └─ update-choice.dto.ts
   │  ├─ question
   │  │  ├─ create-question.dto.ts
   │  │  ├─ get-question.dto.ts
   │  │  ├─ remove-question.dto.ts
   │  │  └─ update-question.dto.ts
   │  └─ survey
   │     ├─ create-survey.dto.ts
   │     ├─ get-survey.dto.ts
   │     ├─ get-surveys.dto.ts
   │     ├─ remove-survey.dto.ts
   │     └─ update-survey.dto.ts
   ├─ entities
   │  ├─ choice.entity.ts
   │  ├─ question.entity.ts
   │  └─ survey.entity.ts
   └─ test
      ├─ surveys.resolver.spec.ts
      └─ surveys.service.spec.ts

```
