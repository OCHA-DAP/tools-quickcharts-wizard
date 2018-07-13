import {of as observableOf,  Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// declare const JSON: any;

export interface HxlCheckResponse {
  status: boolean;
}

@Injectable()
export class HxlCheckService {

  private hxlCheck: string;

  constructor(private httpClient: HttpClient) { }

  public init(hxlCheck) {
    this.hxlCheck = hxlCheck;
  }

  public check(dataUrl): Observable<HxlCheckResponse> {
    const encodedDataUrl = encodeURIComponent(dataUrl);
    const fullUrl = `${this.hxlCheck}?url=${encodedDataUrl}`;
    console.log('Full url is: ' + fullUrl);

    const obs = this.httpClient.get(fullUrl).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return observableOf({
          'status': false
        });
      }));

    return obs;
  }

}
