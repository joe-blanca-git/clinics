import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './pages/register/register.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageUtils } from './shared/utils/localstorage';
import { NotificationService } from './shared/services/notification.service';


registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzDropDownModule,
    NzListModule,
    FormsModule,
    NzResultModule,
    NgxPaginationModule,
    NzDrawerModule,
    NzInputNumberModule,
    NzCalendarModule,
    NzBadgeModule,
    NzCheckboxModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    AuthService,
    LocalStorageUtils,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
