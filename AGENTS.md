# AGENTS.md

## 프로젝트 개요

- SEOKO 웹 클라이언트
- 목표: 기존 동작 유지 기반 의존성 및 개발 환경 최신화

## 패키지 매니저

- 반드시 `pnpm`을 사용
- `npm`, `yarn`을 사용하지 않음
- 의존성 설치 및 변경 시 `pnpm` 명령어를 사용
- `pnpm-lock.yaml`을 임의로 수정하지 않음
- `pnpm install` 시 의존성 충돌 발생 시 사용자에게 명시적으로 요청 후 해결
- 가능한 경우 `pnpm install --frozen-lockfile`을 사용하여 의존성 상태를 검증

## 터미널 명령

- 필요한 요청의 경우 사용자에게 명시적으로 요청 후 수행

## 프로젝트 구조 및 모듈 구성

- TypeScript 기반 Next.js App Router 클라이언트.

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

## 작업 범위

### Next.js 업그레이드

- Next.js 15 → 16 업그레이드만 수행
- Next.js 16 업그레이드에 필요한 관련 의존성
- 업그레이드 호환성 범위의 최소 코드 수정 허용
- 대상: deprecated·제거 API, Next.js 설정·빌드 방식·TypeScript 타입·ESLint 설정, 빌드 및 런타임 오류

### 리팩토링 제외

- 일반 코드 개선, 구조 변경, 변수명 변경, 상태 관리·API·데이터 fetching·React Query 변경 제외
- 디자인 패턴 변경, 성능 최적화, 사용하지 않는 코드 삭제, 대규모 스타일 변경 제외
- 예외: Next.js, React, TypeScript, ESLint 버전 호환성 확보에 필요한 최소 변경

### ESLint·Prettier

- ESLint 최신 버전 및 flat config 마이그레이션
- 허용 대상: `.eslintrc.*`, `eslint.config.*`, plugin·rule, Next.js ESLint 설정, deprecated rule 대응
- Prettier 최신 버전 적용 및 기존 formatting convention 유지
- 포맷 변경: 버전 호환성에 필요한 범위로 한정
- deprecated된 문법, 파일, rule, plugin, 설정 제거

## 의존성 범위

- Next.js 업그레이드에 필요한 peer dependency만 확인·업데이트
- 업그레이드와 무관한 패키지 업데이트, 라이브러리 추가·교체·제거, 대규모 dependency 업데이트 제외

## 최종 목표

- Next.js 16 정상 동작
- 기존 주요 기능 및 프로젝트 구조 유지
- ESLint·Prettier 최신 버전 적용
