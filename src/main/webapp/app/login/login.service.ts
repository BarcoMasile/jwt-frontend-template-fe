import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {OAuthService} from 'angular-oauth2-oidc';
import {authCodeFlowConfig} from 'app/config/oauth2-oidc-config';
import {HttpClient} from '@angular/common/http';
import {AccountService} from 'app/core/auth/account.service';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, zip} from 'rxjs';
import {Account} from 'app/core/auth/account.model';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private location: Location,
              private http: HttpClient,
              private accountService: AccountService,
              private localStorage: LocalStorageService,
              private oauthService: OAuthService) {
    this.bootstrap();
  }

  bootstrap() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin(
        {
          onTokenReceived: receivedTokens => this.accountService.identity(true)
        }
      )
      .then(success => {}, error => console.log("loadDiscovery error"));
  }


  login(): void {
    new Promise<void>(resolve => {
      this.oauthService.initLoginFlow();
      resolve();
    }).then(() => this.accountService.identity(true).subscribe());
  }

  logout(): void {
    this.oauthService.logOut();
  }

  jsonObservable(key: string): Observable<any> {
    return this.localStorage.observe(key).pipe(map(el => JSON.parse(el)));
  }
}
