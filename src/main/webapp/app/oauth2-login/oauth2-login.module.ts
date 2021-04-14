import {NgModule} from '@angular/core';
import {Oauth2LoginComponent} from 'app/oauth2-login/oauth2-login.component';
import {RouterModule, Routes} from '@angular/router';
import {OAUTH2_LOGIN_PATH} from 'app/shared/constants/auth.constants';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const ROUTES: Routes = [{
  path: OAUTH2_LOGIN_PATH,
  component: Oauth2LoginComponent
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), ProgressSpinnerModule],
  declarations: [Oauth2LoginComponent]
})
export class Oauth2LoginModule { }
