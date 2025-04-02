import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.route';
import { AdminAppComponent } from './admin.app.component';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FooterComponent } from '../components/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { LoginComponent } from '../login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationPatientComponent } from './components/registration/registration-patient/registration-patient.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    AdminAppComponent,
    SideMenuComponent,
    FooterComponent,
    CalendarComponent,
    CalendarDayComponent,
    LoginComponent,
    MyAccountComponent,
    RegistrationPatientComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    NzTableModule,
    
  ]
})
export class AdminModule { }
