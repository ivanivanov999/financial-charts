import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { BulletData, BulletLayout, BulletStep } from './interfaces/bulletexport.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public getData(): Observable<any> {;
    return this.db.object('bullet').valueChanges();
  }

  plotlyUpdate(x: any){};
  plotlyObservable = new Observable(observer => {
    observer.next([]);
    this.plotlyUpdate = function (newValue: any) {
      observer.next(newValue);
    }
  })

  constructor(private db: AngularFireDatabase) { }

  stepcolors: string[] = ["#8EBAE5", "#fdd48f", "#b8d698", "#e69679", "#BCB5D7", "#FFF59B", "#7DA4A7", "#89CCCF", "#CD8B87", "#A8859E"];

  public initializeBullet() {
    this.getData().subscribe(data => {
      var initialData: BulletData[] = [
        {
          type: "indicator",
          mode: "number+gauge+delta",
          value: 0,
          delta: { reference: 0, position: 'top', increasing: { color: "#11750e" }, decreasing: { color: "#cc071e" } },
          title: {
            text: "",
            font: { size: 15 }
          },
          gauge: {
            shape: "bullet",
            axis: { range: [0, 0] },
            threshold: {
              line: { color: "", width: 3 },
              value: 0
            },
            bgcolor: 'white',
            bar: { color: "#00549F" },
            steps: [],
          }
        }
      ];
  
      var initialLayout: BulletLayout = {
        margin: {
          t: 0,
          r: 0,
          b: 0,
          l: 0
        }
      };
  
      initialLayout.margin.t = data.margin?.[0];
      initialLayout.margin.r = data.margin?.[1];
      initialLayout.margin.b = data.margin?.[2];
      initialLayout.margin.l = data.margin?.[3];
  
  
      initialData[0].value = data.value;
      initialData[0].gauge.axis.range = data.range;
      initialData[0].gauge.threshold.value = data.thresholdvalue;
      initialData = this.steps(data.steps, initialData);
      //initialData[0].gauge.steps = [{color: 'red', range: [0,150]}, {color: 'green', range: [150,300]}]
      initialData[0].delta.reference = data.reference;
      initialData[0].title.text = "<b>" + data.title + "</b>";
      if (data.subtitle && (initialData[0].title.text != '')) {
        initialData[0].title.text += "</b><br><span style='color: gray; font-size:0.8em'>" + data.subtitle + "</span>";
      }
  
      this.plotlyUpdate(initialData);
    })
    
  }

  public steps(steps: number[], _data: BulletData[]) {
    if (steps == null) { return _data }
    var modifiedsteps = steps;
    if (steps?.[0] != _data[0].gauge.axis.range?.[0]) {
      modifiedsteps = [_data[0].gauge.axis.range[0]];
      for (let index = 0; index < steps.length; index++) {
        modifiedsteps.push(steps[index]);
      }
    }
    if (modifiedsteps?.[modifiedsteps.length - 1] != _data[0].gauge.axis.range?.[1]) {
      modifiedsteps.push(_data[0].gauge.axis.range[1]);
    }
    for (let index = 0; index < modifiedsteps.length - 1; index++) {
      const step = {} as BulletStep;
      _data[0].gauge.steps.push(step);
      _data[0].gauge.steps[index].range = [modifiedsteps[index], modifiedsteps[index + 1]];

    }

    var count = modifiedsteps?.length - 1;

    if (count == 1) {
      _data[0].gauge.steps[0].color = "white";
    }
    else if (count == 2) {
      _data[0].gauge.steps[0].color = "#e69679";
      _data[0].gauge.steps[1].color = "#b8d698";
    }
    else if (count == 3) {
      _data[0].gauge.steps[0].color = "#e69679";
      _data[0].gauge.steps[1].color = "#fdd48f";
      _data[0].gauge.steps[2].color = "#b8d698";
    }
    else if (count >= 4) {
      _data[0].gauge.steps[0].color = "#e69679";
      _data[0].gauge.steps[1].color = "#fdd48f";
      _data[0].gauge.steps[2].color = "#FFF59B";
      _data[0].gauge.steps[3].color = "#b8d698";
    }
    if (count >= 5) {
      _data[0].gauge.steps[4].color = "#8EBAE5";
    }
    /*
    if (count >= 6) {
      _data[0].gauge.steps[5].color = "#BCB5D7";
    }
    if (count >= 7) {
      _data[0].gauge.steps[6].color = "#A8859E";
    }
    if (count > 7) {
      for (let index = 7; index < count; index++) {
        _data[0].gauge.steps[index].color = this.stepcolors[index % 10];
      }
    }
    */

    return _data;
  }
}
