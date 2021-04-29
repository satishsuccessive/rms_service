import * as supertest from 'supertest';

import config from './config/configuration';
import { API_PREFIX } from './libs/constants';
import Server from './Server';

describe('Health Check', () => {
  // @ts-ignore
  const server = new Server(config);
  const app = server.bootstrap();
  const request = supertest(app);

  beforeAll(() => {
    jest.setTimeout(20000);
  });

  it('should return 404', (done) => {
    request.get(`${API_PREFIX}/fake-url`)
    .expect(404, done);
  });

  it('should return 200', (done) => {
    request.get(`${API_PREFIX}/health-check`)
    .expect(200, done);
  });
});
