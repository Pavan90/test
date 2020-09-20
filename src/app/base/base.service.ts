import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


@Injectable()

export class BaseService {

  apiUrl = 'http://localhost:4000/api/questions';
  retunredData: any;

  constructor(private http: HttpClient){}

  getData(){
    return this.http.get(this.apiUrl);
  }
}
