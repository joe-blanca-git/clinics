export class AgendamentoModel {
  date!: string;
  services!: services[];
}

export class services {
  paciente_id!: number;
  name!: string;
  hour!: string;
  status!: string;
  queixa!: string;
  exames_solicitados!: string;
  remedios_prescritos!: string;
  email!: string;
  telefone!: string;
  data_nascimento!: string;
  endereco!: endereco;
}

export class endereco {
  rua!: string;
  numero!: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
}
