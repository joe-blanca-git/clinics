import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAppComponent } from './admin.app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegistrationPatientComponent } from './components/registration/registration-patient/registration-patient.component';

const AdminRouterConfig: Routes = [
    {
        path: '', component: AdminAppComponent,
        children: [
           {path: 'agenda', component: CalendarComponent},
           {path: 'agenda/dia', component: CalendarDayComponent},
           {path: 'my-account', component: MyAccountComponent},
           {path: 'registration/register-patient', component: RegistrationPatientComponent},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(AdminRouterConfig)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }