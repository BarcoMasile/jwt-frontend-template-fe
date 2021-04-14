import {NgcCookieConsentConfig} from 'ngx-cookieconsent';
import {COOKIE_DOMAIN, COOKIE_POLICY_HREF} from 'app/shared/constants/cookie-config.constants';

export const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: COOKIE_DOMAIN
  },
  autoOpen: false,
  position: 'bottom',
  theme: 'classic',
  palette: {
    popup: {
      background: '#e6e6e6',
      text: '#070707',
      link: '#eb2224'
    },
    button: {
      background: '#eb2224',
      text: '#fff9f9',
      border: 'transparent'
    }
  },
  layout: 'rt-layout',
  layouts: {
    'rt-layout': `
    <div class="container-fluid" style="font-family: Helvetica,Calibri,Arial,sans-serif; line-height: 1;">
      <div class="row justify-content-around align-items-center">
          <div class="col-xs-12">{{mainLayout}}</div>
          <div class="col-xs-12">{{compliance}}</div>
      </div>
    </div>
    `
  },
  elements: {
    mainLayout: `
      <p></p>
      <p style="font-size: 1.8rem">{{message}}</p>
      <p style="font-size: 1.8rem">È necessario consentire l'uso dei cookie</p>
    `
  },
  type: 'opt-in',
  content: {
    message: 'Questo sito utilizza i cookie per garantire un corretto funzionamento',
    dismiss: 'Accetta',
    allow: 'Consenti i cookie',
    deny: 'Rifiuta',
    link: 'Maggiori info',
    href: COOKIE_POLICY_HREF,
    policy: 'Cookie Policy'
  }
};

