import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: APIService) {

  }

  ngOnInit(): void {

    // Print data 
    this.dataService.getTotalStudents().subscribe(res => {
      let aux = res.DBstudentsTotalOutput;
      let auxData = new Array();
      let barLabels = new Array;
      let barData = new Array;

      for (let i in aux) {
        barLabels.push(aux[i]["COD_TITULACION"]);
        auxData.push(aux[i]["COUNT___"]);
      }

      barData.push({ data: auxData, label: 'Titulaciones', backgroundColor: 'rgba(0, 137, 132, .2)', borderColor: 'rgba(200, 99, 132, .7)', borderWidth: 2 });

      // Bar Chart
      new Chart('barChart', {
        type: 'bar',
        data: {
          labels: barLabels,
          datasets: barData
        },
        options: {
          legend: { display: true },
          title: {
            display: false,
            text: 'Total de egresados por titulacion'
          },
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      // Pie Chart
      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: barLabels,
          datasets: barData
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }
        }
      });
    });
  }
}
