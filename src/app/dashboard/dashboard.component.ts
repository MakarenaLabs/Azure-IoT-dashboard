import {Component, OnDestroy, OnInit} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Data} from './Data';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  relay1 = {value: false, loading: false, oldValue: false};
  relay2 = {value: false, loading: false, oldValue: false};
  relay3 = {value: false, loading: false, oldValue: false};
  relay4 = {value: false, loading: false, oldValue: false};
  updateFrequency = {value: null, loading: false};
  data: Data = {} as Data;

  constructor(private socket: Socket) {
  }

  ngOnInit() {
    this.sub.add(this.socket
      .fromEvent('update').subscribe(msg => {
        if (msg[0] && msg[0].body) {
          let data = msg[0].body;
          if (data.accel1 && data.accel1.length) {
            data.accel1 = data.accel1.map(el => el.toFixed(2));
          }
          if (data.magneto && data.magneto.length) {
            data.magneto = data.magneto.map(el => el.toFixed(2));
          }
          this.data = data;
          this.setConfigurationState();
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateMessageFrequency($event: any) {
    this.updateFrequency = {value: $event, loading: true};
    this.socket.emit('changeOptions', {
      frequency: $event,
      relay1: this.relay1.value,
      relay2: this.relay2.value,
      relay3: this.relay3.value,
      relay4: this.relay4.value
    });
  }

  changeRelayState(relayObject) {
    relayObject.loading = true;
    relayObject.oldValue = !relayObject.value;

    this.socket.emit('changeOptions', {
      frequency: this.updateFrequency.value,
      relay1: this.relay1.value,
      relay2: this.relay2.value,
      relay3: this.relay3.value,
      relay4: this.relay4.value
    });
  }

  private setConfigurationState() {
    if (this.relay1.loading) {
      if (this.data.relay1 !== this.relay1.oldValue && this.data.updated) {
        this.relay1.loading = false;
      }
    } else {
      this.relay1 = {value: this.data.relay1, loading: false, oldValue: this.data.relay1};
    }

    if (this.relay2.loading) {
      if (this.data.relay2 !== this.relay2.oldValue && this.data.updated) {
        this.relay2.loading = false;
      }
    } else {
      this.relay2 = {value: this.data.relay2, loading: false, oldValue: this.data.relay2};
    }
    if (this.relay3.loading) {
      if (this.data.relay3 !== this.relay3.oldValue && this.data.updated) {
        this.relay3.loading = false;
      }
    } else {
      this.relay3 = {value: this.data.relay3, loading: false, oldValue: this.data.relay3};
    }
    if (this.relay4.loading) {
      if (this.data.relay4 !== this.relay4.oldValue && this.data.updated) {
        this.relay4.loading = false;
      }
    } else {
      this.relay4 = {value: this.data.relay4, loading: false, oldValue: this.data.relay4};
    }

    this.updateFrequency = {value: this.data.frequency || null, loading: false};
  }
}
