import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseModule } from './base';
import { ConfigsModule } from './configs';
import { RepoModule } from './repos';

@Module({
  imports: [
    ConfigsModule,
    BaseModule,
    RepoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
