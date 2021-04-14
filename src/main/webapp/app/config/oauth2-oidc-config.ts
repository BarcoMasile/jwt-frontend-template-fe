import {AuthConfig, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {ENV} from 'app/environment/environment';
import {ADMIN, ISSUER, LOGIN_URL, LOGOUT_URL, OAUTH2_LOGIN_PATH, TOKEN_URL} from 'app/shared/constants/auth.constants';

export const authCodeFlowConfig: AuthConfig = {
  issuer: ISSUER,
  redirectUri: `${window.location.origin}/${OAUTH2_LOGIN_PATH}`,
  postLogoutRedirectUri: window.location.origin,
  clientId: ENV.clientId,
  responseType: 'code',
  scope: `openid profile ${ADMIN}`,
  showDebugInformation: true,
  timeoutFactor: 0.88,

  loginUrl: LOGIN_URL,
  logoutUrl: LOGOUT_URL,
  tokenEndpoint: TOKEN_URL,
  requireHttps: ENV.authServer.substr(0,8).includes("https")
};

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['*'],
    sendAccessToken: true
  }
}
