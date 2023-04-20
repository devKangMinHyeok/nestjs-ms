import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

/**
 * @Schema
 * `@Schema` 데코레이터는 Schema를 정의할 때 사용
 * 이 데코레이터를 통해, 해당 클래스가 Mongoose Schema로 사용됨
 *
 * @Prop
 * `@Prop`은 MongoDB에서의 데이터 타입을 지정하기 위한 것으로,
 * MongoDB에서 해당 필드의 데이터 타입을 지정할 수 있음
 *
 * @_id
 * `@_id` 필드의 데이터 타입은 Typescript에서 사용하기 위한 것으로,
 * Typescript가 인식할 수 있는 데이터 타입이어야 함
 *
 * @SchemaTypes_Types
 * SchemaTypes는 주로 Mongoose Schema에서 필드의 데이터 타입을 지정할 때 사용
 * SchemaTypes는 Typescript에서 인식할 수 없는 타입
 *
 * Types는 Mongoose model에서 값의 타입을 지정하기 위해 사용
 * Types는 Typescript에서 인식할 수 있는 타입
 */
@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
