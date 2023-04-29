import { AuthGuard } from '@nestjs/passport';

/**
 * @AuthGuard
 * getRequest() 메소드에서 반환된 HTTP 요청 객체에는 user 프로퍼티가 존재하지 않음.
 * 이 프로퍼티는 Passport 모듈에서 자동으로 생성되어 추가
 * Passport 모듈에서는 인증이 완료된 사용자 정보를 req.user 객체에 저장
 * 이 객체는 @nestjs/passport 모듈의 AuthGuard 클래스와 같은 인증 가드에서 자동으로 생성
 * 따라서, getRequest() 메소드를 호출하여 반환된 HTTP 요청 객체에서 user 프로퍼티를 참조하는 것은
 * Passport 모듈에서 추가된 기능입니다.
 */
export class LocalAuthGuard extends AuthGuard('local') {}
