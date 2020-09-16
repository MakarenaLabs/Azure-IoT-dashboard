import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() icon: string;
  @Input() label: string;
  @Input() value: number;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  data: any = [
    {
      data: [null, null, null, null, null, null, null, null, null],
      label: 'Temperature',
      backgroundColor: 'white',
      hoverBackgroundColor: 'rgba(255,255,255,0.7)'
    }
  ];
  chartColors: any = [{
    backgroundColor: 'transparent',
    borderColor: 'white',
  }];
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }], yAxes: [{
        gridLines: {
          offsetGridLines: true,
          drawBorder: false,
          display: true
        },
        ticks: {
          display: true,
          fontColor: 'white'
        }
      }]
    }
  };
  chartLabels: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.label && changes.label.currentValue) {
      this.data[0].label = this.label;
    }

    if (changes.value && changes.value.currentValue) {
      this.assignNewValue();
    }
  }

  private assignNewValue() {
    const nullIndex = this.data[0].data.findIndex(el => el === null);
    if (nullIndex > -1) {
      this.data[0].data[nullIndex] = this.value;
    } else {
      this.data[0].data.shift();
      this.data[0].data.push(this.value);
    }
    this.chart.update();
  }
}
