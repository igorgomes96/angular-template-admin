export interface Usuario {
    id?: string;
    nome?: string;
    email: string;
    senha?: string;
    confirmacaoSenha?: string;
    codigoRecuperacao?: string;
    credenciais?: Credenciais;
}

export interface Credenciais {
    horarioExpiracao: Date;
}
