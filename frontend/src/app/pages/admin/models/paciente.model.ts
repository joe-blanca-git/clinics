export class PacientesModel {
    paciente_id!: number;
    nome_paciente!: string;
    email!: string;
    telefone!: string;
    data_nascimento!: Date;
    rua!: string;
    numero!: number;
    bairro!: string;
    cidade!: string;
    estado!: string;
    cep!: string;
    data_cadastro!: Date
}

export class PacienteModel {
    nome!: string;
    telefone!: string;
    data_nascimento!: string;
    cidade_id!: number;
    rua!: string;
    numero!: number;
    bairro!: string;
    cidade!: string;
    estado!: string;
    cep!: string
}

