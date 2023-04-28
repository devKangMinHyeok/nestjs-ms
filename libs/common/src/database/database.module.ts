import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

/**
 * @MongooseModule
 * `MongooseModule`은 외부로 메서드를 반환하기 위한 외부 인터페이스의 역할을 한다.
 *
 * 내부 모듈은 `MongooseCoreModule`로, 실질적으로 로직이 돌아가는 곳은 `MongooseCoreModule`이다.
 *
 * 이는 `MongooseCoreModule`을 외부에 은닉하기 위함인데, 그래서 `MongooseModule`은
 * `mongooseCoreModule`을 의존성 주입하지 않고, 직접 `import` 해서 단독으로 사용한다.
 *
 * @forRootAsync_options
 * `forRootAsync`에는 여러 옵션이 있다.
 * `imports`는 주로, `useFactory`에 사용되는 모듈을 가져오는데 사용되고,
 * `inject`도 마찬가지로, 주입할 `provider` 목록을 지정하는데 사용된다.
 *
 * 그래서 `imports`와 `inject` 속성을 통해, `MongooseOptionsFactory`를 생성하고
 * 주입하는데 필요한 외부 모듈과 서비스를 지정할 수 있게 된다.
 *
 * 그리고 `useFactory`를 통해 비동기적으로 반환되는 값을 통해, 모듈 로드 시의 초기화 작업에서 원하는
 * 값을 설정할 수 있게 된다.
 *
 * 즉, `useFactory`가 비동기적으로 값을 반환하고 초기화 작업을 하기 때문에,
 * 이 모듈이 주입된 다른 모듈에서는 초기화 작업이 끝나야만 무조건 작업이 진행된다.
 * 그 말은 이 서비스를 필요로 하는 다른 객체들이 이를 사용하기 전에
 * 초기화 작업이 끝나는 것을 보장할 수 있다는 말이다.
 * 이를 통해, 의존성 문제를 해결할 수 있다.
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get('MONGODB_URI'),
      }),
    }),
  ],
})
export class DatabaseModule {
  /**
   *
   * @static
   * 정적 메서드, 인스턴스 생성 없이도 사용가능
   * this 키워드 사용불가, 순수함수로 동작하기 좋음
   *
   * @forFeature
   * MongooseModule의 static method로 `forFeature`가 존재함.
   *
   * ```ts
   * static forFeature(
   *   models: ModelDefinition[] = [],
   *   connectionName?: string,
   * ): DynamicModule {
   *   const providers = createMongooseProviders(connectionName, models);
   *   return {
   *     module: MongooseModule,
   *     providers: providers,
   *     exports: providers,
   *   };
   * }
   * ```
   *
   * 위와 같은 소스코드를 가지고 있음.
   * models에는 ModelDefinition 타입의 원소들이 담겨있고,
   * 이를 기반으로 providers를 생성하고 Module을 반환한다.
   */
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
