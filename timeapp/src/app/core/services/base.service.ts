import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {

  protected _url: string;
  protected _headers: HttpHeaders;
  protected _http: HttpClient
  
  apiguid: string |null;
  usertoken: string | null;

  constructor(http: HttpClient) {
    this._url = environment.apiUrl;
    this._http = http;
   }

  protected buildUrl(url: string, id: string | null) {
    this.getHeaders();
    return this._url + url;  
  }

  private getHeaders() {
    this.apiguid = localStorage.getItem('apiguid');
    this.usertoken = localStorage.getItem('usertoken');

    this._headers = new HttpHeaders({ 
      'Content-Type' : 'application/json',
      'Authorization': 'SpicaToken ' + this.apiguid + ':' + JSON.parse(this.usertoken ||'{}')
    });
  }

  public getAll(url: string): Observable<any> {
    url = this.buildUrl(url, null);
    return this._http.get(url, { headers: this._headers }).pipe(
      catchError(this.handleError)
    );
  }

  public get(url: string, id: string): Observable<any> {
    url = this.buildUrl(url, id);
    return this._http.get(url, { headers: this._headers }).pipe(
      catchError(this.handleError)
    );
  }

  public getWithOptions(url: string, presenceDate: string): Observable<any> {
    url = this.buildUrl(url, null);
    const httpOptions = {
      headers: this._headers,
      params: {
        'TimeStamp': presenceDate,
        'OrgUnitID': '10000000',
        'showInactiveEmployees': 'false'
      }
    };

    return this._http.get(url, httpOptions);
  }

  public insert(url: string, data: any): Observable<any> {
    url = this.buildUrl(url, null);
    return this._http.put(url, data, { headers: this._headers }).pipe(
      catchError(this.handleError)
    );
  }

  

  protected handleError(error: any) {
    if(error instanceof Error) {
      return throwError({ errors: ['Invalid server response: ', error.message] });
    }

    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }

    const modelStateErrors = error.error;
    return throwError(modelStateErrors || { errors: ['Server error.'] });
  }

}
