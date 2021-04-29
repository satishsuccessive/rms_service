"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const configuration_1 = require("./config/configuration");
const constants_1 = require("./libs/constants");
const Server_1 = require("./Server");
describe('Health Check', () => {
    // @ts-ignore
    const server = new Server_1.default(configuration_1.default);
    const app = server.bootstrap();
    const request = supertest(app);
    beforeAll(() => {
        jest.setTimeout(20000);
    });
    it('should return 404', (done) => {
        request.get(`${constants_1.API_PREFIX}/fake-url`)
            .expect(404, done);
    });
    it('should return 200', (done) => {
        request.get(`${constants_1.API_PREFIX}/health-check`)
            .expect(200, done);
    });
});
//# sourceMappingURL=router.spec.js.map