import {interval, Observable, Subscription} from 'rxjs';
import {last, map, take, takeUntil} from 'rxjs/operators';

export class TimerUtils {

  static makeTimer(periodms: number, times: number, tickFun: ((tick: number) => void), completionFun: (() => void) = () => {}): Subscription {
    return interval(periodms).pipe(
      take(times),
      map(tickFun),
      last()
    ).subscribe(completionFun);
  }

  static makeStoppableTimer(periodms: number, times: number, interruptObservable: Observable<any> ,tickFun: ((tick: number) => void), completionFun?: (() => void)): Subscription {
    return interval(periodms).pipe(
      take(times),
      takeUntil(interruptObservable),
      map(tickFun),
      last()
    ).subscribe(completionFun);
  }


}
