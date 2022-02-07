interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
}

export enum verbosTratamento {
  coleta = "coleta",
  producao = "producao",
  recepcao = "recepcao",
  classificacao = "classificacao",
  utilizacao = "utilizacao",
  acesso = "acesso",
  reproducao = "reproducao",
  transmissao = "transmissao",
  distribuicao = "distribuicao",
  processamento = "processamento",
  arquivamento = "arquivamento",
  armazenamento = "armazenamento",
  eliminacao = "eliminacao",
  avaliacao = "avaliacao",
  controle = "controle",
  modificacao = "modificacao",
  comunicacao = "comunicacao",
  transferencia = "transferencia",
  difusao = "difusao",
  extracao = "extracao",
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
  aprovado: boolean;
  criador: number;
  dataCriacao: string;
  dataAtualizacao: string;
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
    verbos: verbosTratamento[];
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
      outros?: itemCategoriaDadosPessoais[];
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

const emptyAgenteTratamento = (): AgenteTratamento => ({
  nome: "",
  area: "",
  telefone: "",
  email: "",
});

const emptyItemCategoriaDadosPessoais = (): itemCategoriaDadosPessoais => ({
  descricao: "",
  tempoRetencao: "",
  fonteRetencao: "",
  caminhoRedeSistema: "",
});

export const emptyFullCaseObject = (): FullCaseObject => ({
  nome: "",
  id: 0,
  aprovado: false,
  criador: 0,
  dataCriacao: new Date().toDateString(),
  dataAtualizacao: new Date().toDateString(),
  controlador: emptyAgenteTratamento(),
  encarregado: emptyAgenteTratamento(),
  extensaoEncarregado: emptyAgenteTratamento(),
  areaTratamentoDados: emptyAgenteTratamento(),
  operador: emptyAgenteTratamento(),
  fasesCicloTratamento: {
    coleta: false,
    retencao: false,
    processamento: false,
    compartilhamento: false,
    eliminacao: false,
    verbos: [],
  },
  descricaoFluxoTratamento: "",
  abrangenciaGeografica: "",
  fonteDados: "",
  finalidadeTratamento: {
    hipoteseTratamento: "",
    descricaoFinalidade: "",
    previsaoLegal: "",
    resultadosTitular: "",
    beneficiosEsperados: "",
  },
  categoriaDadosPessoais: {
    identificacao: {
      idPessoal: emptyItemCategoriaDadosPessoais(),
      idGov: emptyItemCategoriaDadosPessoais(),
      idEletronica: emptyItemCategoriaDadosPessoais(),
      locEletronica: emptyItemCategoriaDadosPessoais(),
    },
    financeiros: {
      idFin: emptyItemCategoriaDadosPessoais(),
      recursosFin: emptyItemCategoriaDadosPessoais(),
      dividasDespesas: emptyItemCategoriaDadosPessoais(),
      solvencia: emptyItemCategoriaDadosPessoais(),
      emprestimosHipotecaCredito: emptyItemCategoriaDadosPessoais(),
      assistenciaFin: emptyItemCategoriaDadosPessoais(),
      apoliceSeguro: emptyItemCategoriaDadosPessoais(),
      planoPensao: emptyItemCategoriaDadosPessoais(),
      transacaoFin: emptyItemCategoriaDadosPessoais(),
      compensacao: emptyItemCategoriaDadosPessoais(),
      atividadeProfissional: emptyItemCategoriaDadosPessoais(),
      acordosAjustes: emptyItemCategoriaDadosPessoais(),
      autorizacoesConsentimentos: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicas: {
      detalhesPessoais: emptyItemCategoriaDadosPessoais(),
      detalhesMilitares: emptyItemCategoriaDadosPessoais(),
      situacaoImigracao: emptyItemCategoriaDadosPessoais(),
      descricaoFisica: emptyItemCategoriaDadosPessoais(),
    },
    habitos: {
      habitos: emptyItemCategoriaDadosPessoais(),
      estiloVida: emptyItemCategoriaDadosPessoais(),
      viagensDeslocamento: emptyItemCategoriaDadosPessoais(),
      contatosSociais: emptyItemCategoriaDadosPessoais(),
      posses: emptyItemCategoriaDadosPessoais(),
      denunciasIncidentesAcidentes: emptyItemCategoriaDadosPessoais(),
      distincoes: emptyItemCategoriaDadosPessoais(),
      usoMidia: emptyItemCategoriaDadosPessoais(),
    },
    caracteristicasPsicologicas: {
      descricaoPsi: emptyItemCategoriaDadosPessoais(),
    },
    composicaoFamiliar: {
      casamentoCoabitacao: emptyItemCategoriaDadosPessoais(),
      historicoConjugal: emptyItemCategoriaDadosPessoais(),
      membrosFamilia: emptyItemCategoriaDadosPessoais(),
    },
    interessesLazer: {
      atividadesInteressesLaz: emptyItemCategoriaDadosPessoais(),
    },
    associacoes: {
      outrasAssociacoesNaoSensiveis: emptyItemCategoriaDadosPessoais(),
    },
    processoJudAdmCrim: {
      suspeitas: emptyItemCategoriaDadosPessoais(),
      condenacoesSentencas: emptyItemCategoriaDadosPessoais(),
      acoesJud: emptyItemCategoriaDadosPessoais(),
      penalidadesAdm: emptyItemCategoriaDadosPessoais(),
    },
    habitosConsumo: {
      dadosBensServicos: emptyItemCategoriaDadosPessoais(),
    },
    residenciais: {
      dadosResidencia: emptyItemCategoriaDadosPessoais(),
    },
    educacaoTreinamento: {
      academicosEscolares: emptyItemCategoriaDadosPessoais(),
      registroFinanceiro: emptyItemCategoriaDadosPessoais(),
      qualificacaoExperienciaProf: emptyItemCategoriaDadosPessoais(),
    },
    profissaoEmprego: {
      empregoAtual: emptyItemCategoriaDadosPessoais(),
      recrutamento: emptyItemCategoriaDadosPessoais(),
      rescisao: emptyItemCategoriaDadosPessoais(),
      carreira: emptyItemCategoriaDadosPessoais(),
      absenteismoDisciplina: emptyItemCategoriaDadosPessoais(),
      avaliacaoDesempenho: emptyItemCategoriaDadosPessoais(),
    },
    regVideoImgVoz: {
      videoImagem: emptyItemCategoriaDadosPessoais(),
      imagemVigilancia: emptyItemCategoriaDadosPessoais(),
      voz: emptyItemCategoriaDadosPessoais(),
    },
    outros: {
      outros: [],
    },
  },
  categoriaDadosPessoaisSensiveis: {
    origemRacialEtnica: emptyItemCategoriaDadosPessoais(),
    conviccaoReligiosa: emptyItemCategoriaDadosPessoais(),
    opiniaoPolitica: emptyItemCategoriaDadosPessoais(),
    filiacaoSindicato: emptyItemCategoriaDadosPessoais(),
    filiacaoOrganizacaoReligiosa: emptyItemCategoriaDadosPessoais(),
    filiacaoCrencaFilosofica: emptyItemCategoriaDadosPessoais(),
    filiacaoPreferenciaPolitica: emptyItemCategoriaDadosPessoais(),
    saudeVidaSexual: emptyItemCategoriaDadosPessoais(),
    geneticos: emptyItemCategoriaDadosPessoais(),
    biometricos: emptyItemCategoriaDadosPessoais(),
  },
  frequenciaTratamento: "",
  quantidadeDadosTratados: "",
  categoriasTitulares: {
    categorias: [],
    criancasAdolescentes: [],
    outrosGruposVulneraveis: [],
  },
  compartilhamentoDadosPessoais: [],
  medidasSegurancaPrivacidade: [],
  transferenciaInternacional: [],
  contratoServicosTITratamentoDados: [],
  riscosPrivacidade: [],
  observacoesProcesso: [],
});
