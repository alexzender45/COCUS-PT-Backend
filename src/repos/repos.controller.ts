import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Get,
  Param,
  Delete,
  Query,
  Put,
  HttpException,
  Req,
} from '@nestjs/common';
import { BaseService } from '../base'
import { RepoService } from './repos.service';
import { Request } from 'express'; 

@Controller('repos')
export class RepoController {
  @Inject(RepoService)
  private readonly repoService: RepoService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Get(':username')
  public async findUserByUsername(@Req() req: Request, @Param('username') username: string) {
      if(req.headers.accept === 'application/xml') {
        throw new HttpException({
          status: 'Not Allowed',
          message: 'Bad Request',
        }, 406);
      }
    const repos = await this.repoService.findUserByUsername(username)
    return this.baseService.transformResponse(
      'Repos found successfully',
      repos,
      HttpStatus.OK,
    );
}
  }
