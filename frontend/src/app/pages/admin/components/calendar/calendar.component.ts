import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgendamentoModel } from '../../models/agendamento.model';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {

  listAgenda:AgendamentoModel [] = [];

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.getAgendamentos();
  }

  getAgendamentos(){
    this.calendarService.getAgendamento()
    .then((res:AgendamentoModel[]) => {
      this.listAgenda = res;
      console.log(this.listAgenda);
      
    }).catch((err) => {
      console.error(err);
    });
  }
  
  getAgendaForDate(date: Date) {
    const formattedDate = this.formatDate(date);
    const formattedList = this.listAgenda.filter((item: any) => item.date === formattedDate);       
    return formattedList
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMonthData(date: Date): number | null {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const filteredAgenda = this.listAgenda.filter((item) => {
      const [day, itemMonth, itemYear] = item.date.split('/').map(Number);
      return itemMonth === month && itemYear === year;
    });

    const totalServices = filteredAgenda.reduce((total, item) => {
      return total + item.services.length;
    }, 0);

    return totalServices > 0 ? totalServices : null;
  }

  getStatus(status: string): string{
    if (status === 'pendente') {
      return 'error';
    }
    return '';
  }

  navigateToDate(date: any): void {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      this.router.navigate(['agenda/dia'], {
        queryParams: { date: formattedDate },
      });
    }
  }

  


  
  
}
