import {ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {LoginService} from 'app/login/login.service';
import {AccountService} from 'app/core/auth/account.service';
import {Account} from 'app/core/auth/account.model';
import {ConsentService} from 'app/shared/service/consent.service';
import {SubSink} from 'subsink';
import {DeviceDetectorService} from 'ngx-device-detector';
import {OAuthService} from 'angular-oauth2-oidc';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

const TEMPTED_LOGIN = "tempted-login";

@Component({
  selector: 'arpa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  isDesktop: boolean;

  private sink = new SubSink();
  private cookieConsent = false;

  constructor(private accountService: AccountService,
              private loginService: LoginService,
              private deviceService: DeviceDetectorService,
              private session: SessionStorageService,
              private consentService: ConsentService) {

    this.isDesktop = this.deviceService.isDesktop();
    this.popUpOps();
  }

  ngOnInit(): void {
    this.sink.sink = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
    // this.loginService.setInfo();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }


  private popUpOps() {
    this.sink.sink = this.consentService.consent().subscribe(hasConsented => this.cookieConsent = hasConsented);
    this.cookieConsent = this.consentService.hasConsented();
    this.consentService.openPopupIfNoConsent();
  }

  login(): void {
    this.loginService.login();
  }

  ngOnDestroy(): void {
    this.sink.unsubscribe();
  }
}
