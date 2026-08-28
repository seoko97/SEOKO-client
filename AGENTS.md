# AGENTS.md

## 프로젝트 개요

- SEOKO 블로그 웹 클라이언트

## 패키지 매니저

- 반드시 `pnpm`을 사용
- `npm`, `yarn`을 사용하지 않음
- 의존성 설치 및 변경 시 `pnpm` 명령어를 사용
- `pnpm-lock.yaml`을 임의로 수정하지 않음
- `pnpm install` 시 의존성 충돌 발생 시 사용자에게 명시적으로 요청 후 해결
- 가능한 경우 `pnpm install --frozen-lockfile`을 사용하여 의존성 상태를 검증

## 터미널 명령

- 필요한 요청의 경우 사용자에게 명시적으로 요청 후 수행
- `pnpm lint`, `pnpm build` 등 검증 명령은 실행 전에 반드시 사용자 승인을 요청

## 언어

- 모든 답변은 한국어로 답변한다.
- 라이브러리, 프레임워크, API, 파일명, 함수명, 타입명, 명령어, 오류 메시지 등 고유한 기술 식별자는 원문 영어 표기를 유지한다.
- 번역만으로 의미가 모호해지거나 검색·문서 확인에 원문이 필요한 기술 용어는 한국어를 먼저 쓰고, 영어 원문을 괄호로 병기한다. 예: 쿼리 키(query key), 낙관적 업데이트(optimistic update)
- 일반적인 설명, PR·Issue 제목과 본문, 코드 리뷰 의견은 한국어로 작성한다. 영어만으로 작성하지 않는다.

## 프로젝트 구조 및 모듈 구성

- TypeScript 기반 Next.js App Router 클라이언트

- **기술 스택**: React 19, Next.js 16, TypeScript 5

- **파일 구조**
  - `src/` : 소스 코드
  - `src/app/` : 라우트 진입점, 동적 라우트 포함
  - `src/components/` : 재사용 가능한 UI 컴포넌트
    - `src/components/pages/` : 라우트 전용 UI 컴포넌트
    - `src/components/ui/` 또는 `src/components/ui/core/` : 공용 UI 프리미티브
  - `src/apis/` : API 클라이언트
  - `src/hooks/` : React Hook
  - `src/types/` : 도메인 타입
  - `src/utils/` : 공용 헬퍼 및 상수
  - `__tests__/` : Jest 테스트

## Git 규칙

- 사용자가 명시적으로 요청하지 않은 `git commit`을 수행하지 않음
- 사용자가 명시적으로 요청하지 않은 `git push`를 수행하지 않음
- 기존 작업 내용을 임의로 삭제하거나 되돌리지 않음
- 작업 시작 전에 현재 Git 변경사항을 확인
- 기존 변경사항과 작업으로 인한 변경사항을 구분
- 커밋 메시지는 `.gitmessage`의 `<타입> : <제목>` 형식을 사용하며, 타입은 다음 중 하나로 작성
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `test`: 테스트 코드 추가
  - `refactor`: 코드 리팩토링
  - `chore`: 빌드 또는 패키지 매니저 수정

## Issue 및 PR 규칙

- 사용자의 명시적 요청 없이 GitHub Issue 생성·수정·닫기 금지
- 사용자의 명시적 요청 없이 PR 생성·수정·병합·닫기 금지
- commit, push, PR 생성은 각각 별도 승인 대상
- PR 생성 전 변경 파일·대상 브랜치·기존 동일 PR 여부 확인
- 관련 없는 변경사항을 PR에 포함하지 않으며, stage는 확인된 파일만 대상
- PR은 별도 요청이 없는 한 draft로 생성

## 브랜치 한정 작업 지침

변경 범위를 write 화면의 form 상태와 생성·수정 컴포넌트 리팩토링으로 한정

- `src/hooks/write`의 write hook 리팩토링
- 게시글 생성·수정 컴포넌트 리팩토링
- 프로젝트 생성·수정 컴포넌트 리팩토링
- 태그 추가·삭제·복원 시 `addedTags`, `deletedTags` 상태 전이 정확성 보장
- 신규 작성 폼의 초기값이 인스턴스 간 공유되지 않도록 수정
- 컴포넌트와 hook의 역할을 분리하고, 기존 API 요청 계약 및 사용자 동작 유지
- write hook의 핵심 상태 전이를 검증하는 테스트 추가 또는 보완
- 리팩토링으로 발생하는 타입 오류 수정
