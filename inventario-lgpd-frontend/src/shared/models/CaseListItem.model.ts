export interface CaseItemObject {
  nome: string;
  id: number;
  area: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  finalidade: string;
  hipoteseTratamento: string;
  dadosPessoaisSensiveis: boolean;
  criador: number;
}
