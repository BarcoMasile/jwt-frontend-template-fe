import {Route, Routes} from '@angular/router';
import {FaqComponent} from 'app/faq/faq.component';

export const FAQ_ROUTES: Routes = [
  {
    path: 'faq',
    component: FaqComponent,
    data: {
      // pageTitle: 'home.title'
    },
    // canActivate: [OIDCAuthGuard]
  },
];
