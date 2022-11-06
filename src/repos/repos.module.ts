import { Module } from '@nestjs/common';
import { RepoService } from './repos.service';
import { RepoController } from './repos.controller';

@Module({
  controllers: [RepoController],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
