
export class UsuarioLogado{
    id!: number;
    nome!: string;
    tipo!: string;
    email!:string;
    //claims!: claims[];
}

export class claims {
    value!: string;
    type!: string;
    nome!: string;
}

export class menu{
    value!: string;
    nome!: string;
    id!:number;
    submenu!: submenu[];
}

export class submenu{
    value!: string;
    name!: string;
    route!: string;
}