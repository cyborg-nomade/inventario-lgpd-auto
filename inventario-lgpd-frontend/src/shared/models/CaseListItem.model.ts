export interface CaseItemObject {
  nome: string;
  id: number;
  criador: number;
  aprovado: boolean;
  area: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  finalidade: string;
  hipoteseTratamento: string;
  dadosPessoaisSensiveis: boolean;
}
