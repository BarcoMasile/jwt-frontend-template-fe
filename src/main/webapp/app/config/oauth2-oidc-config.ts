import {AuthConfig, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {ENV} from 'app/environment/environment';
import {
  CLIENT_ID,
  ISSUER,
  LOGIN_URL,
  LOGOUT_URL,
  POST_LOGOUT_REDIRECT_URI,
  REDIRECT_URI,
  SCOPES,
  TOKEN_URL
} from 'app/shared/constants/auth.constants';

export const authCodeFlowConfig: AuthConfig = {
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
  clientId: CLIENT_ID,
  responseType: 'code',
  scope: SCOPES,
  showDebugInformation: false,
  timeoutFactor: 0.88,

  loginUrl: LOGIN_URL,
  logoutUrl: LOGOUT_URL,
  tokenEndpoint: TOKEN_URL,
  requireHttps: ENV.authServer.substr(0,8).includes("https")
};

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ENV.sendTokenToURLs,
    sendAccessToken: true
  }
}
