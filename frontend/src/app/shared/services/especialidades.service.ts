import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { EspecialidadeModel } from '../models/especialidade.model';
import { CidadeModel } from '../models/cidades.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService extends BaseService {

  constructor(
    public httpClient: HttpClient
  ) { 
    super()
  }

  getEspecialidade() {
    let url = this.UrlServiceV1 + 'getEspecialidades.php';

    return new Promise<EspecialidadeModel>((resolve, reject) => {
      this.httpClient
        .get<EspecialidadeModel>(url, this.ObterHeaderJson())
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  getCidades(){
    let url = this.UrlServiceV1 + 'getCidades.php';

    return new Promise<CidadeModel>((resolve, reject) => {
      this.httpClient
        .get<CidadeModel>(url, this.ObterHeaderJson())
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
}
