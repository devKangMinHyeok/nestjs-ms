import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
/**
 * `bcryptjs를 사용하는 이유`
 * bcrypt와 bcryptjs 모두 비밀번호 해시화 및 비교를 수행하는 라이브러리이며, 둘 다 같은 방식으로 작동
 * 하지만 bcrypt는 C++로 작성된 바이너리 바인딩이고, bcryptjs는 순수 JavaScript로 작성된 버전
 * bcrypt는 속도면에서 이점이 있으며 C++ 바이너리를 설치해야 하기 때문에 더 많은 설정이 필요
 * bcryptjs는 JavaScript로 작성되어 있기 때문에 더 가벼우며, 노드.js와 함께 사용하기가 더 편리
 * 특히, dockerize 하고 가상 환경에서 실행되면서 문제 발생 가능성이 높음 - bcrypt
 */
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return this.usersRepository.find({});
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsVaild = await bcrypt.compare(password, user.password);
    if (!passwordIsVaild) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }
}
