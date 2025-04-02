import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";
import { environment } from "../../../environment/environment.prod";
import { LocalStorageUtils} from '../utils/localstorage';

export  class BaseService{
  constructor(
   ) { }
    public LocalStorage = new LocalStorageUtils();
    protected UrlServiceV1: string = environment.apiUrlv1;

    //auth
    protected UrlServiceLoginV1: string = environment.apiUrlLoginv1;

    //Toda vez que chamar esse método, já irá retornar o header
    protected ObterHeaderJson(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    public ObterAuthHeaderJson(){
        return{
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.LocalStorage.obterTokenUsuario()
            })
        }

    }

    protected extractData(response: any){
          return response || {};
    }

    protected serviceError(response: Response | any) {
        let CustomError: string[] = [];
    
        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                return throwError(() => 'Falha na comunicação - tente novamente mais tarde');
            } else if (response.status === 400) {
                CustomError.push("Erros de validação");
            } else if (response.status === 401) {
                this.LocalStorage.limparDadosLocaisUsuario();
                return throwError(() => '401 - Sem autorização');
            } else if (response.status === 403) {
                return throwError(() => '403 - Sem autorização');
            } else if (response.status === 409) { 
                return throwError(() => '409 - Usuário já existe');
            } else if (response.status === 500) {
                return throwError(() => 'Erro interno do servidor, tente novamente mais tarde.');
            }
        }
    
        return throwError(() => response);
    }
    

}
