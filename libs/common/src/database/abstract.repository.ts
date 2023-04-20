import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

/**
 * @abstract_class
 * AbstractRepository는 추상 클래스이기 때문에, 이 클래스를 직접적으로 인스턴스화는 할 수 없음
 * AbstractRepository 클래스를 상속받은 클래스에서 이 클래스를 구현하여 사용할 수 있음
 * 이 때, AbstractRepository 클래스에서 정의한 메서드들은, 중복 코드를 작성하지 않을 수 있게 만들어줌
 *
 * @generic
 * 현재 <TDocument extends AbstractDocument> 와 같이 제네릭 타입을 사용하여 클래스가 구현되어 있음
 * TDocument가 AbstractDocument 클래스를 상속받았기 때문에, TDocument는 기본적으로 AbstractDocument에
 * 존재하는 필드들을 갖는 MongoDB 문서를 다루는 Schema여야 한다.
 *
 * @protected
 * protected 키워드를 통해, 해당 필드는 AbstractRepository 클래스와 이 클래스를 상속 받는 하위 클래스에서 접근 가능
 *
 * @Logger
 * NestJs에서 제공하는 로그 출력 클래스, 인스턴스 생성시에 log 출력에 대한 컨텍스트를 전달함
 * 여기에서는 logger 필드를 추상 필드로 정의하고 있음
 * AbstractRepository 클래스를 상속받은 하위 클래스에서 logger 필드를 구현하여 사용해야 함
 *
 *
 *
 */
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * @Omit
   * Omit<TDocument, '_id'>는 TDocument type에서 _id 키를 생략한 타입
   *
   * @as_unknown
   * createdDocument.save() 메서드의 반환값은 Document 타입임
   * 그런데, 이 Document 타입을 바로 TDocument 타입으로 타입 캐스팅할 수 없음
   * 그래서 as unknown으로 중간에 unknown으로 타입 캐스팅을 함
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * @model_findOne
   * Model 클래스의 메서드 중 하나로, 지정된 쿼리에 매칭되는 단일 document를 조회
   * 첫번째 인자 - filterQuery는 조회할 document의 조건을 지정하는 객체
   * 두번째 인자 - 조회할 필드를 선택하는 객체, 생략시 모든 필드 조회
   * 세번째 인자 - options는 조회 옵션 지정,
   * + lean 옵션은 조회 결과를 Document 인스턴스가 아닌, JavaScript Object 형태로 반환
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  /**
   * @findOneAndUpdate
   * 지정된 쿼리에 매치되는 단일 document를 업데이트하고, 업데이트된 document를 반환
   * 첫번째 인자 - filterQuery는 업데이트할 문서의 조건을 지정하는 객체
   * 두번째 인자 - update는 업데이트할 내용을 지정하는 객체
   * 세번째 인자 - options는 조회 옵션을 지정하는 객체
   * + new 옵션은 업데이트된 document를 반환할 때, 업데이트 이후의 값으로 반환
   *
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
