import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // create a nest js application instance
  const app = await NestFactory.create(AppModule);

  // start the application and listen to thiis port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
