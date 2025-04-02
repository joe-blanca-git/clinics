import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { CidadeModel } from 'src/app/shared/models/cidades.model';
import { EspecialidadeModel } from 'src/app/shared/models/especialidade.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  validateForm: FormGroup<{
    nome: FormControl<string>;
    email: FormControl<string>;
    senha: FormControl<string>;
    checkPassword: FormControl<string>;
    crm: FormControl<string>;
    telefone: FormControl<string>;
    rua: FormControl<string>;
    bairro: FormControl<string>;
    numero: FormControl<number>;
    especialidade_id: FormControl<number>;
    estado: FormControl<string>;
    cep: FormControl<string>;
    cidade_id: FormControl<number>;
  }>;

  especialidades: EspecialidadeModel [] = [];

  cidades: CidadeModel [] = []

  estados = [
    { sigla: 'AC' },
    { sigla: 'AL' },
    { sigla: 'AP' },
    { sigla: 'AM' },
    { sigla: 'BA' },
    { sigla: 'CE' },
    { sigla: 'DF' },
    { sigla: 'ES' },
    { sigla: 'GO' },
    { sigla: 'MA' },
    { sigla: 'MT' },
    { sigla: 'MS' },
    { sigla: 'MG' },
    { sigla: 'PA' },
    { sigla: 'PB' },
    { sigla: 'PR' },
    { sigla: 'PE' },
    { sigla: 'PI' },
    { sigla: 'RJ' },
    { sigla: 'RN' },
    { sigla: 'RS' },
    { sigla: 'RO' },
    { sigla: 'RR' },
    { sigla: 'SC' },
    { sigla: 'SP' },
    { sigla: 'SE' },
    { sigla: 'TO' }
  ];

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private especialidadeService: EspecialidadesService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      crm: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: [0, [Validators.required]],
      especialidade_id: [0, [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade_id: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.obterEspecialidades();
    this.obterCidades();
  }

  obterEspecialidades(){
    this.especialidadeService.getEspecialidade()
    .then((res:any) => {
      this.especialidades = res;
    }).catch((err) => {
      console.error(err);
    })
  }

  obterCidades(){
    this.especialidadeService.getCidades()
    .then((res:any) => {
      this.cidades = res;
    }).catch((err) => {
      console.error(err);
    })
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.register(this.validateForm.value)
      .subscribe({
        next:(v) => this.sucesso(v),
        error:(e) => this.erro(e),
        complete:() => console.log('complete register')
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.senha.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  sucesso(success: any){
    this.notification.createBasicNotification('success', 'bg-success', 'text-light', success.message);
    this.router.navigate(['/login']);

  }

  erro(fail: any){
    this.notification.createBasicNotification('success', 'bg-success', 'text-light', fail.message)
  }


}
