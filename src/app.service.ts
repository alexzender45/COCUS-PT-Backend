import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerMessage(): string {
    return 'COCUS Service is up and running!';
  }
}
