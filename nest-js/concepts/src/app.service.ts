import { Injectable } from '@nestjs/common';

// decorator
//  contais business logic of the application
@Injectable() 
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
