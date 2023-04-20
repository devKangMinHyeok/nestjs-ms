import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';
/**
 * @NestConfigModule_ConfigService
 * `NestConfigModule`의 `forRoot`와 `ConfigService`에 대한 설명
 *
 * `forRoot()` 메서드는 어플리케이션 전체에서 공유되는 `provider`나 `configuration`
 * 같은 전역적으로 사용하는 설정값들을 설정한다.
 *
 * 여기서 `NestConfigModule`는 `@nestjs/config` 라이브러리를 이용해서, 환경 변수 값을
 * 읽어들이는 역할을 한다.
 *
 * 그리고 `forRoot()` 메서드는 이 설정값들을 **초기화**하고, 읽어들인 값들을
 * `ConfigService`를 통해 **전역으로 공유**한다.
 *
 * @joi
 * `joi`는 JS에서 object 유효성 검사를 위한 라이브러리이다.
 * 여기에서는 환경 변수 값의 유효성 검사를 수행한다.
 *
 * @validation
 * 설정값에 대한 validation을 하는 이유로는 대표적으로 프로그램의 안정성 때문이다.
 * 예상치 못한 설정값에 대해, 프로그램이 비정상적으로 동작하는 것을 방지하는데 목적이 있다.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
