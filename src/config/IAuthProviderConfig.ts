export interface IAuthProviderConfig {
  active: boolean;
  authentication: IAuthenticationConfig;
  authorization: IAuthorizationConfig;
}

interface IAuthenticationConfig {
  issuer: string;
  clientId: string;
}

interface IAuthorizationConfig {
  getAuthorizations: boolean;
  authorizationEndpoint: string;
  allRolesEndpoint: string;
  prefetchUserRoles?: string[];
  application: string;
  openDomain?: boolean;
  allowWhenNoRule?: boolean;
  rules?: IRule[];
}

interface IRule {
  route: string;
  methods?: string[];
  allow: string;
}
