import {ENV} from 'app/environment/environment';

// @ts-ignore
const I_18_N_URL_PREFIX = ENV['i18nURLPrefix'] ? ENV['i18nURLPrefix'] + '/'  : '';
export const I_18_N_URL = `${I_18_N_URL_PREFIX}i18n/`;
