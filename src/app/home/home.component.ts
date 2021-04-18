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
  dni: String = "";
  data: any;

  url = "http://localhost:7101/ull-alumno/RestService/get?";
  alumnData: any[] = [];
  headers: string[] = [];

  constructor(private http: HttpClient, private excelService: ExcelService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    var auxDNI = "-";

    if (this.dni != "") {
      auxDNI = String(this.dni);
    }

    let auxUrl = this.url + "titulacion=" + this.title + "&curso=" + this.course + "&dni=" + auxDNI + "&sexo=" + this.gender;
    this.alumnData = [];

    this.http.get(auxUrl).subscribe(data => {
      let aux = JSON.parse(JSON.stringify(data));
      let auxHeaders = Object.keys(aux.Egresados[0]);
      this.data = aux.Egresados;

      for (let i in auxHeaders) {
        this.headers.push(auxHeaders[i])
      }

      //this.alumnData = aux.Egresados;

      for (let i in aux.Egresados) {
        let count = 0;

        if (this.gender == "a" || this.gender == aux.Egresados[i]['sexo'])
          count ++;
        
        if (this.course == "a" || this.course == aux.Egresados[i]['cursoacadRef'])
          count ++;

        if (this.title == "a" || this.title == aux.Egresados[i]['codTitulacion'])
          count ++;

        if (this.dni == "" || this.dni == aux.Egresados[i]['numeroDocumento'])
          count ++;

        if (count == 4) {
          this.alumnData.push(aux.Egresados[i])
        }
      }

      console.log(this.alumnData)
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
    let file = new Date().valueOf();
    this.excelService.exportAsExcelFile(this.alumnData, String(file));
  }
}
