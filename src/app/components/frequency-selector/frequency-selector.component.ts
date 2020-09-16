import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-frequency-selector',
  templateUrl: './frequency-selector.component.html',
  styleUrls: ['./frequency-selector.component.scss']
})
export class FrequencySelectorComponent implements OnInit {

  frequencyOptions = [0.2, 0.5, 1, 2, 5, 10, 30];
  @Input() frequency: any = null;
  @Input() loading = false;
  @Output() frequencyUpdated: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  update() {
    this.frequencyUpdated.emit(this.frequency);
  }
}
