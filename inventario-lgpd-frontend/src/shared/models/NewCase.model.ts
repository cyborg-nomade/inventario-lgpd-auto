interface AgenteTratamento {
  nome: string;
  area: string;
  telefone: string;
  email: string;
}

enum verbosTratamento {
  coleta,
  producao,
  recepcao,
  classificacao,
  utilizacao,
  acesso,
  reproducao,
  transmissao,
  distribuicao,
  processamento,
  arquivamento,
  armazenamento,
  eliminacao,
  avaliacao,
  controle,
  modificacao,
  comunicacao,
  transferencia,
  difusao,
  extracao,
}

export interface FullCaseObject {
  nome: string;
  id: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
  criador: number;
  controlador: AgenteTratamento;
  encarregado: AgenteTratamento;
  extensaoEncarregado: AgenteTratamento;
  areaTratamentoDados: AgenteTratamento;
  operador: AgenteTratamento;
  fasesCicloTratamento: {
    coleta: boolean;
    retencao: boolean;
    processamento: boolean;
    compartilhamento: boolean;
    eliminacao: boolean;
    verbos: verbosTratamento;
  };
  descricaoFluxoTratamento: string;
  abrangenciaGeografica: string;
  fonteDados: string;
  finalidadeTratamento: {
    hipoteseTratamento: string;
    descricaoFinalidade: string;
    previsaoLegal: string;
    resultadosTitular: string;
    beneficiosEsperados: string;
  };
}
