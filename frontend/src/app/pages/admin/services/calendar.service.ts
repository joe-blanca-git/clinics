import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super();
  }

  postAgendamento(body: any) {
    let user = localStorage.getItem('CLINICS.user');
    let parsedUser: any;

    if (user) {
      parsedUser = JSON.parse(user);
      body.medico_id = parsedUser.id;
    } else {
      console.log('Usuário não encontrado no localStorage.');
    }

    let r = this.httpClient
      .post(
        this.UrlServiceV1 + 'postAgendamento.php',
        body,
        this.ObterHeaderJson()
      )
      .pipe(
        map((data) => {
          return this.extractData(data);
        }),
        catchError(this.serviceError)
      );
    return r;
  }

  getAgendamento() {
    let user = localStorage.getItem('CLINICS.user');
    let parsedUser: any;

    if (user) {
      parsedUser = JSON.parse(user);
    } else {
      console.log('Usuário não encontrado no localStorage.');
    }

    let url =
      this.UrlServiceV1 +
      'getAgendamentosMedico.php?medico_id=' +
      parsedUser.id;

    return new Promise<any[]>((resolve, reject) => {
      this.httpClient.get<any>(url, this.ObterHeaderJson()).subscribe({
        next: (response) => {
          resolve(response || []);
        },
        error: (error) => reject(error),
      });
    });
  }
}
