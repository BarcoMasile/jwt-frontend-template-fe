import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from 'app/core/auth/account.service';
import {Router} from '@angular/router';
import {interval} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {SubSink} from 'subsink';
import {POST_LOGIN_REDIRECT_URI} from 'app/shared/constants/auth.constants';

const INTERVAL_MS = 200;
const INTERVAL_TIMEOUT_CYCLES = 10;

@Component({
  selector: 'arpa-login',
  template: `
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-auto">
          <p-progressSpinner></p-progressSpinner>
        </div>
      </div>
    </div>
  `
})
export class Oauth2LoginComponent implements OnInit, OnDestroy {

  private sink = new SubSink();

  private tokenAvailable$ = interval(INTERVAL_MS).pipe(
    map(tick => this.oauth.hasValidAccessToken()),
    filter(el => el),
    take(INTERVAL_TIMEOUT_CYCLES),
    switchMap(tokenAvailable => this.accountService.identity())
  );

  constructor(private accountService: AccountService,
              private oauth: OAuthService,
              public router: Router) {
  }

  ngOnInit(): void {

    this.sink.sink = this.accountService.getAuthenticationState().subscribe(account => {
      this.router.navigateByUrl(POST_LOGIN_REDIRECT_URI)
    });

    this.sink.sink = this.tokenAvailable$.subscribe(() => {
      console.log('Autenticazione completata');
    })
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
