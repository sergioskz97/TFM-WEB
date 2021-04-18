import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  course: String = "a";
  title: String = "a";
  gender: String = "a";
  dni: String = "dni";
  data: any;

  url = "http://localhost:7101/ull-alumno/RestService/get?";
  alumnData = [];
  headers: string[] = [];

  constructor(private http: HttpClient, private excelService:ExcelService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    let auxUrl = this.url + "titulacion=" + this.title + "&curso=" + this.course + "&dni=" + this.dni + "&sexo=" + this.gender;
    this.alumnData = [];

    this.http.get(auxUrl).subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data));
      let aux = JSON.parse(JSON.stringify(data));
      let auxHeaders = Object.keys(aux.Egresados[0]);

      for (let i in auxHeaders) {
        this.headers.push(auxHeaders[i])
      }

      this.alumnData = aux.Egresados;
    });
  }

  setCourse(course: String) {
    this.course = course;
    this.getData();
  }

  setTitle(title: String) {
    this.title = title;
    this.getData();
  }

  setGender(gender: String) {
    this.gender = gender;
    this.getData();
  }

  setDNI(dni: String) {
    this.dni = dni;
    this.getData();
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }
}
