import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();

/**
 * @whitelist
 * whitelist는 유효성 검사를 수행할 때, 해당 객체가 선언된 속성 외에 다른 속성을 가지고 있을 경우 해당 속성을 자동으로 제거하는 옵션입니다.
 * 예를 들어, ValidationPipe를 사용하여 데이터 유효성을 검사하고, whitelist 옵션을 true로 설정한 경우,
 * 검증 대상 객체에 name이라는 속성이 있다면 name 속성을 유지하면서, age나 email과 같은 추가 속성이 있다면 해당 속성을 자동으로 제거합니다.
 * 이러한 기능을 사용하면, 보안상의 이유로 사용하지 않아도 되는 데이터를 필터링할 수 있으며, 불필요한 데이터가 서버로 전송되는 것을 방지하여 서버의 부하를 줄일 수 있습니다.
 */
