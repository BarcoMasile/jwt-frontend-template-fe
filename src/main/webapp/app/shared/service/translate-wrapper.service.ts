import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateWrapperService {

  constructor(public tran: TranslateService) {}

  getOrDefaultValueForKey(key: string, defaultKey: string, params?: any) {
    return this.tran.get(key, params).pipe(
      switchMap((transVal: any) => {
        if (typeof transVal === 'string' && transVal.startsWith('translation-not-found')) {
          return this.tran.get(defaultKey, params)
        }
        return of(transVal);
      }));
  }

  getOrDefaultValue(key: string, defaultValue: any, params?: any) {
    return this.tran.get(key, params).pipe(
      switchMap((transVal: any) => {
        if (typeof transVal === 'string' && transVal.startsWith('translation-not-found')) {
          return of(defaultValue);
        }
        return of(transVal);
      }));
  }

  retrieve(key: string): string {
    return this.tran.instant(key);
  }
}
