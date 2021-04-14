
import { ENV } from 'app/environment/environment';

export const AUTH_SERVER = ENV.authServer;

const REALM = ENV.realm;

const commonPartialUrl = `${AUTH_SERVER}/auth/realms/${REALM}/protocol/openid-connect`;

export const ISSUER = `${AUTH_SERVER}/auth/realms/${REALM}`
export const LOGIN_URL = `${commonPartialUrl}/auth`;
export const TOKEN_URL = `${commonPartialUrl}/token`;
export const USERINFO_URL = `${commonPartialUrl}/userinfo`;
export const LOGOUT_URL = `${commonPartialUrl}/logout`;
export const INTROSPECT_URL = `${commonPartialUrl}/introspect`;
export const SCOPES = "profile arpa-citizen-hub/admin".split(" ");

export const CLIENT_ID = ENV.clientId;

export const ADMIN = `${ENV.clientId}/admin`;


export const OAUTH2_LOGIN_PATH = 'login';
