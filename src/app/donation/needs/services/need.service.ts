import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Need } from '../models/need.interface';
import { Config } from 'src/app/shared/services/config/config.interface';
import { ConfigService } from 'src/app/shared/services/config/config.service';
import { concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NeedService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService) { }

  // TODO. Nikolaienko Mikhail responsible for realization of search logic.
  // Due to lack of search logic on backend, it is temporary realized on front-side.
  // Nikolaienko Mikhail takes responsibility to negotiate with backers on matter of realization
  // of search logic on beckend until next presentation.
  public getNeeds(paramObj: object = {}): Observable<Need[]> {
    let params = new HttpParams();
    Object.keys(paramObj).forEach((key: string) => params = params.set(key, paramObj[key]));
    return this.configService.getConfig().pipe(
      concatMap((config: Config) => this.http.get<Need[]>(config.needsApi, { params }))
    );
  }

  public getDetails(id: string = ''): Observable<Need> {
    return this.configService.getConfig().pipe(
      concatMap((config: Config) => {
        return this.http.get<Need>(`${config.needsApi}/${id}`);
      })
    );
  }
}
