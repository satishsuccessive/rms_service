import { ISwaggerDefinition } from '../libs/Swagger';
import { IAuthProviderConfig } from './IAuthProviderConfig';

export interface IConfig extends ISwaggerDefinition {
  env: string;
  apiPrefix: string;
  port: string;
  corsOrigin: string;
  mongo: string;
  mongooseDebug: boolean;
  authProvider: IAuthProviderConfig;
  swaggerUrl: string;
}
