import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';

/**
 *
 * @ExecutionContext
 * ExecutionContext는 HTTP 요청이 처리되는 동안
 * 실행 중인 컨트롤러, 미들웨어, 인터셉터 등의 객체의 실행 컨텍스트를 나타내는 인터페이스
 * ExecutionContext는 HTTP 요청을 처리하는 동안 현재 요청, 응답 및 다른 관련 정보를 포함
 *
 * @switchToHttp
 * 현재 실행 중인 요청이 HTTP 요청인 경우 해당 요청의 HTTP 관련 객체를 가져옵니다
 * `switchToHttp` 메소드는 HTTP 요청을 처리하는 데 필요한 컨텍스트를 가져오기 위해 사용
 *
 * `switchToHttp`는 `ExecutionContext`에서
 * HTTP 요청 및 응답 객체를 참조할 수 있는 `HttpArgumentsHost` 객체를 반환
 *
 * `HttpArgumentsHost`는 HTTP 요청 및 응답 객체를 반환하는 다양한 메소드를 제공
 *
 * 예를 들어, `getRequest()` 및 `getResponse()` 메소드를 사용하여
 * 현재 HTTP 요청 및 응답 객체를 가져올 수 있습니다.
 *
 * @user
 * 이 프로퍼티는 Passport 모듈에서 자동으로 생성되어 추가
 * Passport 모듈에서는 인증이 완료된 사용자 정보를 req.user 객체에 저장
 * 이 객체는 @nestjs/passport 모듈의 AuthGuard 클래스와 같은 인증 가드에서 자동으로 생성
 */
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

/**
 * @createParamDecorator
 * 데코레이터를 만들기 위한 헬퍼 함수
 * createParamDecorator 함수는 매개변수로 받은 함수를 실행하고
 * 그 결과를 데코레이터의 반환값으로 만들어줌
 *
 *
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
