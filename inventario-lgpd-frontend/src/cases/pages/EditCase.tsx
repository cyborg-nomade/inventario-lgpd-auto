import React from "react";
import { useParams } from "react-router-dom";
import {
  emptyAgenteTratamento,
  emptyItemCategoriaDadosPessoais,
  emptyItemCategoriaTitulares,
  FullCaseObject,
  hipotesesTratamento,
} from "../../shared/models/FullCase.model";
import CaseForm from "./CaseForm";

const EditCase = () => {
  const cid = useParams().cid || 0;

  const testItem: FullCaseObject = {
    nome: "test1",
    id: 13213131,
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
  };

  const submitFormHandler = (item: FullCaseObject) => {
    console.log(item);
  };

  const deleteFormHandler = (itemId: number) => {
    console.log(itemId);
  };

  return (
    <CaseForm
      item={testItem}
      edit={true}
      onSubmit={submitFormHandler}
      onDelete={deleteFormHandler}
    />
  );
};

export default EditCase;
