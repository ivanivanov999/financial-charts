import { Component, OnInit } from '@angular/core';
import { BulletLayout } from '../interfaces/bulletexport.interface';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bullet-chart',
  templateUrl: './bullet-chart.component.html',
})

export class BulletChartComponent implements OnInit {

  exportData = {} as Observable<any>;


  exportLayout: BulletLayout = {
    margin: { r: 20, t: 10, b: 30, l: 100 }
  };

  constructor(private db: DataService) {
    this.db.initializeBullet();
    this.db.plotlyObservable.subscribe((input: any) => {
      this.exportData = input;
      console.log(this.exportData)
    })
  }

  ngOnInit(): void { }
}