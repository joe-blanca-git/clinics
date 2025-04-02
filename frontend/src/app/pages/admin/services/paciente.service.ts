import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class PacienteService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super();
  }

  getPacientes() {
    let user = localStorage.getItem('CLINICS.user');
    let parsedUser: any;
  
    if (user) {
      parsedUser = JSON.parse(user); 
    } else {
      console.log('Usuário não encontrado no localStorage.');
    }
  
    let url = this.UrlServiceV1 + 'getPacienteDoMedico.php?medico_id=' + parsedUser.id;
  
    return new Promise<any[]>((resolve, reject) => {
      this.httpClient.get<any>(url, this.ObterHeaderJson()).subscribe({
        next: (response) => {
          resolve(response.pacientes || []);
        },
        error: (error) => reject(error),
      });
    });
  }
  

  postPaciente(body: any) {
    let user = localStorage.getItem('CLINICS.user');
    let parsedUser:any;

    if (user) {
      parsedUser = JSON.parse(user); 
      body.medico_id = parsedUser.id;
    } else {
      console.log('Usuário não encontrado no localStorage.');
    }
    
    let r = this.httpClient
      .post(
        this.UrlServiceV1 + 'postPaciente.php',
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
}
