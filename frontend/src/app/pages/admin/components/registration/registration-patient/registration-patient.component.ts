import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CidadeModel } from 'src/app/shared/models/cidades.model';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PacienteService } from '../../../services/paciente.service';
import { PacientesModel } from '../../../models/paciente.model';

@Component({
  selector: 'app-registration-patient',
  templateUrl: './registration-patient.component.html',
  styleUrls: ['./registration-patient.component.scss']
})
export class RegistrationPatientComponent {
  isVisible = false;
  totalPacientes = 0;
  listCidades: CidadeModel[] = [];
  listEstados = [
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
  ];;
  listPacientes: PacientesModel[]=[]
  listPacientesAux: any[]=[]

  formPaciente = this.fb.group({
      nome: this.fb.control('', [Validators.required]),
      telefone: this.fb.control('', [Validators.required]),
      data_nascimento: this.fb.control('', [Validators.required]),
      cidade_id: this.fb.control(null, [Validators.required]),
      rua: this.fb.control('', [Validators.required]),
      numero: this.fb.control(null, [Validators.required]),
      bairro: this.fb.control('', [Validators.required]),
      estado: this.fb.control(null, [Validators.required]),
      cep: this.fb.control('', [Validators.required]),
  })

  formPesquisa = this.fb.group({
    BuscaNome: this.fb.control('', [Validators.required])
  })

    
  constructor(
    private fb: NonNullableFormBuilder,
    private pacienteService: PacienteService,
    private cidadeService: EspecialidadesService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.obterCidades();
    this.obterPacientes();
  }

  obterCidades(){
    this.cidadeService.getCidades()
    .then((res:any) => {
      this.listCidades = res;
    }).catch((err) => {
      console.error(err);
    })
  }

  obterPacientes(){
    this.pacienteService.getPacientes()
    .then((res:any) => {
      this.listPacientes = res;
      this.totalPacientes = this.listPacientes.length;
      this.listPacientesAux = this.listPacientes;
    }).catch((err) => {
      console.error(err);
    });
  }

  onSubmit(): void {
    if (this.formPaciente.valid) {
      this.pacienteService.postPaciente(this.formPaciente.value)
      .subscribe({
        next:(v) => this.sucesso(v),
        error:(e) => this.erro(e),
        complete:() => {
          this.formPaciente.reset();
          this.obterPacientes();
        }
      })
    } else {
      Object.values(this.formPaciente.controls).forEach(control => {
        if (control.invalid) {          
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  editPaciente(item:any){

  }

  deletePaciente(item: any){

  }
  
  findPaciente() {
    this.listPacientesAux = [...this.listPacientes];
  
    const name = this.formPesquisa.get('BuscaNome')?.value;
    if (name) {
      this.listPacientesAux = this.listPacientes.filter((item) => 
        item.nome_paciente.toLowerCase().includes(name.toLowerCase())
      );
      this.totalPacientes = this.listPacientesAux.length;
    } else {
      if (!name) {
        this.listPacientesAux = [...this.listPacientes];
        this.totalPacientes = this.listPacientesAux.length;
      }
    }
  }
  

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  sucesso(success: any){
    this.notification.createBasicNotification('success', 'bg-success', 'text-light', success.message);
  }

  erro(fail: any){
    this.notification.createBasicNotification('success', 'bg-success', 'text-light', fail.message)
  }
}
