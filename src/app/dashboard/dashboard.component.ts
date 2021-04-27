import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  single: any[] = [];

  constructor(private dataService: APIService) {

  }

  ngOnInit(): void {
    this.getTotalFromApi();
  }

  async getTotalFromApi() {
    await this.dataService.getTotalStudents().subscribe(data => {
      this.single = data.DBstudentsTotalOutput;
      console.log(this.single)
    });
  }

}
