import { config } from 'dotenv';
import { EnvironmentVariables } from './env.interface';

config();

export class EnvironmentService {
  public static getAll(): EnvironmentVariables {
    return {
      node_env: process.env.NODE_ENV,
      port: Number(process.env.PORT),
      github_token: process.env.GITHUB_TOKEN,
      
    };
  }

  public static getValue(key: string): string {
    return EnvironmentService.getAll()[key.toLocaleLowerCase()];
  }
}
