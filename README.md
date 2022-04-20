# admin-v2 템플릿

### 1. submodule로 등록해서 사용할 때

- github 상단 `Use this template` 버튼을 사용하여 레포 생성
- lerna 프로젝트 root에서 submodule로 등록

```shell
$ git submodule add git@github.com:<github_username>/<repo_using_app_template>.git apps/admin-<module_name>
```

- submodule 업데이트

```shell
$ git submodule update
```

- 앱 모듈 `package.json`의 name 변경 (lerna 실행 스크립트를 위해 `admin` prefix 사용 - ex.`admin-auth`)
- lerna 프로젝트 root에 있는 `.env` 파일에 port 추가 (`package.json`의 name과 동일하게 사용 - 모두 대문자)

```shell
cat >> <app_name>_PORT=3002
```

- 깨끗하게 새로 npm 패키지들을 새로 설치

```shell
$ yarn bootstrap
```

- 실행

```shell
$ yarn dev:app
```

### 2. 그 외

- lerna 프로젝트의 root에서 `apps/<app_name>` 클론 받음

```shell
$ git clone <repo name> apps/<app_name>
```

## development

- 특정 앱만 띄워서 작업할 때는 `.env` 파일이 해당 앱 루트에 존재해야 함
- 띄우고자 하는 모듈 앱의 루트에 `.env` 파일이 없다면 `.env.default` 복사하여 `.env` 파일 생성
  ```bash
  $ cp .env.default .env
  ```
- 아래 명령어 사용하여 실행
  ```bash
  $ ENV_PATH=./.env yarn dev
  ```
  - `ENV_PATH` 를 환경변수로 주입
- lerna 프로젝트 루트의 `.env` 내용이 업데이트 되있다면 내부 앱들도 모두 동일하게 유지
