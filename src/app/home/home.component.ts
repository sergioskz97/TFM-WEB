import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invocation = new XMLHttpRequest();
  url = "http://localhost:7101/ull-alumno/RestService/get?titulacion=a&curso=a&dni=a&sexo=M";
  alumnData = [];
  headers: string[] = [];

  constructor(private http: HttpClient) {
    this.getData();
  }

  ngOnInit(): void {
  }

  getData(){
    this.http.get(this.url).subscribe(data => {
      let aux = JSON.parse(JSON.stringify(data));
      let auxHeaders = Object.keys(aux.Egresados[0]);

      for (let i in auxHeaders){
        this.headers.push(auxHeaders[i])
      }
      //console.log(this.headers);

      this.alumnData = aux.Egresados;

    });
  }
}
