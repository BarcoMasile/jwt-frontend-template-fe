import { OAuthStorage } from 'angular-oauth2-oidc';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';

@Injectable()
export class AppOauthStorage extends OAuthStorage {
  localStorage: LocalStorageService;

  constructor(_localStorage: LocalStorageService) {
    super();
    this.localStorage = _localStorage;
  }

  getItem(key: string): string | null {
    return this.localStorage.retrieve(key);
  }

  removeItem(key: string): void {
    this.localStorage.clear(key);
  }

  setItem(key: string, data: string): void {
    this.localStorage.store(key, data);
  }
}
