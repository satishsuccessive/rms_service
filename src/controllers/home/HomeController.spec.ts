import { StatusCodes } from '@gdo-node-experts/dan-response-handler';
import { AuthorizationManager, OktaAuthenticationManager } from '@gdo-tvstack/dan-auth-middleware';
import MongoMemoryServer from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as sinon from 'sinon';
import * as supertest from 'supertest';
import { homeModel } from '../../repositories/business/home/model';
import config from './../../config/configuration';
import { API_PREFIX } from './../../libs/constants';
import Server from './../../Server';

describe('Home Controller', () => {
  const sandbox = sinon.createSandbox();
  const user = 'test@test.com';
  // @ts-ignore
  const server = new Server(config);
  const app = server.bootstrap();
  const request = supertest(app);
  let mongoServer;
  beforeAll(async () => {
    // Opening of DB connection and clearing the Database
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  afterAll(() => {
    // Closing of DB connection
    mongoose.disconnect();
    mongoServer.stop();
  });
  beforeEach((done) => {
    const mockJWTToken = {
      claims: {
        sub: user,
      },
    };
    const mockJWTTokenPromise = new Promise((resolve, reject) => {
      return resolve(mockJWTToken);
    });

    const OktaAuthenticationManagerMock = sandbox.mock(
      OktaAuthenticationManager.prototype,
    );

    OktaAuthenticationManagerMock.expects('authenticate')
      .returns(mockJWTTokenPromise);

    const authorization = AuthorizationManager.getInstance();
    const mockAuthorizationInstance = sandbox.mock(AuthorizationManager.prototype);
    mockAuthorizationInstance.expects('authorize').returns(new Promise((resolve, reject) => {
      return resolve(true);
    }));

    done();
  });

  afterEach(async (done) => {
    await sandbox.restore();
    done();
  });

  describe('Create', () => {
    it('should insert the record', async () => {
      return request
        .post(`${API_PREFIX}/homes`)
        .send({ name: 'test' })
        .expect('Content-Type', /json/)
        .expect(StatusCodes.SUCCESS)
        .then((res) => {
          expect(res.body.data.name).toBe('test');
        });
    });
  });
});
