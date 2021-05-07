import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  urlTotalStudents = "http://localhost:7101/ull-alumno/getStudentsTotal";
  urlStudentsGender = "http://localhost:7101/ull-alumno/getStudentsGender";

  constructor(private http: HttpClient) { }

  getTotalStudents(): Observable<any> {
    return this.http.get<any>(this.urlTotalStudents);
  }

  getStudentsGender(): Observable<any> {
    return this.http.get<any>(this.urlStudentsGender);
  }
}
