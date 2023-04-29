import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { Response } from 'express';
import { UserDocument } from './users/models/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }
}

/**
 * @Res
 * Express.js에서 제공하는 Response 객체를 nestjs 컨트롤러에서 사용할 수 있게 해주는 데코레이터
 *
 * @passthrough
 * { passthrough: true } 옵션은
 * 응답 객체에 대한 참조를 컨트롤러나 서비스 등의 다른 곳에서도 사용할 수 있도록 해줌
 * 이 옵션을 사용하지 않을 경우, NestJS에서는 응답 객체를 자동으로 버퍼에 쌓아놓고,
 * 컨트롤러에서 response.send()와 같은 메소드를 호출할 때 응답을 보냄
 * authService.login() 메소드에서도 response 객체를 사용하여 응답을 조작 가능
 *
 */
