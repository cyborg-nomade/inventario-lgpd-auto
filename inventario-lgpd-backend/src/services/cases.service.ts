import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

/**
 * Data Model Interfaces
 */
import {
  FullCaseObject,
  FullCaseObjectModel,
  CaseItemObject,
  reduceCaseObject,
} from "../models/cases.model";
import { UserModel } from "../models/users.model";

/**
 * In-Memory Store
 */
// let cases: FullCaseObject[] = [
//   {
//     nome: "0800 - Relacionamento com o passageiro",
//     id: uuidv4(),
//     ref: "Não se aplica",
//     area: "DRMP",
//     dataCriacao: new Date("2021-04-19").toISOString().substring(0, 10),
//     dataAtualizacao: new Date("2021-04-19").toISOString().substring(0, 10),
//     aprovado: false,
//     criador: "u1",
//     controlador: { nome: "CPTM" },
//     encarregado: { nome: "Olivia Shibata Nishiyama" },
//     extensaoEncarregado: {
//       nome: "VIVIANE CITRONI VIZIONI",
//       area: "DRMP",
//       telefone: "3353-4343 / 998330916",
//       email: "VIVIANE.VIZIONI@cptm.sp.gov.br",
//     },
//     areaTratamentoDados: emptyAgenteTratamento(),
//     operador: {
//       nome: "Empresas terceirizadas para atendimento - Imperatriz teleserviços",
//     },
//     fasesCicloTratamento: {
//       coleta: true,
//       retencao: true,
//       processamento: true,
//       compartilhamento: true,
//       eliminacao: true,
//       verbos: [],
//     },
//     descricaoFluxoTratamento:
//       "1. Os dados pessoais são coletados mediante preenchimento formulário eletrônico no site CPTM, coletados e inseridos no sistema durante atendimento telefônico ou via WhatsApp.\n 2. Os dados são armazenados em sistema informatizado (GA)\n 3. A CPTM realiza o processamento dos dados e dá prosseguimento no atendimento a demanda do passageiro.\n 4. Os dados pessoais podem ser compartilhados com outras áreas da empresa de acordo com o teor da manifestação do passageiro.\n 5. Os dados pessoais podem ser eliminados à pedido do titular. Não há atualmente processo de eliminação.",
//     abrangenciaGeografica: "Nacional",
//     fonteDados: "Titular de dados",
//     finalidadeTratamento: {
//       hipoteseTratamento: hipotesesTratamento.obrigacaoLegal,
//       descricaoFinalidade:
//         "Identificação, atendimento de manifestações, histórico de atendimentos, acompanhamento de demandas recorrentes.",
//       previsaoLegal:
//         "Lei do SAC – Decreto 6.523/08, Lei de Proteção e Defesa do Usuário do Serviço Público - Lei Nº 10.294",
//       resultadosTitular:
//         "Qualificação das manifestações registradas pelo Canal de Relacionamento, para atendimento às solicitações.",
//       beneficiosEsperados:
//         "Atendimento à legislação e prestar atendimento de excelência ao cidadão.",
//     },
//     categoriaDadosPessoais: {
//       identificacao: {
//         idPessoal: {
//           descricao: "Nome, Telefone, Endereço, E-mail, Mídias Sociais",
//           tempoRetencao: "indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//         idGov: {
//           descricao: "RG, CPF",
//           tempoRetencao: "indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//         idEletronica: emptyItemCategoriaDadosPessoais(),
//         locEletronica: emptyItemCategoriaDadosPessoais(),
//       },
//       financeiros: {
//         idFin: emptyItemCategoriaDadosPessoais(),
//         recursosFin: emptyItemCategoriaDadosPessoais(),
//         dividasDespesas: emptyItemCategoriaDadosPessoais(),
//         solvencia: emptyItemCategoriaDadosPessoais(),
//         emprestimosHipotecaCredito: emptyItemCategoriaDadosPessoais(),
//         assistenciaFin: emptyItemCategoriaDadosPessoais(),
//         apoliceSeguro: emptyItemCategoriaDadosPessoais(),
//         planoPensao: emptyItemCategoriaDadosPessoais(),
//         transacaoFin: emptyItemCategoriaDadosPessoais(),
//         compensacao: emptyItemCategoriaDadosPessoais(),
//         atividadeProfissional: emptyItemCategoriaDadosPessoais(),
//         acordosAjustes: emptyItemCategoriaDadosPessoais(),
//         autorizacoesConsentimentos: emptyItemCategoriaDadosPessoais(),
//       },
//       caracteristicas: {
//         detalhesPessoais: {
//           descricao:
//             "Sexo, Data de nascimento (Dados fornecidos espontaneamente pelo passageiro)",
//           tempoRetencao: "indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//         detalhesMilitares: emptyItemCategoriaDadosPessoais(),
//         situacaoImigracao: emptyItemCategoriaDadosPessoais(),
//         descricaoFisica: {
//           descricao:
//             "Descrição solicitada caso seja necessário buscar imagens no sistema de monitoramento.",
//           tempoRetencao: "indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//       },
//       habitos: {
//         habitos: emptyItemCategoriaDadosPessoais(),
//         estiloVida: emptyItemCategoriaDadosPessoais(),
//         viagensDeslocamento: emptyItemCategoriaDadosPessoais(),
//         contatosSociais: emptyItemCategoriaDadosPessoais(),
//         posses: emptyItemCategoriaDadosPessoais(),
//         denunciasIncidentesAcidentes: {
//           descricao:
//             "Informações de acidentes/incidentes no sistema CPTM caso o titular dos dados esteja envolvido ou seja testemunha do fato",
//           tempoRetencao: "indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//         distincoes: emptyItemCategoriaDadosPessoais(),
//         usoMidia: emptyItemCategoriaDadosPessoais(),
//       },
//       caracteristicasPsicologicas: {
//         descricaoPsi: emptyItemCategoriaDadosPessoais(),
//       },
//       composicaoFamiliar: {
//         casamentoCoabitacao: emptyItemCategoriaDadosPessoais(),
//         historicoConjugal: emptyItemCategoriaDadosPessoais(),
//         membrosFamilia: emptyItemCategoriaDadosPessoais(),
//       },
//       interessesLazer: {
//         atividadesInteressesLaz: emptyItemCategoriaDadosPessoais(),
//       },
//       associacoes: {
//         outrasAssociacoesNaoSensiveis: emptyItemCategoriaDadosPessoais(),
//       },
//       processoJudAdmCrim: {
//         suspeitas: emptyItemCategoriaDadosPessoais(),
//         condenacoesSentencas: emptyItemCategoriaDadosPessoais(),
//         acoesJud: emptyItemCategoriaDadosPessoais(),
//         penalidadesAdm: emptyItemCategoriaDadosPessoais(),
//       },
//       habitosConsumo: {
//         dadosBensServicos: emptyItemCategoriaDadosPessoais(),
//       },
//       residenciais: {
//         dadosResidencia: emptyItemCategoriaDadosPessoais(),
//       },
//       educacaoTreinamento: {
//         academicosEscolares: emptyItemCategoriaDadosPessoais(),
//         registroFinanceiro: emptyItemCategoriaDadosPessoais(),
//         qualificacaoExperienciaProf: emptyItemCategoriaDadosPessoais(),
//       },
//       profissaoEmprego: {
//         empregoAtual: emptyItemCategoriaDadosPessoais(),
//         recrutamento: emptyItemCategoriaDadosPessoais(),
//         rescisao: emptyItemCategoriaDadosPessoais(),
//         carreira: emptyItemCategoriaDadosPessoais(),
//         absenteismoDisciplina: emptyItemCategoriaDadosPessoais(),
//         avaliacaoDesempenho: emptyItemCategoriaDadosPessoais(),
//       },
//       regVideoImgVoz: {
//         videoImagem: {
//           descricao:
//             "Videos e imagens que ilustrem a demanda do passageiro. Whatsapp CPTM - cadastra no GA",
//           tempoRetencao: "Indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//         imagemVigilancia: emptyItemCategoriaDadosPessoais(),
//         voz: {
//           descricao:
//             "Gravações de voz encaminhadas pelo canal Whatsapp. As ligações do 0800 ficam gravadas e armazenadas com a empresa de telefonia contratada.",
//           tempoRetencao: "Indefinido",
//           fonteRetencao: fontesRetencao.midiaEletronica,
//           caminhoRedeSistema: "GA",
//         },
//       },
//       outros: {
//         outros: [],
//       },
//     },
//     dadosPessoaisSensiveis: true,
//     categoriaDadosPessoaisSensiveis: {
//       origemRacialEtnica: {
//         descricao: "Raça (obrigatoriedade legal)",
//         tempoRetencao: "",
//         fonteRetencao: fontesRetencao.na,
//         caminhoRedeSistema: "",
//       },
//       conviccaoReligiosa: emptyItemCategoriaDadosPessoais(),
//       opiniaoPolitica: emptyItemCategoriaDadosPessoais(),
//       filiacaoSindicato: emptyItemCategoriaDadosPessoais(),
//       filiacaoOrganizacaoReligiosa: emptyItemCategoriaDadosPessoais(),
//       filiacaoCrencaFilosofica: emptyItemCategoriaDadosPessoais(),
//       filiacaoPreferenciaPolitica: emptyItemCategoriaDadosPessoais(),
//       saudeVidaSexual: emptyItemCategoriaDadosPessoais(),
//       geneticos: emptyItemCategoriaDadosPessoais(),
//       biometricos: emptyItemCategoriaDadosPessoais(),
//     },
//     frequenciaTratamento: "24x7",
//     quantidadeDadosTratados: "7 dados pessoais e 1 sensível",
//     categoriasTitulares: {
//       categorias: [
//         {
//           tipoCategoria: categoriaTitulares.pessoas,
//           descricao:
//             "passageiros da CPTM, cidadão lindeiros ou usuários do sistema.",
//         },
//       ],
//       criancasAdolescentes: [],
//       outrosGruposVulneraveis: [],
//     },
//     compartilhamentoDadosPessoais: [
//       {
//         nomeInstituicao: "CPTM - DROV",
//         dadosCompartilhados:
//           "A DROV tem acesso irrestrito a base de dados. 2ª instância",
//         finalidadeCompartilhamento: "",
//       },
//       {
//         nomeInstituicao: "CPTM - GRM",
//         dadosCompartilhados: "Tratativas do processo de manifestação",
//         finalidadeCompartilhamento: "",
//       },
//       {
//         nomeInstituicao: "CPTM - GPN",
//         dadosCompartilhados: "Tratativas do processo de manifestação",
//         finalidadeCompartilhamento: "",
//       },
//       {
//         nomeInstituicao: "CPTM - GRJ",
//         dadosCompartilhados: "Exercício de direito em processo judicial",
//         finalidadeCompartilhamento: "",
//       },
//       {
//         nomeInstituicao: "CPTM - DPRG",
//         dadosCompartilhados: "Assuntos relacionados à território",
//         finalidadeCompartilhamento: "",
//       },
//       {
//         nomeInstituicao: "CPTM - DOSV",
//         dadosCompartilhados: "Assuntos relacionados à pessoas desaparecidas",
//         finalidadeCompartilhamento: "",
//       },
//     ],
//     medidasSegurancaPrivacidade: [
//       {
//         tipo: tipoMedidaSegurancaPrivacidade.controleAcessoPrivacidade,
//         descricaoControles: "",
//       },
//       {
//         tipo: tipoMedidaSegurancaPrivacidade.controlesSeguranceRedeFisicaAmbiente,
//         descricaoControles: "",
//       },
//       {
//         tipo: tipoMedidaSegurancaPrivacidade.copiaSeguranca,
//         descricaoControles: "",
//       },
//       {
//         tipo: tipoMedidaSegurancaPrivacidade.controlesAcessoLógico,
//         descricaoControles: "",
//       },
//     ],
//     transferenciaInternacional: [],
//     contratoServicosTITratamentoDados: [],
//     riscosPrivacidade: [
//       { tipoRisco: tipoRiscoPrivacidade.acessoNaoAutorizado, observacoes: "" },
//       {
//         tipoRisco: tipoRiscoPrivacidade.colecaoExcessiva,
//         observacoes:
//           "dados excessivos como mídias sociais, raça, sexo e nascimento",
//       },
//       {
//         tipoRisco: tipoRiscoPrivacidade.compartilharDistribuirSemConsentimento,
//         observacoes:
//           "terceiros ou cptm fazendo o cadastro podem tirar uma foto do formulário",
//       },
//       {
//         tipoRisco: tipoRiscoPrivacidade.retencaoProlongadaSemNecessidade,
//         observacoes: "",
//       },
//       {
//         tipoRisco: tipoRiscoPrivacidade.tratamentoSemConsentimento,
//         observacoes: "sexo e data de nascimento para fins de mkt por exemplo",
//       },
//     ],
//     observacoesProcesso: [
//       {
//         descricaoObs:
//           "GA centraliza as manifestações\n rever necessidade de solicitar mídia sociais\n 16.758/2018 - obrigatória identificação sobre cor ou indentificação racial - banco de dados",
//       },
//     ],
//   },
// ];

