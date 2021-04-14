import {ENV} from 'app/environment/environment';

export const COOKIE_DOMAIN = ENV.cookieDomain;
export const COOKIE_POLICY_HREF = ENV.cookiePolicyHref;
export const COOKIE_KEY = 'rt-consent';
export const CONSENT_EXPIRATION_DAYS = ENV.consentExpirationDays;
export const PREV_URL = 'urlFromCookiesDecline';
export const COOKIE_CONSENT_ERROR_CODE = 'consent';
export const ERROR_CODE = 'errorCode';
export const ALP_ERROR_PAGE = ENV.alpErrorPage;
