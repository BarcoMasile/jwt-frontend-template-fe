
const authServer = 'https://accessosicuro-trial.rete.toscana.it';

const realm = 'arpa';
const scopes = "profile arpa-citizen-hub/admin";
const clientId = "arpa-citizen-hub"
const cookieDomain = `${authServer}`;
const cookiePolicyHref = 'https://www.regione.toscana.it/privacy';
const consentExpirationDays = 120;
const alpErrorPage = `${authServer}/arpa/access`;
const arpaDataReaderUrl = `${authServer}/..../api/v1`;
const arpaContactServiceUrl = `${authServer}/..../api/v1`;

export const ENV = {
  realm,
  authServer,
  clientId,
  scopes,
  cookieDomain,
  cookiePolicyHref,
  consentExpirationDays,
  alpErrorPage,
  arpaDataReaderUrl,
  arpaContactServiceUrl
}
