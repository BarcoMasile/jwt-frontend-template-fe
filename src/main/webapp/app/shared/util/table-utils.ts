import {ENV} from 'app/environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {GestoreIdentita} from 'app/shared/domain/gestore-identita.model';
import {FornitorePubblico} from 'app/shared/domain/fornitore-pubblico.model';
import {FornitorePrivato} from 'app/shared/domain/fornitore-privato.model';

type Entity = GestoreIdentita | FornitorePubblico | FornitorePrivato

export class TableUtils {
  static tables = ENV.tables;

  static table(tableId: string, http: HttpClient): Observable<Entity[]> {
    if (!(tableId in this.tables)) {
      return of([]);
    }

    return this.download(http, this.tables[tableId]);
  }

  private static download(http: HttpClient, url: string): Observable<Entity[]> {
    return http.get<Entity[]>(url, { observe: 'body'}).pipe(
      switchMap(res => res ? of(res) : of([]))
    );
  }
}
