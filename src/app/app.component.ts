import {Component, OnDestroy, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Subscription} from 'rxjs';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  connected;
  deviceId = '';
  private sub = new Subscription();

  constructor(private socket: Socket) {
  }

  ngOnInit() {
    this.deviceId = environment.deviceName;

    this.sub.add(this.socket
      .fromEvent('update').subscribe(msg => {
        if (msg[0] && msg[0].body) {
          this.connected = true;
        }
      })
    );

    this.sub.add(this.socket
      .fromEvent('error').subscribe(msg => {
        this.connected = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
