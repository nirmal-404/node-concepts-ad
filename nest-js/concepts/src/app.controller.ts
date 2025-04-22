import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //  AppService is injected through the constructor
  // conatructor based dependency injection
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // using the injected service to get the getHello method
    return this.appService.getHello();
  }
}
 