import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable( {providedIn: 'root'})
export class OIDCAuthGuard implements CanActivate {

  constructor(public oauthService: OAuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.oauthService.hasValidIdToken()) {
      return true;
    }

    this.router.navigate(['']);
    return true;
  }
}
