import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-relay-state',
  templateUrl: './relay-state.component.html',
  styleUrls: ['./relay-state.component.scss']
})
export class RelayStateComponent implements OnInit {

  @Input() label: string;
  @Input() loading = false;
  @Input() state: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
