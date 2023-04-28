import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  /**
   * @private
   * private 키워드 때문에, 해당 인스턴스는 클래스 내부에서만 접근할 수 있음.
   * 그래서 클래스의 캡슐화를 보장함.
   *
   * @readonly
   * 의존성 주입받은 `reservationsService`를 읽기 전용으로 하여, 불변성을 보장
   *
   * @constructor
   * `nestjs`에서는 `constructor`로 의존성 주입 받는 클래스 인스턴스를 받음.
   * 이렇게 주입 받는 클래스 인스턴스는 `@injectable()` 데코레이터가 붙어 있어야 함.
   * 그리고 해당 인스턴스는 싱글톤임
   *
   */
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
