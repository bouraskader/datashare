import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  APP_INITIALIZER,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { DataGridModelComponent } from './components/data-grid-model/data-grid-model.component';
import { DataGridParameterComponent } from './components/data-grid-parameter/data-grid-parameter.component';
import { DateSelectedComponent } from './components/date-selected/date-selected.component';
import { LocationComponent } from './components/location/location.component';
import { HistoryComponent } from './components/history/history.component';
import { DatePipe } from '@angular/common';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { Initializer } from './utils/app-init';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DataGridModelComponent,
    DataGridParameterComponent,
    DateSelectedComponent,
    LocationComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: Initializer,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    KeycloakService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
