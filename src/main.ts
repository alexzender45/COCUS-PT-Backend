import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './app.errors';
import { AppModule } from './app.module';
import { EnvironmentService } from './configs';

class Server {
  private static env = EnvironmentService.getAll();
  public static async start(): Promise<void> {
    const app = await NestFactory.create(AppModule, { cors: true });

    Server.mountMiddlewares(app);

    await app.listen(EnvironmentService.getValue('PORT'));
    await app.startAllMicroservices();
  }

  private static mountMiddlewares(app: INestApplication): void {
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe());
  }
}

Server.start().then();
