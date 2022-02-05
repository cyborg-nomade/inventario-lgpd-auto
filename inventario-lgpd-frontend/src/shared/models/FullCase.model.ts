interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
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

interface itemCategoriaDadosPessoais {
  descricao: string;
  tempoRetencao: string;
  fonteRetencao: string;
  caminhoRedeSistema: string;
}

interface itemCategoriaTitulares {
  nomeCategoria: string;
  tipoCategoria: string;
  descricao: string;
}

interface itemCompartilhamentoDados {
  nomeInstituicao: string;
  dadosCompartilhados: string;
  finalidadeCompartilhamento: string;
}

interface itemMedidasSegurancaPrivacidade {
  nome: string;
  tipo: string;
  descricaoControles: string;
}

interface itemTransferenciaInternacional {
  nomeOrganizacao: string;
  pais: string;
  dadosTransferidos: string;
  tipoGarantia: string;
}

interface itemContratoTI {
  nomeContrato: string;
  numeroProcessoContratacao: number;
  objetoContrato: string;
  emailGestorContrato: string;
}

interface itemRiscoPrivacidade {
  nomeRisco: string;
  descricaoRisco: string;
  observacoes: string;
}

interface itemObservacoesProcesso {
  nomeObs: string;
  descricaoObs: string;
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
  categoriaDadosPessoais: {
    identificacao: {
      idPessoal?: itemCategoriaDadosPessoais;
      idGov?: itemCategoriaDadosPessoais;
      idEletronica?: itemCategoriaDadosPessoais;
      locEletronica?: itemCategoriaDadosPessoais;
    };
    financeiros?: {
      idFin?: itemCategoriaDadosPessoais;
      recursosFin?: itemCategoriaDadosPessoais;
      dividasDespesas?: itemCategoriaDadosPessoais;
      solvencia?: itemCategoriaDadosPessoais;
      emprestimosHipotecaCredito?: itemCategoriaDadosPessoais;
      assistenciaFin?: itemCategoriaDadosPessoais;
      apoliceSeguro?: itemCategoriaDadosPessoais;
      planoPensao?: itemCategoriaDadosPessoais;
      transacaoFin?: itemCategoriaDadosPessoais;
      compensacao?: itemCategoriaDadosPessoais;
      atividadeProfissional?: itemCategoriaDadosPessoais;
      acordosAjustes?: itemCategoriaDadosPessoais;
      autorizacoesConsentimentos?: itemCategoriaDadosPessoais;
    };
    caracteristicas: {
      detalhesPessoais?: itemCategoriaDadosPessoais;
      detalhesMilitares?: itemCategoriaDadosPessoais;
      situacaoImigracao?: itemCategoriaDadosPessoais;
      descricaoFisica?: itemCategoriaDadosPessoais;
    };
    habitos: {
      habitos?: itemCategoriaDadosPessoais;
      estiloVida?: itemCategoriaDadosPessoais;
      viagensDeslocamento?: itemCategoriaDadosPessoais;
      contatosSociais?: itemCategoriaDadosPessoais;
      posses?: itemCategoriaDadosPessoais;
      denunciasIncidentesAcidentes?: itemCategoriaDadosPessoais;
      distincoes?: itemCategoriaDadosPessoais;
      usoMidia?: itemCategoriaDadosPessoais;
    };
    caracteristicasPsicologicas: {
      descricaoPsi?: itemCategoriaDadosPessoais;
    };
    composicaoFamiliar: {
      casamentoCoabitacao?: itemCategoriaDadosPessoais;
      historicoConjugal?: itemCategoriaDadosPessoais;
      membrosFamilia?: itemCategoriaDadosPessoais;
    };
    interessesLazer: {
      atividadesInteressesLaz?: itemCategoriaDadosPessoais;
    };
    associacoes: {
      outrasAssociacoesNaoSensiveis?: itemCategoriaDadosPessoais;
    };
    processoJudAdmCrim: {
      suspeitas?: itemCategoriaDadosPessoais;
      condenacoesSentencas?: itemCategoriaDadosPessoais;
      acoesJud?: itemCategoriaDadosPessoais;
      penalidadesAdm?: itemCategoriaDadosPessoais;
    };
    habitosConsumo: {
      dadosBensServicos?: itemCategoriaDadosPessoais;
    };
    residenciais: {
      dadosResidencia?: itemCategoriaDadosPessoais;
    };
    educacaoTreinamento: {
      academicosEscolares?: itemCategoriaDadosPessoais;
      registroFinanceiro?: itemCategoriaDadosPessoais;
      qualificacaoExperienciaProf?: itemCategoriaDadosPessoais;
    };
    profissaoEmprego: {
      empregoAtual?: itemCategoriaDadosPessoais;
      recrutamento?: itemCategoriaDadosPessoais;
      rescisao?: itemCategoriaDadosPessoais;
      carreira?: itemCategoriaDadosPessoais;
      absenteismoDisciplina?: itemCategoriaDadosPessoais;
      avaliacaoDesempenho?: itemCategoriaDadosPessoais;
    };
    regVideoImgVoz: {
      videoImagem?: itemCategoriaDadosPessoais;
      imagemVigilancia?: itemCategoriaDadosPessoais;
      voz?: itemCategoriaDadosPessoais;
    };
    outros: {
      outros?: itemCategoriaDadosPessoais;
    };
  };
  categoriaDadosPessoaisSensiveis: {
    origemRacialEtnica?: itemCategoriaDadosPessoais;
    conviccaoReligiosa?: itemCategoriaDadosPessoais;
    opiniaoPolitica?: itemCategoriaDadosPessoais;
    filiacaoSindicato?: itemCategoriaDadosPessoais;
    filiacaoOrganizacaoReligiosa?: itemCategoriaDadosPessoais;
    filiacaoCrencaFilosofica?: itemCategoriaDadosPessoais;
    filiacaoPreferenciaPolitica?: itemCategoriaDadosPessoais;
    saudeVidaSexual?: itemCategoriaDadosPessoais;
    geneticos?: itemCategoriaDadosPessoais;
    biometricos?: itemCategoriaDadosPessoais;
  };
  frequenciaTratamento: string;
  quantidadeDadosTratados: string;
  categoriasTitulares: {
    categorias: itemCategoriaTitulares[];
    criancasAdolescentes: itemCategoriaTitulares[];
    outrosGruposVulneraveis: itemCategoriaTitulares[];
  };
  compartilhamentoDadosPessoais: itemCompartilhamentoDados[];
  medidasSegurancaPrivacidade: itemMedidasSegurancaPrivacidade[];
  transferenciaInternacional: itemTransferenciaInternacional[];
  contratoServicosTITratamentoDados: itemContratoTI[];
  riscosPrivacidade: itemRiscoPrivacidade[];
  observacoesProcesso: itemObservacoesProcesso[];
}
