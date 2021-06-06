import {Injectable, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from 'ngx-webstorage';
import {EMPTY, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, filter, shareReplay, tap} from 'rxjs/operators';

import {StateStorageService} from 'app/core/auth/state-storage.service';
import {Account} from 'app/core/auth/account.model';
import {OAuthInfoEvent, OAuthService} from 'angular-oauth2-oidc';
import {ADMIN, USERINFO_URL} from 'app/shared/constants/auth.constants';
import {JwtUtils} from 'app/shared/util/jwt-utils';
import {SubSink} from 'subsink';
import {UserInfo} from 'angular-oauth2-oidc/types';

@Injectable({ providedIn: 'root' })
export class AccountService implements OnDestroy{
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;
  private sink = new SubSink();

  constructor(
    private translateService: TranslateService,
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
    private oauthService: OAuthService
  ) {
    this.sink.sink = this.oauthService.events.pipe(
      filter(event => event.type.includes('sess'))
    ).subscribe((event: any) => {
      if (event instanceof OAuthInfoEvent) {
        console.log("info-event: ", event.type, event.info);
      } else {
        console.log("event: ", event.type, event['info']);
      }
    });

    this.sink.sink = this.authenticationState
      .pipe(filter(account => account === null))
      .subscribe(account => {
        console.debug("authenticationState === null, logging out...");
        this.oauthService.logOut()
      });
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  isAdmin(): boolean {
    return this.hasAnyAuthority(ADMIN);
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {

      this.accountCache$ = this.fetch().pipe(
        catchError(() => of(null)),
        tap((account: Account | null) => {
          this.authenticate(account);

          if (account?.langKey) {
            const langKey = this.sessionStorage.retrieve('locale') ?? account.langKey;
            this.translateService.use(langKey);
          }

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  loadUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(USERINFO_URL)
      .pipe(catchError(() => EMPTY));
  }

  private fetch(): Observable<Account> {
    const claims = this.oauthService.getIdentityClaims();
    if (!this.oauthService.hasValidAccessToken() || claims == null) {
      return EMPTY;
    }

    return of(Account.fromClaims(JwtUtils.decodeJwt(this.oauthService.getAccessToken())).enhanceUserInfo(this.loadUserInfo()));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}
