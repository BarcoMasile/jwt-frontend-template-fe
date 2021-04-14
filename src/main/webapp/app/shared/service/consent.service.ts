import {Injectable, OnDestroy} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NgcCookieConsentService} from 'ngx-cookieconsent';
import {Router} from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';
import {shareReplay} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {
  ALP_ERROR_PAGE,
  CONSENT_EXPIRATION_DAYS,
  COOKIE_CONSENT_ERROR_CODE,
  COOKIE_KEY, ERROR_CODE, PREV_URL
} from 'app/shared/constants/cookie-config.constants';

@Injectable({
  providedIn: 'root'
})
export class ConsentService implements OnDestroy {
  private statusChange$: Subscription;
  private _consent: Subject<boolean> = new Subject();
  private consent$: Observable<boolean> = this._consent.pipe(shareReplay());

  constructor(
    private cookieService: CookieService,
    private consentService: NgcCookieConsentService,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {
    this.statusChange$ = this.consentService.statusChange$
      .subscribe(change => change.status === 'deny' ? this.divertAndClearCookie() : this.setConsentCookie());
  }

  openPopupIfNoConsent(): void {
    if (this.hasConsented()) {
      return;
    }

    this.consentService.open();
  }

  openPopupIfConsentError(errorCode: string | null): void {
    if (errorCode && errorCode === COOKIE_CONSENT_ERROR_CODE) {
      this.consentService.open();
    }
  }

  private setConsentCookie(): void {
    this.cookieService.set(COOKIE_KEY, `${Date.now()}`, CONSENT_EXPIRATION_DAYS)
    this._consent.next(true);
    const prevUrl = this.sessionStorage.retrieve(PREV_URL);
    if (prevUrl) {
      this.sessionStorage.clear(PREV_URL);
      this.router.navigateByUrl(prevUrl);
    }
  }

  hasConsented(): boolean {
    return this.cookieService.check(COOKIE_KEY);
  }

  consent(): Observable<boolean> {
    return this.consent$;
  }

  private divertAndClearCookie(): void {
    if (!this.isConsentErrorUrl()) {
      this.sessionStorage.store(PREV_URL, this.router.url);
    }
    this.cookieService.delete(COOKIE_KEY);
    this._consent.next(false);
    this.router.navigate([ALP_ERROR_PAGE], { queryParamsHandling: 'merge', queryParams: { errorCode: COOKIE_CONSENT_ERROR_CODE}})
  }


  ngOnDestroy() {
    this.statusChange$.unsubscribe();
  }

  private isConsentErrorUrl() {
    return this.router.url.indexOf(`${ERROR_CODE}=${COOKIE_CONSENT_ERROR_CODE}`) !== -1;
  }
}
