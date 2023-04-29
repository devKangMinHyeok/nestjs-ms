import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}

/**
 * @jwtService_sign
 * jwtService.sign()은 JSON Web Token(JWT)을 생성하는 메소드
 *
 * sign() 메소드는 두 개의 매개변수를 받습니다.
 * 첫 번째 매개변수는 토큰에 저장할 정보를 담은 객체로, 두 번째 매개변수(선택)는 JWT 비밀키입니다.
 * 비밀키는 토큰을 암호화하고, 서버에서 토큰을 검증할 때 사용됩니다.
 *
 *
 * @httpOnly
 * httpOnly 옵션은 JavaScript에서 쿠키에 접근하지 못하게 하는 것입니다.
 * 이렇게 함으로써 XSS(Cross-Site Scripting) 공격 등에서 쿠키가 유출되어도
 * 토큰 정보가 노출되지 않습니다.
 */
