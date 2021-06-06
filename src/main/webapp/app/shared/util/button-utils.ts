import {Observable} from 'rxjs';
import {shareReplay, throttleTime} from 'rxjs/operators';

export class ButtonUtils {

  static throttledObs<T>(period: number, obs: Observable<T>) {
    return obs.pipe(throttleTime(period), shareReplay());
  }
}
