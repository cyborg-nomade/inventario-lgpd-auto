import { Schema, Types, model } from "mongoose";

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

export enum tipoGarantiaTranferenciaInternacional {
  acordoCooperacaoInt = "Acordo de cooperação internacional",
  certificacao = "Certificação regularmente emitida",
  clausulasContratuaisEspecificas = "Cláusulas contratuais específicas para determinada transferência",
  clausulasContratuaisPadrao = "Cláusulas-padrão contratuais",
  codigoConduta = "Código de conduta regularmente emitido",
  cooperacaoJuridicaInt = "Cooperação jurídica internacional entre órgãos públicos de inteligência, de investigação e de persecução, de acordo com os instrumentos de direito internacional",
  cumprimentObrigacaoLegalRegulatorioa = "Cumprimento de obrigação legal ou regulatória pelo controlador",
  execucaoContratoTitular = "Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular",
  execucaoPoliticaPublica = "Execução de política pública ou atribuição legal do serviço público",
  exercicioDireitos = "Exercício regular de direitos em processo judicial, administrativo ou arbitral",
  consentimentoEspecificoTitular = "Fornecimento de consentimento específico pelo titular dos dados pessoais",
  normasCorporativasGlobais = "Normas corporativas globais",
  nivelAdequadoProtecaoPais = "País que fornece um nível adequado de proteção",
  protecaoVidaTitular = "Proteção da vida ou da incolumidade física do titular ou de terceiro",
  selo = "Selo regularmente emitido",
  autorizadaANPD = "Transferência autorizada pela ANPD",
}

export enum tipoRiscoPrivacidade {
  acessoNaoAutorizado = "Acesso não autorizado",
  modificacaoNaoAutorizada = "Modificação não autorizada",
  perda = "Perda",
  roubo = "Roubo",
  remocaoNaoAutorizada = "Remoção não autorizada",
  colecaoExcessiva = "Coleção excessiva",
  informacaoInsuficienteFinalidadeTratamento = "Informação insuficiente sobre a finalidade do tratamento",
  tratamentoSemConsentimento = "Tratamento sem consentimento do titular dos dados pessoais (Caso o tratamento não esteja previsto em legislação ou regulação pertinente)",
  falhaConsiderarDireitos = "Falha em considerar os direitos do titular dos dados pessoais (Ex.: perda do direito de acesso)",
  compartilharDistribuirSemConsentimento = "Compartilhar ou distribuir dados pessoais com terceiros fora da administração pública federal sem o consentimento do titular dos dados pessoais",
  retencaoProlongadaSemNecessidade = "Retenção prolongada de dados pessoais sem necessidade",
  vinculacaoAssociacaoIndevida = "Vinculação ou associação indevida, direta ou indireta, dos dados pessoais ao titular",
  falhaErroProcessamento = "Falha ou erro de processamento (Ex.: execução de script de banco de dados que atualiza dado pessoal com informação equivocada, ausência de validação dos dados de entrada, etc.)",
  reidentificacaoPsudonimizados = "Reidentificação de dados pseudonimizados",
}

interface AgenteTratamento {
  nome: string;
  area?: string;
  telefone?: string;
  email?: string;
}

const agenteTratamentoSchema = new Schema<AgenteTratamento>(
  {
    nome: String,
    area: String,
    telefone: String,
    email: String,
  },
  { _id: false }
);

export interface itemCategoriaDadosPessoais {
  descricao: string;
  tempoRetencao: string;
  fonteRetencao: fontesRetencao;
  caminhoRedeSistema: string;
}

const itemCategoriaDadosPessoaisSchema = new Schema<itemCategoriaDadosPessoais>(
  {
    descricao: String,
    tempoRetencao: String,
    fonteRetencao: String,
    caminhoRedeSistema: String,
  },
  { _id: false }
);

interface itemCategoriaTitulares {
  tipoCategoria: categoriaTitulares;
  descricao: string;
}

const itemCategoriaTitularesSchema = new Schema<itemCategoriaTitulares>(
  {
    tipoCategoria: String,
    descricao: String,
  },
  { _id: false }
);

interface itemCompartilhamentoDados {
  nomeInstituicao: string;
  dadosCompartilhados: string;
  finalidadeCompartilhamento: string;
}

const itemCompartilhamentoDadosSchema = new Schema<itemCompartilhamentoDados>(
  {
    nomeInstituicao: String,
    dadosCompartilhados: String,
    finalidadeCompartilhamento: String,
  },
  { _id: false }
);

interface itemMedidasSegurancaPrivacidade {
  tipo: tipoMedidaSegurancaPrivacidade;
  descricaoControles: string;
}

const itemMedidasSegurancaPrivacidadeSchema =
  new Schema<itemMedidasSegurancaPrivacidade>(
    {
      tipo: String,
      descricaoControles: String,
    },
    { _id: false }
  );

