import {Buffer} from 'buffer';
import { Injectable } from '@angular/core';

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
}
