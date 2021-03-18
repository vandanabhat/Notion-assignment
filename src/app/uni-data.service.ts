import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UniDataService {
  constructor(private http: HttpClient) { }

  //get university data

  public getUniData(): Observable<any> {
    const url = environment.uniURL;
    return this.http.get(url, { responseType: 'text'})
    .pipe(
      tap( data => data)
    );
    }
}