interface itemTransferenciaInternacional {
  nomeOrganizacao: string;
  pais: string;
  dadosTransferidos: string;
  tipoGarantia: tipoGarantiaTranferenciaInternacional;
}

const itemTransferenciaInternacionalSchema =
  new Schema<itemTransferenciaInternacional>(
    {
      nomeOrganizacao: String,
      pais: String,
      dadosTransferidos: String,
      tipoGarantia: String,
    },
    { _id: false }
  );

interface itemContratoTI {
  numeroContrato: string;
  numeroProcessoContratacao: string;
  objetoContrato: string;
  emailGestorContrato: string;
}

const itemContratoTISchema = new Schema<itemContratoTI>(
  {
    numeroContrato: String,
    numeroProcessoContratacao: String,
    objetoContrato: String,
    emailGestorContrato: String,
  },
  { _id: false }
);

interface itemRiscoPrivacidade {
  tipoRisco: tipoRiscoPrivacidade;
  observacoes: string;
}

const itemRiscoPrivacidadeSchema = new Schema<itemRiscoPrivacidade>(
  {
    tipoRisco: String,
    observacoes: String,
  },
  { _id: false }
);

interface itemObservacoesProcesso {
  descricaoObs: string;
}

const itemObservacoesProcessoSchema = new Schema<itemObservacoesProcesso>(
  {
    descricaoObs: String,
  },
  { _id: false }
);

export interface CaseItemObject {
  nome: string;
  ref: string;
  area: string;
  dataCriacao: string;
  dataAtualizacao: string;
  finalidadeTratamento: {
    hipoteseTratamento: hipotesesTratamento;
    descricaoFinalidade: string;
  };
  dadosPessoaisSensiveis: boolean;
  criador: Types.ObjectId;
  aprovado: boolean;
}

