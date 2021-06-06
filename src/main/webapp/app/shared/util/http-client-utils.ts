import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

export interface SafeResponse<T> {
  success?: T[],
  failure?: T[]
}

export class HttpClientUtils {

  static safeObsInfo<T>(obs: Observable<any>, info: T): Observable<SafeResponse<T>> {
    return obs.pipe(
      switchMap(res => of({success: [info]})),
      catchError(() => of({failure: [info]}))
    );
  }

  static safeObs<T>(obs: Observable<HttpResponse<T>>, defaultFailureValue: T): Observable<SafeResponse<T>> {
    return obs.pipe(
      switchMap(res => of({success: [res.body!]})),
      catchError(() => of({failure: [defaultFailureValue]}))
    );
  }

  static mergeRequestsAndMapResult<T>(forkObs: Observable<any>): Observable<any> {
    return forkObs.pipe(
      map((result: any[]) => result.reduce(this.reducer, <SafeResponse<T>>{ success: [], failure: []}))
    );
  }

  private static reducer<T>(accumulator: SafeResponse<T>, currentValue: SafeResponse<T>) {
    accumulator.success = accumulator.success!.concat(currentValue.success ?? []);
    accumulator.failure = accumulator.failure!.concat(currentValue.failure ?? []);
    return accumulator;
  }
}
