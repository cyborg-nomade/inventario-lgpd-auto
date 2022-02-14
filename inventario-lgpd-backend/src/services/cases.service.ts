/**
 * Data Model Interfaces
 */
import {
  BaseFullCaseObject,
  CaseItemObject,
  categoriaTitulares,
  emptyAgenteTratamento,
  emptyItemCategoriaDadosPessoais,
  fontesRetencao,
  FullCaseObject,
  FullCaseObjectBundle,
  hipotesesTratamento,
  tipoMedidaSegurancaPrivacidade,
  tipoRiscoPrivacidade,
} from "../models/cases.model";

/**
 * In-Memory Store
 */
let cases: FullCaseObject[] = [
  {
    nome: "0800 - Relacionamento com o passageiro",
    id: 1,
    ref: "Não se aplica",
    area: "DRMP",
    dataCriacao: new Date("2021-04-19").toISOString().substring(0, 10),
    dataAtualizacao: new Date("2021-04-19").toISOString().substring(0, 10),
    aprovado: false,
    criador: "u1",
    controlador: { nome: "CPTM" },
    encarregado: { nome: "Olivia Shibata Nishiyama" },
    extensaoEncarregado: {
      nome: "VIVIANE CITRONI VIZIONI",
      area: "DRMP",
      telefone: "3353-4343 / 998330916",
      email: "VIVIANE.VIZIONI@cptm.sp.gov.br",
    },
    areaTratamentoDados: emptyAgenteTratamento(),
    operador: {
      nome: "Empresas terceirizadas para atendimento - Imperatriz teleserviços",
    },
    fasesCicloTratamento: {
      coleta: true,
      retencao: true,
      processamento: true,
      compartilhamento: true,
      eliminacao: true,
      verbos: [],
    },
    descricaoFluxoTratamento:
      "1. Os dados pessoais são coletados mediante preenchimento formulário eletrônico no site CPTM, coletados e inseridos no sistema durante atendimento telefônico ou via WhatsApp.\n 2. Os dados são armazenados em sistema informatizado (GA)\n 3. A CPTM realiza o processamento dos dados e dá prosseguimento no atendimento a demanda do passageiro.\n 4. Os dados pessoais podem ser compartilhados com outras áreas da empresa de acordo com o teor da manifestação do passageiro.\n 5. Os dados pessoais podem ser eliminados à pedido do titular. Não há atualmente processo de eliminação.",
    abrangenciaGeografica: "Nacional",
    fonteDados: "Titular de dados",
    finalidadeTratamento: {
      hipoteseTratamento: hipotesesTratamento.obrigacaoLegal,
      descricaoFinalidade:
        "Identificação, atendimento de manifestações, histórico de atendimentos, acompanhamento de demandas recorrentes.",
      previsaoLegal:
        "Lei do SAC – Decreto 6.523/08, Lei de Proteção e Defesa do Usuário do Serviço Público - Lei Nº 10.294",
      resultadosTitular:
        "Qualificação das manifestações registradas pelo Canal de Relacionamento, para atendimento às solicitações.",
      beneficiosEsperados:
        "Atendimento à legislação e prestar atendimento de excelência ao cidadão.",
    },
    categoriaDadosPessoais: {
      identificacao: {
        idPessoal: {
          descricao: "Nome, Telefone, Endereço, E-mail, Mídias Sociais",
          tempoRetencao: "indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
        idGov: {
          descricao: "RG, CPF",
          tempoRetencao: "indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
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
        detalhesPessoais: {
          descricao:
            "Sexo, Data de nascimento (Dados fornecidos espontaneamente pelo passageiro)",
          tempoRetencao: "indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
        detalhesMilitares: emptyItemCategoriaDadosPessoais(),
        situacaoImigracao: emptyItemCategoriaDadosPessoais(),
        descricaoFisica: {
          descricao:
            "Descrição solicitada caso seja necessário buscar imagens no sistema de monitoramento.",
          tempoRetencao: "indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
      },
      habitos: {
        habitos: emptyItemCategoriaDadosPessoais(),
        estiloVida: emptyItemCategoriaDadosPessoais(),
        viagensDeslocamento: emptyItemCategoriaDadosPessoais(),
        contatosSociais: emptyItemCategoriaDadosPessoais(),
        posses: emptyItemCategoriaDadosPessoais(),
        denunciasIncidentesAcidentes: {
          descricao:
            "Informações de acidentes/incidentes no sistema CPTM caso o titular dos dados esteja envolvido ou seja testemunha do fato",
          tempoRetencao: "indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
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
        videoImagem: {
          descricao:
            "Videos e imagens que ilustrem a demanda do passageiro. Whatsapp CPTM - cadastra no GA",
          tempoRetencao: "Indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
        imagemVigilancia: emptyItemCategoriaDadosPessoais(),
        voz: {
          descricao:
            "Gravações de voz encaminhadas pelo canal Whatsapp. As ligações do 0800 ficam gravadas e armazenadas com a empresa de telefonia contratada.",
          tempoRetencao: "Indefinido",
          fonteRetencao: fontesRetencao.midiaEletronica,
          caminhoRedeSistema: "GA",
        },
      },
      outros: {
        outros: [],
      },
    },
    dadosPessoaisSensiveis: true,
    categoriaDadosPessoaisSensiveis: {
      origemRacialEtnica: {
        descricao: "Raça (obrigatoriedade legal)",
        tempoRetencao: "",
        fonteRetencao: fontesRetencao.na,
        caminhoRedeSistema: "",
      },
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
    frequenciaTratamento: "24x7",
    quantidadeDadosTratados: "7 dados pessoais e 1 sensível",
    categoriasTitulares: {
      categorias: [
        {
          tipoCategoria: categoriaTitulares.pessoas,
          descricao:
            "passageiros da CPTM, cidadão lindeiros ou usuários do sistema.",
        },
      ],
      criancasAdolescentes: [],
      outrosGruposVulneraveis: [],
    },
    compartilhamentoDadosPessoais: [
      {
        nomeInstituicao: "CPTM - DROV",
        dadosCompartilhados:
          "A DROV tem acesso irrestrito a base de dados. 2ª instância",
        finalidadeCompartilhamento: "",
      },
      {
        nomeInstituicao: "CPTM - GRM",
        dadosCompartilhados: "Tratativas do processo de manifestação",
        finalidadeCompartilhamento: "",
      },
      {
        nomeInstituicao: "CPTM - GPN",
        dadosCompartilhados: "Tratativas do processo de manifestação",
        finalidadeCompartilhamento: "",
      },
      {
        nomeInstituicao: "CPTM - GRJ",
        dadosCompartilhados: "Exercício de direito em processo judicial",
        finalidadeCompartilhamento: "",
      },
      {
        nomeInstituicao: "CPTM - DPRG",
        dadosCompartilhados: "Assuntos relacionados à território",
        finalidadeCompartilhamento: "",
      },
      {
        nomeInstituicao: "CPTM - DOSV",
        dadosCompartilhados: "Assuntos relacionados à pessoas desaparecidas",
        finalidadeCompartilhamento: "",
      },
    ],
    medidasSegurancaPrivacidade: [
      {
        tipo: tipoMedidaSegurancaPrivacidade.controleAcessoPrivacidade,
        descricaoControles: "",
      },
      {
        tipo: tipoMedidaSegurancaPrivacidade.controlesSeguranceRedeFisicaAmbiente,
        descricaoControles: "",
      },
      {
        tipo: tipoMedidaSegurancaPrivacidade.copiaSeguranca,
        descricaoControles: "",
      },
      {
        tipo: tipoMedidaSegurancaPrivacidade.controlesAcessoLógico,
        descricaoControles: "",
      },
    ],
    transferenciaInternacional: [],
    contratoServicosTITratamentoDados: [],
    riscosPrivacidade: [
      { tipoRisco: tipoRiscoPrivacidade.acessoNaoAutorizado, observacoes: "" },
      {
        tipoRisco: tipoRiscoPrivacidade.colecaoExcessiva,
        observacoes:
          "dados excessivos como mídias sociais, raça, sexo e nascimento",
      },
      {
        tipoRisco: tipoRiscoPrivacidade.compartilharDistribuirSemConsentimento,
        observacoes:
          "terceiros ou cptm fazendo o cadastro podem tirar uma foto do formulário",
      },
      {
        tipoRisco: tipoRiscoPrivacidade.retencaoProlongadaSemNecessidade,
        observacoes: "",
      },
      {
        tipoRisco: tipoRiscoPrivacidade.tratamentoSemConsentimento,
        observacoes: "sexo e data de nascimento para fins de mkt por exemplo",
      },
    ],
    observacoesProcesso: [
      {
        descricaoObs:
          "GA centraliza as manifestações\n rever necessidade de solicitar mídia sociais\n 16.758/2018 - obrigatória identificação sobre cor ou indentificação racial - banco de dados",
      },
    ],
  },
];

/**
 * Service Methods
 */
export const findAll = async (): Promise<CaseItemObject[]> => {
  const reducedCases: CaseItemObject[] = cases.map((c) => {
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
      id: c.id,
    };

    return reducedCase;
  });

  return reducedCases;
};

export const find = async (id: number): Promise<FullCaseObject> => {
  const foundCase = cases.find((c) => c.id === id);

  if (foundCase === undefined) {
    throw new TypeError("Caso não encontrado!");
  }

  return foundCase;
};

export const findByUser = async (uid: string): Promise<CaseItemObject[]> => {
  const filteredCases: CaseItemObject[] = cases
    .map((c) => {
      const { hipoteseTratamento, descricaoFinalidade } =
        c.finalidadeTratamento;

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
        id: c.id,
      };

      return reducedCase;
    })
    .filter((c) => c.criador === uid);

  return filteredCases;
};

export const create = async (
  recCase: BaseFullCaseObject
): Promise<FullCaseObject> => {
  const id = new Date().valueOf();

  const newCase = { id, ...recCase };

  cases.push(newCase);

  return newCase;
};

export const update = async (
  id: number,
  caseUpdate: BaseFullCaseObject
): Promise<FullCaseObject | null> => {
  const storedCase = await find(id);

  if (!storedCase) {
    return null;
  }

  cases[id] = { id, ...caseUpdate };

  return cases[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const storedCase = await find(id);

  if (!storedCase) {
    return null;
  }

  delete cases[id];
};
