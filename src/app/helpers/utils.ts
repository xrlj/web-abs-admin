import {Buffer} from 'buffer';
import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import { JwtHelperService } from '@auth0/angular-jwt'; // https://github.com/auth0/angular2-jwt

@Injectable()
export class Utils {

  /**
   * 字符串转码base64。
   * @param content 待转码字符串
   */
  base64encoder(content: string): string {
    const encoder = new Buffer(content).toString('base64')
    return encoder;
  }

  /**
   * base64解码成字符串。
   * @param base64 base64编码。
   */
  base64decoder(base64: string): string {
    const decoder = new Buffer(base64, 'base64').toString()
    return decoder;
  }

  /**
   * 内容md5加密。以字符串形式返回。
   * @param content 待加密内容。
   */
  md5Str(content: string): string {
    const md5Str = Md5.hashStr(content).toString();
    return md5Str;
  }

  /**
   * 解析jwt token。
   * @param token 待解析token。
   */
  jwtTokenDecode(token: string): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken;
  }

  /**
   * 判断token是否已经过期。
   * @param token 保存的token。
   */
  jwtTokenIsExpired(token: string): boolean {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return isExpired;
  }
}
