const authServer = 'https://accessosicuro.rete.toscana.it';
const realm = 'arpa';

const scopes = 'openid profile email phone rtroles address';
const clientId = ''
const postLoginRedirectURI = '';

const cookieDomain = `${authServer}`;
const cookiePolicyHref = 'https://www.regione.toscana.it/privacy';
const consentExpirationDays = 120;
const alpErrorPage = `${authServer}/arpa/access`;

const sendTokenToURLs = [authServer]

export const ENV = {
  baseURL: '', // non deve iniziare con lo slash, deve terminare con lo slash
  realm,
  authServer,
  clientId,
  scopes,
  postLoginRedirectURI,
  sendTokenToURLs,
  cookieDomain,
  cookiePolicyHref,
  consentExpirationDays,
  alpErrorPage
}
