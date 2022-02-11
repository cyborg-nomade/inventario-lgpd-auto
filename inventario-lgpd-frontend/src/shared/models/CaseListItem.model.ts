export interface CaseItemObject {
  nome: string;
  id: number;
  criador: number;
  aprovado: boolean;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  finalidade: string;
  hipoteseTratamento: string;
  dadosPessoaisSensiveis: boolean;
}

export type headersCaseItemObject = keyof CaseItemObject;
