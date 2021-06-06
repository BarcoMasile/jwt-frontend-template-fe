const authServer = 'https://accessosicuro-trial.rete.toscana.it';
const realm = 'arpa';

const scopes = 'openid profile email phone rtroles address';
const clientId = 'arpa-citizen-hub';
const postLoginRedirectURI = '';

const cookieDomain = `${authServer}`;
const cookiePolicyHref = 'https://www.regione.toscana.it/privacy';
const consentExpirationDays = 3;
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
