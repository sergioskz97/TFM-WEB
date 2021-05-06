import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  course: String = "2018/19";
  title: String = "a";
  gender: String = "a";
  dni: String = "";
  data: any;
  pageData: any[] = [];
  
  page = 1;
  pageSize = 10;
  collectionSize: number = 0;

  url = "http://localhost:7101/ull-alumno/getStudentsInfo?";
  alumnData: any[] = [];
  headers: string[] = [];

  constructor(private http: HttpClient, private excelService: ExcelService) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    var auxDNI = "-";
    this.pageData.length = 0;

    if (this.dni != "") {
      auxDNI = String(this.dni);
    }

    let auxUrl = this.url + "titulacion=" + this.title + "&curso=" + this.course + "&dni=" + auxDNI + "&sexo=" + this.gender;
    this.alumnData = [];

    this.http.get(auxUrl).subscribe(data => {
      let aux = JSON.parse(JSON.stringify(data));
      let auxHeaders = Object.keys(aux.DBstudentsInfoOutput[0]);
      this.data = aux.DBstudentsInfoOutput;

      for (let i in auxHeaders) {
        this.headers.push(auxHeaders[i])
      }

      for (let i in aux.DBstudentsInfoOutput) {
        let count = 0;

        if (this.gender == "a" || this.gender == aux.DBstudentsInfoOutput[i]['SEXO']){
          count ++;
        }
        
        if (this.course == "a" || this.course == aux.DBstudentsInfoOutput[i]['CURSOACAD_REF']){
          count ++;
        }

        if (this.title == "a" || this.title == aux.DBstudentsInfoOutput[i]['COD_TITULACION']){
          count ++;
        }

        if (this.dni == "" || this.dni == aux.DBstudentsInfoOutput[i]['NUMERO_DOCUMENTO']){
          count ++;
        }
          
        if (count == 4) {
          this.alumnData.push(aux.DBstudentsInfoOutput[i])
        }
      }

      this.pageData = this.alumnData.slice((this.page -1) * this.pageSize, (this.page -1) * this.pageSize + this.pageSize);

      console.log(this.alumnData);

      this.collectionSize = this.alumnData.length;
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

  refreshPage(){
    this.pageData = this.data.slice((this.page -1) * this.pageSize, (this.page -1) * this.pageSize + this.pageSize);
  }
}