/**
 * Service Methods
 */
export const findAll = async (): Promise<CaseItemObject[]> => {
  let allStoredCases;
  try {
    allStoredCases = await FullCaseObjectModel.find({});
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  const reducedCases: CaseItemObject[] = allStoredCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => reduceCaseObject(c));

  return reducedCases;
};

export const find = async (id: string): Promise<FullCaseObject | null> => {
  let foundCase;

  try {
    foundCase = await FullCaseObjectModel.findById(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundCase) {
    return null;
  }

  return foundCase.toObject({ getters: true });
};

export const findByUser = async (
  userCode: string
): Promise<CaseItemObject[]> => {
  let foundCases;

  try {
    foundCases = await FullCaseObjectModel.find({
      "criador.userCode": userCode,
    });
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!foundCases || foundCases.length === 0) {
    throw new TypeError("Nenhum caso encontrado para este usuário!");
  }

  return foundCases
    .map((c) => c.toObject({ getters: true }))
    .map((c) => reduceCaseObject(c));
};

export const create = async (
  receivedCase: FullCaseObject
): Promise<FullCaseObject> => {
  const id = uuidv4();

  const newCase = new FullCaseObjectModel({ ...receivedCase });

  let newCaseUser;

  try {
    newCaseUser = await UserModel.findById(newCase.criador);
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  if (!newCaseUser) {
    throw new Error("Não foi encontrado um usuário com o id fornecido!");
  }

  console.log(newCaseUser);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newCase.save({ session: session });
    newCaseUser.cases.push(newCase._id);
    await newCase.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return newCase.toObject({ getters: true });
};

export const update = async (
  id: string,
  caseUpdate: FullCaseObject
): Promise<FullCaseObject | null> => {
  let updatedCase;

  try {
    updatedCase = await FullCaseObjectModel.findByIdAndUpdate(id, caseUpdate);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!updatedCase) {
    return null;
  }

  try {
    await updatedCase.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return updatedCase.toObject({ getters: true });
};

export const remove = async (id: string): Promise<null | FullCaseObject> => {
  let caseToRemove;

  try {
    caseToRemove = await FullCaseObjectModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Não foi possível recuperar dados da base");
  }

  if (!caseToRemove) {
    return null;
  }

  try {
    await caseToRemove.save();
  } catch (error) {
    throw new Error("Erro na conexão de banco de dados");
  }

  return caseToRemove.toObject({ getters: true });
};
