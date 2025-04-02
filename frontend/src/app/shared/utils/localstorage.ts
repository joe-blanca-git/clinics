import { UsuarioLogado } from "../models/user-logged";

export class LocalStorageUtils {
    usuario: UsuarioLogado = new UsuarioLogado();
  
    public obterUsuario() {
      const userStr = localStorage.getItem('CLINICS.user');    
      if (userStr) {
        return JSON.parse(userStr);
      }
      return null;
    }
  
    public salvarDadosLocaisUsuario(response: any) {      
      //this.salvarTokenUsuario(response.access_token);
      this.salvarUsuario(response);
    }
  
    public salvarTokenUsuario(token: string) {
      localStorage.setItem('CLINICS.token', token);
    }
  
    public salvarUsuario(response: any) {
      this.usuario.id = response.user.id;
      this.usuario.email = response.user.email;
      this.usuario.nome = response.user.nome;
      this.usuario.tipo = response.user.tipo;
      //this.usuario.menu = response.user_token.menu;
      
      localStorage.setItem('CLINICS.user', JSON.stringify(this.usuario));
    }
  
    public obterTokenUsuario(): string {
      return localStorage.getItem('CLINICS.token') ?? '';
    }
    
    public limparDadosLocaisUsuario(){
      localStorage.removeItem('CLINICS.token');
      localStorage.removeItem('CLINICS.user');
    }
  
  }