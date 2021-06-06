import {Injectable} from '@angular/core';
import {TranslateWrapperService} from 'app/shared/service/translate-wrapper.service';
import {Observable} from 'rxjs';
import {MenuItem} from 'primeng/api';

const PREFIX = 'menu.generator';

@Injectable({
  providedIn: 'root'
})
export class MenuGeneratorService {

  constructor(public tran: TranslateWrapperService) {}

  menu(...keys: string[]): Observable<MenuItem[]> {
    const k = this.key(...keys)
    return this.tran.getOrDefaultValue(k, []);
  }

  private key(...k: string[]) {
    return !!k ? `${PREFIX}.${k.join('.')}` : PREFIX;
  }
}
