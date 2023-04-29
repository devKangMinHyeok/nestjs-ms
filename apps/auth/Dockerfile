# 스테이지(stage)
# Node.js를 설치한 Alpine Linux 기반의 Docker 이미지를 생성하고, 
# 이를 development라는 이름으로 지정하여 해당 이미지를 이용하여 빌드할 수 있도록 설정
FROM node:alpine As development

# /user/src/app 디렉토리를 작업 디렉토리로 지정
WORKDIR /user/src/app

# 작업 디렉토리로 파일을 복사하는 명령어
COPY package.json ./
COPY package-lock.json ./

# Docker 이미지 내부에서 필요한 패키지들을 설치
RUN npm install

# 현재 Dockerfile이 위치한 디렉토리의 모든 파일을 Docker 이미지 내부의 작업 디렉토리로 복사
COPY . . 

RUN npm run build

# 이 명령어는 Node.js를 설치한 Alpine Linux 기반의 Docker 이미지를 생성하고, 
# 이를 production이라는 이름으로 지정하여 해당 이미지를 이용하여 빌드할 수 있도록 설정
FROM node:alpine as production

# ARG NODE_ENV=production은 빌드 시점에 환경 변수를 설정
ARG NODE_ENV=production

# ENV NODE_ENV=${NODE_ENV}는 빌드된 이미지에서 사용될 환경 변수를 설정
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# development 이미지에서 /user/src/app/dist 디렉토리를 현재 이미지의 ./dist 디렉토리로 복사
COPY --from=development /user/src/app/dist ./dist

# Docker 컨테이너가 시작될 때 자동으로 실행될 명령어를 설정
CMD ["node", "dist/apps/auth/main"]