export interface FullCaseObject extends CaseItemObject {
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

const FullCaseObjectSchema = new Schema<FullCaseObject>({
  nome: String,
  ref: String,
  area: String,
  dataCriacao: String,
  dataAtualizacao: String,
  dadosPessoaisSensiveis: Boolean,
  criador: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  aprovado: Boolean,
  controlador: agenteTratamentoSchema,
  encarregado: agenteTratamentoSchema,
  extensaoEncarregado: agenteTratamentoSchema,
  areaTratamentoDados: agenteTratamentoSchema,
  operador: agenteTratamentoSchema,
  fasesCicloTratamento: {
    coleta: Boolean,
    retencao: Boolean,
    processamento: Boolean,
    compartilhamento: Boolean,
    eliminacao: Boolean,
    verbos: [String],
  },
  descricaoFluxoTratamento: String,
  abrangenciaGeografica: String,
  fonteDados: String,
  finalidadeTratamento: {
    hipoteseTratamento: String,
    descricaoFinalidade: String,
    previsaoLegal: String,
    resultadosTitular: String,
    beneficiosEsperados: String,
  },
  categoriaDadosPessoais: {
    identificacao: {
      idPessoal: itemCategoriaDadosPessoaisSchema,
      idGov: itemCategoriaDadosPessoaisSchema,
      idEletronica: itemCategoriaDadosPessoaisSchema,
      locEletronica: itemCategoriaDadosPessoaisSchema,
    },
    financeiros: {
      idFin: itemCategoriaDadosPessoaisSchema,
      recursosFin: itemCategoriaDadosPessoaisSchema,
      dividasDespesas: itemCategoriaDadosPessoaisSchema,
      solvencia: itemCategoriaDadosPessoaisSchema,
      emprestimosHipotecaCredito: itemCategoriaDadosPessoaisSchema,
      assistenciaFin: itemCategoriaDadosPessoaisSchema,
      apoliceSeguro: itemCategoriaDadosPessoaisSchema,
      planoPensao: itemCategoriaDadosPessoaisSchema,
      transacaoFin: itemCategoriaDadosPessoaisSchema,
      compensacao: itemCategoriaDadosPessoaisSchema,
      atividadeProfissional: itemCategoriaDadosPessoaisSchema,
      acordosAjustes: itemCategoriaDadosPessoaisSchema,
      autorizacoesConsentimentos: itemCategoriaDadosPessoaisSchema,
    },
    caracteristicas: {
      detalhesPessoais: itemCategoriaDadosPessoaisSchema,
      detalhesMilitares: itemCategoriaDadosPessoaisSchema,
      situacaoImigracao: itemCategoriaDadosPessoaisSchema,
      descricaoFisica: itemCategoriaDadosPessoaisSchema,
    },
    habitos: {
      habitos: itemCategoriaDadosPessoaisSchema,
      estiloVida: itemCategoriaDadosPessoaisSchema,
      viagensDeslocamento: itemCategoriaDadosPessoaisSchema,
      contatosSociais: itemCategoriaDadosPessoaisSchema,
      posses: itemCategoriaDadosPessoaisSchema,
      denunciasIncidentesAcidentes: itemCategoriaDadosPessoaisSchema,
      distincoes: itemCategoriaDadosPessoaisSchema,
      usoMidia: itemCategoriaDadosPessoaisSchema,
    },
    caracteristicasPsicologicas: {
      descricaoPsi: itemCategoriaDadosPessoaisSchema,
    },
    composicaoFamiliar: {
      casamentoCoabitacao: itemCategoriaDadosPessoaisSchema,
      historicoConjugal: itemCategoriaDadosPessoaisSchema,
      membrosFamilia: itemCategoriaDadosPessoaisSchema,
    },
    interessesLazer: {
      atividadesInteressesLaz: itemCategoriaDadosPessoaisSchema,
    },
    associacoes: {
      outrasAssociacoesNaoSensiveis: itemCategoriaDadosPessoaisSchema,
    },
    processoJudAdmCrim: {
      suspeitas: itemCategoriaDadosPessoaisSchema,
      condenacoesSentencas: itemCategoriaDadosPessoaisSchema,
      acoesJud: itemCategoriaDadosPessoaisSchema,
      penalidadesAdm: itemCategoriaDadosPessoaisSchema,
    },
    habitosConsumo: {
      dadosBensServicos: itemCategoriaDadosPessoaisSchema,
    },
    residenciais: {
      dadosResidencia: itemCategoriaDadosPessoaisSchema,
    },
    educacaoTreinamento: {
      academicosEscolares: itemCategoriaDadosPessoaisSchema,
      registroFinanceiro: itemCategoriaDadosPessoaisSchema,
      qualificacaoExperienciaProf: itemCategoriaDadosPessoaisSchema,
    },
    profissaoEmprego: {
      empregoAtual: itemCategoriaDadosPessoaisSchema,
      recrutamento: itemCategoriaDadosPessoaisSchema,
      rescisao: itemCategoriaDadosPessoaisSchema,
      carreira: itemCategoriaDadosPessoaisSchema,
      absenteismoDisciplina: itemCategoriaDadosPessoaisSchema,
      avaliacaoDesempenho: itemCategoriaDadosPessoaisSchema,
    },
    regVideoImgVoz: {
      videoImagem: itemCategoriaDadosPessoaisSchema,
      imagemVigilancia: itemCategoriaDadosPessoaisSchema,
      voz: itemCategoriaDadosPessoaisSchema,
    },
    outros: {
      outros: [itemCategoriaDadosPessoaisSchema],
    },
  },
  categoriaDadosPessoaisSensiveis: {
    origemRacialEtnica: itemCategoriaDadosPessoaisSchema,
    conviccaoReligiosa: itemCategoriaDadosPessoaisSchema,
    opiniaoPolitica: itemCategoriaDadosPessoaisSchema,
    filiacaoSindicato: itemCategoriaDadosPessoaisSchema,
    filiacaoOrganizacaoReligiosa: itemCategoriaDadosPessoaisSchema,
    filiacaoCrencaFilosofica: itemCategoriaDadosPessoaisSchema,
    filiacaoPreferenciaPolitica: itemCategoriaDadosPessoaisSchema,
    saudeVidaSexual: itemCategoriaDadosPessoaisSchema,
    geneticos: itemCategoriaDadosPessoaisSchema,
    biometricos: itemCategoriaDadosPessoaisSchema,
  },
  frequenciaTratamento: String,
  quantidadeDadosTratados: String,
  categoriasTitulares: {
    categorias: [itemCategoriaTitularesSchema],
    criancasAdolescentes: [itemCategoriaTitularesSchema],
    outrosGruposVulneraveis: [itemCategoriaTitularesSchema],
  },
  compartilhamentoDadosPessoais: [itemCompartilhamentoDadosSchema],
  medidasSegurancaPrivacidade: [itemMedidasSegurancaPrivacidadeSchema],
  transferenciaInternacional: [itemTransferenciaInternacionalSchema],
  contratoServicosTITratamentoDados: [itemContratoTISchema],
  riscosPrivacidade: [itemRiscoPrivacidadeSchema],
  observacoesProcesso: [itemObservacoesProcessoSchema],
});

export const FullCaseObjectModel = model<FullCaseObject>(
  "Case",
  FullCaseObjectSchema
);

export const reduceCaseObject = (c: FullCaseObject): CaseItemObject => {
  const { hipoteseTratamento, descricaoFinalidade } = c.finalidadeTratamento;

  const reducedCase: CaseItemObject = {
    nome: c.nome,
    ref: c.ref,
    area: c.area,
    dataCriacao: c.dataCriacao,
    dataAtualizacao: c.dataAtualizacao,
    finalidadeTratamento: { hipoteseTratamento, descricaoFinalidade },
    dadosPessoaisSensiveis: c.dadosPessoaisSensiveis,
    criador: c.criador,
    aprovado: c.aprovado,
  };

  return reducedCase;
};
