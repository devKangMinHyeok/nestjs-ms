import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    /**
     * usernameField 옵션을 생성자에 넘겨주는 것은 로그인 폼에서 사용자명 필드를 어떤 이름으로 사용할지를 명시하는 것
     * PassportStrategy 클래스는 이메일 필드를 사용자명 필드로 간주하고, 해당 필드를 기반으로 인증을 수행
     */
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
