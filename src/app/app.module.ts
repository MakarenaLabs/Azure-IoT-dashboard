import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { RelayStateComponent } from './components/relay-state/relay-state.component';
import {ChartsModule} from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';
import { FrequencySelectorComponent } from './components/frequency-selector/frequency-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {environment} from '../environments/environment';

const config: SocketIoConfig = { url: environment.server, options: {} };

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'dashboard',
  component: DashboardComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RelayStateComponent,
    BarChartComponent,
    ConnectionStatusComponent,
    FrequencySelectorComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
