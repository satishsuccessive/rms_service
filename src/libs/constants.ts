export const SWAGGER_URL = '/api-docs';
export const API_PREFIX = '/api';

export const ABOUT = {
  description: 'Kitchen sink API with Swagger',
  in: 'Headers',
  name: 'Authorization',
  title: 'DAN Kitchen sink API',
  type: 'apiKey',
};

// Listing of Environments
export enum EnvVars {
  TEST = 'test',
  LOCAL = 'local',
  DEV = 'dev',
  STG = 'stg',
  PROD = 'prod',
}
