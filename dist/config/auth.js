"use strict";
// @TODO: will replaced by dynamic config manager
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = {
    active: process.env.AUTH_ACTIVE === 'true' ? true : false,
    authentication: {
        clientId: process.env.AUTHENTICATION_CLIENTID || 'api://default',
        issuer: process.env.AUTHENTICATION_ISSUER || 'https://dentsuaegis-test.okta-emea.com/oauth2/default',
    },
    authorization: {
        allRolesEndpoint: process.env.AUTHORIZATION_ALL_ROLES_ENDPOINT ||
            'http://enablers01-dev-kong-kong-proxy.enablers01-dev.svc.cluster.local:8001/rolemanager/api/roles',
        allowWhenNoRule: process.env.AUTHORIZATION_ALLOW_WHEN_NO_RULE === 'true' ? true : false,
        application: 'kitchen-sink',
        authorizationEndpoint: process.env.AUTHORIZATION_ENDPOINT ||
            'http://enablers01-dev-kong-kong-proxy.enablers01-dev.svc.cluster.local:8001/rolemanager/api/user-roles',
        getAuthorizations: process.env.AUTHORIZATION_GET_AUTHORIZATION === 'true' ? true : false,
        openDomain: process.env.AUTHORIZATION_OPEN_DOMAIN === 'true' ? true : false,
        rules: [
            {
                allow: 'true',
                methods: ['POST', 'GET', 'PUT', 'DELETE'],
                route: '/api/home',
            },
        ],
    },
};
//# sourceMappingURL=auth.js.map