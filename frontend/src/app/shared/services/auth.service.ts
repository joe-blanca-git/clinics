import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { LocalStorageUtils } from '../utils/localstorage';
import { BaseService } from './base.service';

export interface IUser {
  username: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private _user: IUser | null = null;

  localStorageUtils = new LocalStorageUtils();

  get loggedIn(): boolean {
    var usuarioLogado = this.localStorageUtils.obterUsuario();
    if (usuarioLogado) {
      var username = usuarioLogado.username;
      this._user = { username };
    } else {
      this._user = null;
    }    
    return !!this._user;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private localstorage: LocalStorageUtils
  ) {
    super();
  }

  register(body: any) {
    let response = this.http
      .post(
        this.UrlServiceLoginV1 + 'postMedico.php',
        body,
        this.ObterHeaderJson()
      )
      .pipe(map(this.extractData), catchError(this.serviceError));
    return response;
  }

  login(_email:String, _senha: String){
    let body = {
      email: _email,
      senha: _senha
    }

    let response = this.http.post(
      this.UrlServiceLoginV1 + 'postLogin.php',
      JSON.stringify(body),
      this.ObterHeaderJson()
    )
    .pipe(
      map((data) => {
        this.clearSession();
        return this.extractData(data);
      }),
      catchError(this.serviceError)
    );
  return response;
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
  }

  clearSession(){
    const twoHours = 4 * 60 * 60 * 1000;
    setTimeout(() => {
      this.localstorage.limparDadosLocaisUsuario();
    }, twoHours);
  }
  
}

const defaultPath = '/';
