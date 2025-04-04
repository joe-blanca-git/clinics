import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { PacienteService } from '../../services/paciente.service';
import { PacientesModel } from '../../models/paciente.model';
import { CalendarService } from '../../services/calendar.service';
import { AgendamentoModel } from '../../models/agendamento.model';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  dataAtual = '';
  qtdeAgendamentos = 0;
  horaIni = '07:00';
  horaFim = '18:00';
  horaIntervIni = '12:00';
  horaIntervFim = '13:00';
  tempoColsunta = '00:30';
  horarioSelecionado = '';
  pacienteSelecionado = '';
  medicoSelecionado = '';
  statusSelecionado = '';
  sintomaSelecionado = '';
  enderecoSelecionado = '';
  cidadeSelecionado = '';
  telefoneSelecionado = '';
  pacienteIdSelecionado = 0;

  isVisible = false;

  listAgenda: any[] = [];
  listAgendamentos: AgendamentoModel[] = [];
  listPacientes: PacientesModel[] = [];

  formAgendamento = this.fb.group({
    paciente_id: this.fb.control('', [Validators.required]),
    queixa: this.fb.control('', [Validators.required]),
  });

  //CONFIRMADO, CANCELADO, PENDENTE, CONCLUIDO

  constructor(
    private route: ActivatedRoute,
    private notification: NotificationService,
    private fb: NonNullableFormBuilder,
    private pacienteService: PacienteService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const data = params['date'];
      if (data) {
        this.dataAtual = data;
      }
    });

    this.obterPacientes();
    this.listAgenda = this.generateScheduleList();
    this.getAgendamentos();
  }

  getAgendamentos() {
    this.calendarService
      .getAgendamento()
      .then((res: AgendamentoModel[]) => {
        this.listAgendamentos = res;

        // this.listAgenda = this.listAgendamentos.flatMap((agendamento) =>
        //   agendamento.services.map((service) => ({
        //     horario: service.hour?.substring(0, 5),
        //     nome: service.name,
        //     medico: 'Dr. Fulano',
        //     status: service.status,
        //   }))
        // );

        // console.log(this.listAgenda);
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
        this.mergeSchedules(this.listAgenda, this.listAgendamentos);
      });
  }

  saveAgendamento() {
    if (this.pacienteIdSelecionado && this.formAgendamento.valid) {
      const _paciente_id = this.pacienteIdSelecionado;
      const _data_consulta = this.dataAtual;
      const _hora_consulta = this.horarioSelecionado;
      const _sintoma = this.formAgendamento.get('queixa')?.value;

      const agendamentoBody = {
        paciente_id: _paciente_id,
        data_consulta: _data_consulta,
        hora_consulta: _hora_consulta,
        queixa: _sintoma,
      };

      this.calendarService.postAgendamento(agendamentoBody).subscribe({
        next: (v) => this.sucesso(v),
        error: (e) => this.erro(e),
        complete: () => {
          this.clearData();
        },
      });

      console.log(agendamentoBody);
    } else {
      this.notification.createBasicNotification(
        'error',
        'bg-warning',
        'text-danger',
        'Preencha todas as informações para fazer o agendamento!'
      );
    }
  }

  showHorario(item: any) {
    this.horarioSelecionado = item.horario;
    this.pacienteSelecionado = item.nome;
    this.medicoSelecionado = item.medico;
    this.statusSelecionado = item.status;
    this.sintomaSelecionado = this.getSintoma();
    this.isVisible = true;
  }

  obterPacientes() {
    this.pacienteService
      .getPacientes()
      .then((res: any) => {
        this.listPacientes = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  findPaciente(id: any) {
    if (id) {
      const dataPaciente = this.listPacientes.filter(
        (i) => i.paciente_id === id
      );
      this.enderecoSelecionado =
        dataPaciente[0].rua + ' - ' + dataPaciente[0].numero;
      this.cidadeSelecionado = dataPaciente[0].cidade;
      this.telefoneSelecionado = dataPaciente[0].telefone;
      this.pacienteIdSelecionado = dataPaciente[0].paciente_id;
    } else {
    }
  }

  getSintoma() {
    return 'sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste sintoma teste ';
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

  sucesso(success: any) {
    this.notification.createBasicNotification(
      'success',
      'bg-success',
      'text-light',
      success.message
    );
  }

  erro(fail: any) {
    this.notification.createBasicNotification(
      'success',
      'bg-success',
      'text-light',
      fail.message
    );
  }

  clearData() {
    this.enderecoSelecionado = '';
    this.cidadeSelecionado = '';
    this.telefoneSelecionado = '';
    this.pacienteIdSelecionado = 0;
    this.formAgendamento.reset();
    this.handleOk();
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  generateScheduleList() {
    const horaIni = '07:00';
    const horaFim = '18:00';
    const horaIntervIni = '12:00';
    const horaIntervFim = '13:00';
    const tempoConsulta = 30;

    const scheduleList = [];
    let currentHour = moment(horaIni, 'HH:mm');
    const endHour = moment(horaFim, 'HH:mm');

    while (currentHour.isBefore(endHour)) {
      const horaFormatada = currentHour.format('HH:mm');
      let status = '';

      if (
        currentHour.isSameOrAfter(moment(horaIntervIni, 'HH:mm')) &&
        currentHour.isSameOrBefore(moment(horaIntervFim, 'HH:mm'))
      ) {
        status = 'FECHADO';
      }

      scheduleList.push({
        horario: horaFormatada,
        nome: '',
        medico: '',
        status: status,
      });

      currentHour.add(tempoConsulta, 'minutes');
    }

    return scheduleList;
  }

  mergeSchedules(listAgenda: any[], listAgendamentos: any[]) {
  
    const agendamentosFiltrados = listAgendamentos.filter((i) => 
      i.date.trim() === this.formatarData(this.dataAtual).trim()
    );
    
    listAgenda.forEach((agenda) => {
      const matchingAgendamento = agendamentosFiltrados.find((agendamento) => 
        agendamento.services.some((service: any) => service.hour.startsWith(agenda.horario))
      );
  
      if (matchingAgendamento) {
        const matchingService = matchingAgendamento.services.find((service: any) => 
          service.hour.startsWith(agenda.horario)
        );
  
        if (matchingService) {
          agenda.nome = matchingService.name || '';
          agenda.medico = 'Dr. Exemplo';
          agenda.status = matchingService.status || '';
        }
      }
    });
  
    return listAgenda;
  }
  
}
