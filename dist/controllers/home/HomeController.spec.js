"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dan_response_handler_1 = require("@gdo-node-experts/dan-response-handler");
const dan_auth_middleware_1 = require("@gdo-tvstack/dan-auth-middleware");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose = require("mongoose");
const sinon = require("sinon");
const supertest = require("supertest");
const configuration_1 = require("./../../config/configuration");
const constants_1 = require("./../../libs/constants");
const Server_1 = require("./../../Server");
describe('Home Controller', () => {
    const sandbox = sinon.createSandbox();
    const user = 'test@test.com';
    // @ts-ignore
    const server = new Server_1.default(configuration_1.default);
    const app = server.bootstrap();
    const request = supertest(app);
    let mongoServer;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        // Opening of DB connection and clearing the Database
        mongoServer = new mongodb_memory_server_1.default();
        const mongoUri = yield mongoServer.getConnectionString();
        yield mongoose.connect(mongoUri, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }));
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
        const OktaAuthenticationManagerMock = sandbox.mock(dan_auth_middleware_1.OktaAuthenticationManager.prototype);
        OktaAuthenticationManagerMock.expects('authenticate')
            .returns(mockJWTTokenPromise);
        const authorization = dan_auth_middleware_1.AuthorizationManager.getInstance();
        const mockAuthorizationInstance = sandbox.mock(dan_auth_middleware_1.AuthorizationManager.prototype);
        mockAuthorizationInstance.expects('authorize').returns(new Promise((resolve, reject) => {
            return resolve(true);
        }));
        done();
    });
    afterEach((done) => __awaiter(this, void 0, void 0, function* () {
        yield sandbox.restore();
        done();
    }));
    describe('Create', () => {
        it('should insert the record', () => __awaiter(this, void 0, void 0, function* () {
            return request
                .post(`${constants_1.API_PREFIX}/homes`)
                .send({ name: 'test' })
                .expect('Content-Type', /json/)
                .expect(dan_response_handler_1.StatusCodes.SUCCESS)
                .then((res) => {
                expect(res.body.data.name).toBe('test');
            });
        }));
    });
});
//# sourceMappingURL=HomeController.spec.js.map