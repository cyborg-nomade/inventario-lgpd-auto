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

export enum hipotesesTratamento {
  consentimento = "Consentimento do titular",
  obrigacaoLegal = "Cumprimento de obrigação legal ou regulatória pelo controlador",
  politicasPublicas = "Execução de políticas públicas",
  estudoPesquisa = "Alguma espécie de estudo realizado por órgão de pesquisa",
  execucaoContratoTitular = "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados",
  exercicioDireitos = "Exercício regular de direitos em processo judicial, administrativo ou arbitral",
  protecaoVidaTitular = "Proteção da vida ou da incolumidade física do titular ou de terceiro",
  tutelaSaude = "Tutela da saúde",
  interessesLegitimosControlador = "Atender aos interesses legítimos do controlador ou de terceiro",
  protecaoCredito = "Proteção do crédito",
  prevencaoFraude = "Garantia da prevenção à fraude e à segurança do titular",
}

export enum fontesRetencao {
  na = "Não se aplica",
  docPapel = "Documento em Papel",
  midiaEletronica = "Mídias Eletrônicas",
  docPapelMidiasEletronica = "Documento em Papel e Mídias Eletrônicas",
}

export enum categoriaTitulares {
  beneficiarios = "Beneficiários",
  clientes = "Clientes",
  contribuintes = "Contribuintes",
  dependentes = "Dependentes",
  eleitores = "Eleitores",
  empregados = "Empregados",
  estudantes = "Estudantes",
  motoristas = "Motoristas",
  pacientes = "Pacientes",
  pessoas = "Pessoas",
  servidores = "Servidores",
  outros = "Outros (Especificar)",
}

export enum tipoMedidaSegurancaPrivacidade {
  aberturaTransparenciaNotificacao = "Abertura, Transparência e Notificação",
  compliance = "Compliance com a Privacidade",
  consentimentoEscolha = "Consentimento e Escolha",
  continuidadeNegocio = "Continuidade de Negócio",
  controleCriptografico = "Controles Criptográficos",
  controlesAcessoLógico = "Controles de Acesso Lógico",
  controleAcessoPrivacidade = "Controle de Acesso e Privacidade",
  controlesSeguranceRedeFisicaAmbiente = "Controles de Segurança em Redes, Proteção Física e do Ambiente",
  copiaSeguranca = "Cópia de Segurança",
  desenvolvimentoSeguro = "Desenvolvimento Seguro",
  gestaoCapacidadeRedundancia = "Gestão de Capacidade e Redundância",
  gestaoMudancas = "Gestão de Mudanças",
  gestaoRiscos = "Gestão de Riscos",
  legitimidadeEspecificacaoProposito = "Legitimidade e Especificação de Propósito",
  limitacaoColeta = "Limitação de Coleta",
  minimizacaoDados = "Minimização de Dados",
  participacaoIndividualAcesso = "Participação Individual e Acesso",
  precisaoQualidade = "Precisão e qualidade",
  registroEventosRastreabilidadeLogs = "Registro de Eventos, Rastreabilidade e Salvaguarda de Logs",
  responsabilizacao = "Responsabilização",
  segurancaWeb = "Segurança Web",
  usoRetencaoLimitacaoDivulgacao = "Uso, Retenção e Limitação de Divulgação",
  respostaIncidente = "Resposta a Incidente",
}

interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
}

interface itemCategoriaDadosPessoais {
  descricao: string;
  tempoRetencao: string;
  fonteRetencao: fontesRetencao;
  caminhoRedeSistema: string;
}

interface itemCategoriaTitulares {
  tipoCategoria: categoriaTitulares;
  descricao: string;
}

interface itemCompartilhamentoDados {
  nomeInstituicao: string;
  dadosCompartilhados: string;
  finalidadeCompartilhamento: string;
}

interface itemMedidasSegurancaPrivacidade {
  tipo: tipoMedidaSegurancaPrivacidade;
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
    hipoteseTratamento: hipotesesTratamento;
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
    financeiros: {
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

export const emptyItemCategoriaDadosPessoais =
  (): itemCategoriaDadosPessoais => ({
    descricao: "Não se aplica",
    tempoRetencao: "",
    fonteRetencao: fontesRetencao.na,
    caminhoRedeSistema: "",
  });

export const emptyItemCategoriaTitulares = (): itemCategoriaTitulares => ({
  tipoCategoria: categoriaTitulares.pessoas,
  descricao: "",
});

export const emptyItemCompatilhamentoDados = (): itemCompartilhamentoDados => ({
  nomeInstituicao: "",
  dadosCompartilhados: "",
  finalidadeCompartilhamento: "",
});

export const emptyItemMedidaSegurancaPrivacidade =
  (): itemMedidasSegurancaPrivacidade => ({
    tipo: tipoMedidaSegurancaPrivacidade.consentimentoEscolha,
    descricaoControles: "",
  });

// interface itemMedidasSegurancaPrivacidade {
//   tipo: tipoMedidaSegurancaPrivacidade;
//   descricaoControles: string;
// }

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
    hipoteseTratamento: hipotesesTratamento.consentimento,
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
    categorias: [emptyItemCategoriaTitulares()],
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
