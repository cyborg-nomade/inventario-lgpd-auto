import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, getIn, FieldArray } from "formik";
// import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import {
  emptyItemCategoriaDadosPessoais,
  emptyItemCategoriaTitulares,
  emptyItemCompatilhamentoDados,
  emptyItemContratoTI,
  emptyItemMedidaSegurancaPrivacidade,
  emptyItemObservacoesProcesso,
  emptyItemRiscoPrivacidade,
  emptyItemTransferenciaInternacional,
  BaseFullCaseObject,
  verbosTratamento,
} from "../../shared/models/cases.model";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TagPicker from "../../shared/components/UI/TagPicker";
import Section6FormRow from "./form-items/Section6FormRow";
import Section7FormRow from "./form-items/Section7FormRow";
import Section10FormRow from "./form-items/Section10FormRow";
import Section11FormRow from "./form-items/Section11FormRow";
import Section12FormRow from "./form-items/Section12FormRow";
import Section13FormRow from "./form-items/Section13FormRow";
import Section14FormRow from "./form-items/Section14FormRow";
import Section15FormRow from "./form-items/Section15FormRow";
import Section16FormRow from "./form-items/Section16FormRow";

type onSubmitFn = (item: BaseFullCaseObject) => void;

// const schema = yup.object().shape({
//   nome: yup.string().required(),
//   id: yup.number().required(),
//   ref: yup.string().required(),
//   dataCriacao: yup.date().required(),
//   dataAtualizacao: yup.date().required(),
//   controlador: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   encarregado: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   extensaoEncarregado: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().required(),
//     telefone: yup.string().required(),
//     email: yup.string().email().required(),
//   }),
//   areaTratamentoDados: yup.object().shape({
//     nome: yup.string().optional(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   operador: yup.object().shape({
//     nome: yup.string().required(),
//     area: yup.string().optional(),
//     telefone: yup.string().optional(),
//     email: yup.string().email().optional(),
//   }),
//   fasesCicloTratamento: yup.object({
//     coleta: yup.boolean(),
//     retencao: yup.boolean(),
//     processamento: yup.boolean(),
//     compartilhamento: yup.boolean(),
//     eliminacao: yup.boolean(),
//     verbos: yup.array().optional(),
//   }),
//   descricaoFluxoTratamento: yup.string().required(),
//   abrangenciaGeografica: yup.string().required(),
//   fonteDados: yup.string().required(),
//   finalidadeTratamento: yup.object().shape({
//     hipoteseTratamento: yup.string().required(),
//     descricaoFinalidade: yup.string().required(),
//     previsaoLegal: yup.string().required(),
//     resultadosTitular: yup.string().required(),
//     beneficiosEsperados: yup.string().required(),
//   }),
//   categoriaDadosPessoais: yup.object().shape({
//     identificacao: yup.object().shape({
//       idPessoal: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       idGov: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       idEletronica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       locEletronica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     financeiros: yup.object().shape({
//       idFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       recursosFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       dividasDespesas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       solvencia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       emprestimosHipotecaCredito: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       assistenciaFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       apoliceSeguro: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       planoPensao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       transacaoFin: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       compensacao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       atividadeProfissional: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       acordosAjustes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       autorizacoesConsentimentos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     caracteristicas: yup.object().shape({
//       detalhesPessoais: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       detalhesMilitares: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       situacaoImigracao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       descricaoFisica: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     habitos: yup.object().shape({
//       habitos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       estiloVida: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       viagensDeslocamento: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       contatosSociais: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       posses: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       denunciasIncidentesAcidentes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       distincoes: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       usoMidia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     caracteristicasPsicologicas: yup.object().shape({
//       descricaoPsi: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     composicaoFamiliar: yup.object().shape({
//       casamentoCoabitacao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       historicoConjugal: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       membrosFamilia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     interessesLazer: yup.object().shape({
//       atividadesInteressesLaz: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     associacoes: yup.object().shape({
//       outrasAssociacoesNaoSensiveis: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     processoJudAdmCrim: yup.object().shape({
//       suspeitas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       condenacoesSentencas: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       acoesJud: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       penalidadesAdm: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     habitosConsumo: yup.object().shape({
//       dadosBensServicos: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     residenciais: yup.object().shape({
//       dadosResidencia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     educacaoTreinamento: yup.object().shape({
//       academicosEscolares: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       registroFinanceiro: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       qualificacaoExperienciaProf: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     profissaoEmprego: yup.object().shape({
//       empregoAtual: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       recrutamento: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       rescisao: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       carreira: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       absenteismoDisciplina: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       avaliacaoDesempenho: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     regVideoImgVoz: yup.object().shape({
//       videoImagem: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       imagemVigilancia: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//       voz: yup.object().shape({
//         descricao: yup.string().required(),
//         tempoRetencao: yup.string().optional(),
//         fonteRetencao: yup.string().optional(),
//         caminhoRedeSistema: yup.string().optional(),
//       }),
//     }),
//     outros: yup.object().shape({
//       outros: yup.array(),
//     }),
//   }),
//   categoriaDadosPessoaisSensiveis: yup.object().shape({
//     origemRacialEtnica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     conviccaoReligiosa: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     opiniaoPolitica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoSindicato: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoOrganizacaoReligiosa: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoCrencaFilosofica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     filiacaoPreferenciaPolitica: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     saudeVidaSexual: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     geneticos: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//     biometricos: yup.object().shape({
//       descricao: yup.string().required(),
//       tempoRetencao: yup.string().optional(),
//       fonteRetencao: yup.string().optional(),
//       caminhoRedeSistema: yup.string().optional(),
//     }),
//   }),
//   frequenciaTratamento: yup.string().required(),
//   quantidadeDadosTratados: yup.string().required(),
//   categoriasTitulares: yup.object().shape({
//     categorias: yup
//       .array()
//       .required()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//     criancasAdolescentes: yup
//       .array()
//       .optional()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//     outrosGruposVulneraveis: yup
//       .array()
//       .optional()
//       .of(
//         yup.object().shape({
//           tipoCategoria: yup.string().required(),
//           descricao: yup.string().optional(),
//         })
//       ),
//   }),
//   compartilhamentoDadosPessoais: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         nomeInstituicao: yup.string().required(),
//         dadosCompartilhados: yup.string().optional(),
//         finalidadeCompartilhamento: yup.string().optional(),
//       })
//     ),
//   medidasSegurancaPrivacidade: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         tipo: yup.string().required(),
//         descricaoControles: yup.string().optional(),
//       })
//     ),
//   transferenciaInternacional: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         nomeOrganizacao: yup.string().required(),
//         pais: yup.string().required(),
//         dadosTransferidos: yup.string().required(),
//         tipoGarantia: yup.string().required(),
//       })
//     ),
//   contratoServicosTITratamentoDados: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         numeroContrato: yup.string().required(),
//         numeroProcessoContratacao: yup.string().optional(),
//         objetoContrato: yup.string().required(),
//         emailGestorContrato: yup.string().required(),
//       })
//     ),
//   riscosPrivacidade: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         tipoRisco: yup.string().required(),
//         observacoes: yup.string().optional(),
//       })
//     ),
//   observacoesProcesso: yup
//     .array()
//     .optional()
//     .of(
//       yup.object().shape({
//         descricaoObs: yup.string().required(),
//       })
//     ),
// });

const CaseForm = (props: {
  item: BaseFullCaseObject;
  new?: boolean;
  edit?: boolean;
  approve?: boolean;
  onSubmit: onSubmitFn;
}) => {
  const [isEditing, setIsEditing] = useState(props.new || false);
  const [showModal, setShowModal] = useState(false);

  const { token } = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let navigate = useNavigate();
  const cid = useParams().cid || "";

  const onStartEditing = () => {
    setIsEditing(true);
  };
  const onCancel = () => {
    navigate(`/`);
  };
  const onDelete = async (itemId: string) => {
    console.log(itemId);

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_CONNSTR}/cases/${itemId}`,
        "DELETE",
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );

      console.log(responseData);
      navigate(`/`);
    } catch (err) {
      console.log(err);
      handleCloseModal();
    }
  };

  const handleShowDeleteModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <Row className="justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Remover Registro!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voc?? est?? prestes a deletar o registro {props.item.nome}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => onDelete(cid)}>
            Prosseguir com Remo????o
          </Button>
        </Modal.Footer>
      </Modal>
      {error && (
        <Alert variant="danger" onClose={clearError} dismissible>
          Ocorreu um erro: {error}
        </Alert>
      )}
      <Formik
        // validationSchema={schema}
        enableReinitialize={true}
        onSubmit={props.onSubmit!}
        initialValues={props.item}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Identifica????o</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik01">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="nome"
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nome && !errors.nome}
                        isInvalid={!!errors.nome}
                      />
                      <Form.Text className="text-muted">
                        Informar nome do servi??o ofertado ?? sociedade ou nome do
                        processo de neg??cio que realiza tratamento dos dados
                        pessoais. Exemplo: Avalia????es de Alimentos; Cancelamento
                        e Renova????o de Registros de Alimentos; e etc..
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik02">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="ref"
                        value={values.ref}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.ref && !errors.ref}
                        isInvalid={!!errors.ref}
                      />
                      <Form.Text className="text-muted">
                        Digite o N??mero ou um ID para identifica????o da atividade
                        de tratamento de dados pessoais relacionada ao servi??o /
                        processo de neg??cio. Exemplo de N??mero de Refer??ncia:
                        0001. 0002 e etc. Exemplo de ID adotando Sigla do
                        Servi??o informado no campo "Nome do servi??o/ Processo de
                        Neg??cio: AVA, CRRA e etc.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik03">
                      <Form.Label>Data de Cria????o do Invent??rio</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="date"
                        name="dataCriacao"
                        value={values.dataCriacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataCriacao && !errors.dataCriacao}
                        isInvalid={!!errors.dataCriacao}
                      />
                      <Form.Text className="text-muted">
                        Informar data de cria????o do invent??rio de dados
                        pessoais.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Informe uma data v??lida
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationFormik04">
                      <Form.Label>Data Atualiza????o do Invent??rio</Form.Label>
                      <Form.Control
                        disabled={!isEditing}
                        type="date"
                        name="dataAtualizacao"
                        value={values.dataAtualizacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.dataAtualizacao && !errors.dataAtualizacao
                        }
                        isInvalid={!!errors.dataAtualizacao}
                      />
                      <Form.Text className="text-muted">
                        Informar data da ??ltima atualiza????o do invent??rio.
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Informe uma data v??lida
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Agentes de Tratamento e Encarregado
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Nome</Form.Label>
                    <Form.Label as={Col}>??rea</Form.Label>
                    <Form.Label as={Col}>Telefone</Form.Label>
                    <Form.Label as={Col}>E-mail</Form.Label>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa natural ou jur??dica, de direito p??blico ou
                            privado, a quem competem as decis??es referentes ao
                            tratamento de dados pessoais (LGPD, art. 5??, IV).
                            Informar o nome do ??rg??o ou entidade.
                          </Tooltip>
                        }
                      >
                        <Form.Label>Controlador</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="controlador.nome"
                        value={values.controlador.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "controlador.nome") &&
                          !getIn(errors, "controlador.nome")
                        }
                        isInvalid={!!getIn(errors, "controlador.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunica????o entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Prote????o de Dados - ANPD (LGPD, art. 5??, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Encarregado</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="encarregado.nome"
                        value={values.encarregado.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "encarregado.nome") &&
                          !getIn(errors, "encarregado.nome")
                        }
                        isInvalid={!!getIn(errors, "encarregado.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunica????o entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Prote????o de Dados - ANPD (LGPD, art. 5??, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Extens??o Encarregado</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="extensaoEncarregado.nome"
                        value={values.extensaoEncarregado.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.nome") &&
                          !getIn(errors, "extensaoEncarregado.nome")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="extensaoEncarregado.area"
                        value={values.extensaoEncarregado.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.area") &&
                          !getIn(errors, "extensaoEncarregado.area")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.area")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="tel"
                        name="extensaoEncarregado.telefone"
                        value={values.extensaoEncarregado.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.telefone") &&
                          !getIn(errors, "extensaoEncarregado.telefone")
                        }
                        isInvalid={
                          !!getIn(errors, "extensaoEncarregado.telefone")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="email"
                        name="extensaoEncarregado.email"
                        value={values.extensaoEncarregado.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "extensaoEncarregado.email") &&
                          !getIn(errors, "extensaoEncarregado.email")
                        }
                        isInvalid={!!getIn(errors, "extensaoEncarregado.email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Utilize um e-mail v??lido.
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa indicada pelo controlador e operador para
                            atuar como canal de comunica????o entre o controlador,
                            os titulares dos dados e a Autoridade Nacional de
                            Prote????o de Dados - ANPD (LGPD, art. 5??, VIII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>??rea Tratamento Dados</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="areaTratamentoDados.nome"
                        value={values.areaTratamentoDados.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.nome") &&
                          !getIn(errors, "areaTratamentoDados.nome")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="areaTratamentoDados.area"
                        value={values.areaTratamentoDados.area}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.area") &&
                          !getIn(errors, "areaTratamentoDados.area")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.area")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="tel"
                        name="areaTratamentoDados.telefone"
                        value={values.areaTratamentoDados.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.telefone") &&
                          !getIn(errors, "areaTratamentoDados.telefone")
                        }
                        isInvalid={
                          !!getIn(errors, "areaTratamentoDados.telefone")
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="email"
                        name="areaTratamentoDados.email"
                        value={values.areaTratamentoDados.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "areaTratamentoDados.email") &&
                          !getIn(errors, "areaTratamentoDados.email")
                        }
                        isInvalid={!!getIn(errors, "areaTratamentoDados.email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Utilize um e-mail v??lido
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Pessoa natural ou jur??dica, de direito p??blico ou
                            privado, que realiza o tratamento de dados pessoais
                            em nome do controlador; (LGPD, art. 5??, VII)
                          </Tooltip>
                        }
                      >
                        <Form.Label>Operador</Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="operador.nome"
                        value={values.operador.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          getIn(touched, "operador.nome") &&
                          !getIn(errors, "operador.nome")
                        }
                        isInvalid={!!getIn(errors, "operador.nome")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                    <Col>
                      <Form.Control disabled />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Fases do Ciclo de Vida do Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Coleta</Form.Label>
                    <Form.Label as={Col}>Reten????o</Form.Label>
                    <Form.Label as={Col}>Processamento</Form.Label>
                    <Form.Label as={Col}>Compartilhamento</Form.Label>
                    <Form.Label as={Col}>Elimina????o</Form.Label>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip className="text-muted">
                            Informa????es sobre o ciclo de vida do tratamento de
                            dados pessoais podem ser observadas no cap??tulo 3 do
                            Guia de Boas Pr??ticas LGPD, dispon??vel em
                            https://www.gov.br/governodigital/pt-br/governanca-de-dados/guia-de-boas-praticas-lei-geral-de-protecao-de-dados-lgpd
                          </Tooltip>
                        }
                      >
                        <Form.Label>
                          Em qual fase do ciclo de vida o Operador atua?
                        </Form.Label>
                      </OverlayTrigger>
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.coleta"
                        name="fasesCicloTratamento.coleta"
                        checked={values.fasesCicloTratamento.coleta}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.retencao"
                        name="fasesCicloTratamento.retencao"
                        checked={values.fasesCicloTratamento.retencao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.processamento"
                        name="fasesCicloTratamento.processamento"
                        checked={values.fasesCicloTratamento.processamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.compartilhamento"
                        name="fasesCicloTratamento.compartilhamento"
                        checked={values.fasesCicloTratamento.compartilhamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <Form.Check
                        disabled={!isEditing}
                        type="checkbox"
                        id="fasesCicloTratamento.eliminacao"
                        name="fasesCicloTratamento.eliminacao"
                        checked={values.fasesCicloTratamento.eliminacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Verbos de Tratamento</Form.Label>
                      <br />
                      <Form.Text className="text-muted">
                        {Object.values(verbosTratamento).map(
                          (verbo) => `${verbo}, `
                        )}
                      </Form.Text>
                    </Col>
                    <Col lg={8}>
                      <TagPicker
                        disabled={!isEditing}
                        name="fasesCicloTratamento.verbos"
                        onChange={(tags) =>
                          setFieldValue("fasesCicloTratamento.verbos", tags)
                        }
                        value={values.fasesCicloTratamento.verbos}
                      />
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Fluxo de Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Descrever como (de que forma) os dados pessoais s??o
                          coletados, retidos/armazenados, processados/ usados e
                          eliminados. Nessa se????o, pode at?? ser colocado um
                          desenho com um fluxo de dados. Abaixo, segue exemplo
                          de descri????o do fluxo de dados.
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>Descri????o do Fluxo</Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        as="textarea"
                        rows={5}
                        type="text"
                        name="descricaoFluxoTratamento"
                        value={values.descricaoFluxoTratamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.descricaoFluxoTratamento &&
                          !errors.descricaoFluxoTratamento
                        }
                        isInvalid={!!errors.descricaoFluxoTratamento}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Escopo e Natureza dos Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Form.Label as={Col}>
                      Abrang??ncia da ??rea geogr??fica do tratamento
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="abrangenciaGeografica"
                        value={values.abrangenciaGeografica}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.abrangenciaGeografica &&
                          !errors.abrangenciaGeografica
                        }
                        isInvalid={!!errors.abrangenciaGeografica}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label as={Col}>
                      Fonte de dados utilizada para obten????o dos dados pessoais
                    </Form.Label>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="fonteDados"
                        value={values.fonteDados}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.fonteDados && !errors.fonteDados}
                        isInvalid={!!errors.fonteDados}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  Finalidade do Tratamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Section6FormRow
                    label="Hip??tese de Tratamento"
                    tooltip={
                      <p>
                        As hip??teses de tratamento est??o descritas nos arts. 7??
                        e 11 da LGPD.
                        <br />
                        <b>
                          Os ??rg??os e entidades da administra????o p??blica tem a
                          prerrogativa de tratar os dados pessoais para o
                          exerc??cio de suas compet??ncias legais ou execu????o de
                          pol??ticas p??blicas sem a necessidade de obter
                          consentimento do titular dos dados pessoais.
                        </b>
                      </p>
                    }
                    disabled={!isEditing}
                    name="finalidadeTratamento.hipoteseTratamento"
                    type="select"
                    invalid="Esse campo ?? obrigat??rio"
                  />
                  <Section6FormRow
                    label="Finalidade"
                    tooltip={
                      <p>
                        Raz??o ou motivo pela qual se deseja tratar os dados
                        pessoais. ?? important??ssimo estabelecer claramente a
                        finalidade, pois ?? ela que justifica o tratamento de
                        dados pessoais e fornece os elementos para informar o
                        titular dos dados.
                      </p>
                    }
                    disabled={!isEditing}
                    name="finalidadeTratamento.descricaoFinalidade"
                    type="text"
                    invalid="Esse campo ?? obrigat??rio"
                  />
                  <Section6FormRow
                    label="Previs??o legal"
                    tooltip={
                      <p>
                        Informar Lei, Decreto, normativo ou regulamento que
                        respalda a finalidade do tratamento de dados pessoais
                        realizado.
                        <br />
                        <br />
                        <b>
                          Exemplo f??cit??cio de previs??o legal considerando o
                          Programa de Localiza????o de Desaparecidos:
                        </b>
                        <br />??? Decreto n?? 8.956, de 25 de janeiro de 2218,
                        institui o Programa de Localiza????o de Desaparecidos.
                      </p>
                    }
                    disabled={!isEditing}
                    name="finalidadeTratamento.previsaoLegal"
                    type="text"
                    invalid="Esse campo ?? obrigat??rio"
                  />
                  <Section6FormRow
                    label="Resultados pretendidos para o titular de dados"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="finalidadeTratamento.resultadosTitular"
                    type="text"
                    invalid="Esse campo ?? obrigat??rio"
                  />
                  <Section6FormRow
                    label="Benef??cios esperados para o ??rg??o, entidade ou para a
                    sociedade como um todo"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="finalidadeTratamento.beneficiosEsperados"
                    type="text"
                    invalid="Esse campo ?? obrigat??rio"
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Categoria de Dados Pessoais</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="60">
                      <Accordion.Header>
                        Dados de Identifica????o Pessoal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Informa????es de identifica????o pessoal"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Nome, endere??o
                              residencia, hist??rico de endere??os anteriores,
                              n??mero de telefone fixo residencial, n??mero
                              celular pessoal, e-mail pessoal, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idPessoal"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Informa????es de identifica????o atribu??das por
                            institui????es governamentais"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: CPF, RG, n??mero
                              do passaporte, n??mero da carteira de motorista,
                              n??mero da placa, n??mero de registro em conselho
                              profissional, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idGov"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de identifica????o eletr??nica"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Endere??os IP,
                              cookies, momentos de conex??o etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.idEletronica"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Dados de localiza????o eletr??nica"
                          tooltip={
                            <p>
                              Informar se s??o tratados dados: dados de
                              comunica????o de torres de celulares (ex: GSM),
                              dados de GPS etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.identificacao.locEletronica"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="61">
                      <Accordion.Header>Dados Financeiros</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de identifica????o financeira"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: N??meros de
                              identifica????o, n??meros de contas banc??rias,
                              n??meros de cart??es de cr??dito ou d??bito, c??digos
                              secretos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.idFin"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Recursos financeiros"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Renda, posses,
                              investimentos, renda total, renda profissional,
                              poupan??a, datas de in??cio e t??rmino dos
                              investimentos, receita de investimento, d??vidas
                              sobre ativos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.recursosFin"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="D??vidas e despesas"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Total de
                              despesas, aluguel, empr??stimos, hipotecas e outras
                              formas de cr??dito.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.dividasDespesas"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Situa????o financeira (Solv??ncia)"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Avalia????o do
                              rendimento e avalia????o de capacidade de pagamento.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.solvencia"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Empr??stimos, hipotecas, linhas de cr??dito"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Natureza do
                              empr??stimo, valor emprestado, saldo remanescente,
                              data de in??cio, per??odo do empr??stimo, taxa de
                              juros, vis??o geral do pagamento, detalhes sobre as
                              garantias.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.emprestimosHipotecaCredito"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Assist??ncia financeira"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Benef??cios,
                              assist??ncia, bonifica????es, subs??dios, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.assistenciaFin"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Detalhes da ap??lice de seguro"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Natureza da
                              ap??lice de seguro, detalhes sobre os riscos
                              cobertos, valores segurados, per??odo segurado,
                              data de rescis??o, pagamentos feitos, recebidos ou
                              perdidos, situa????o do contrato, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.apoliceSeguro"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Detalhes do plano de pens??o"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Data efetiva do
                              plano de pens??o, natureza do plano, data de
                              t??rmino do plano, pagamentos recebidos e
                              efetuados, op????es, benefici??rios, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.planoPensao"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Transa????es financeiras"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Valores pagos e a
                              pagar pelo titular dos dados, linhas de cr??dito
                              concedidas, avais, forma de pagamento, vis??o geral
                              do pagamento, dep??sitos e outras garantias, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.transacaoFin"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Compensa????o"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Detalhes sobre
                              compensa????es reivindicadas, valores pagos ou
                              outros tipos de compensa????o, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.compensacao"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Atividades profissionais"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dado de atividades
                              profissionais executadas pelo titular dos dados:
                              natureza da atividade, natureza dos bens ou
                              servi??os utilizados ou entregues pela pessoa no
                              registro, rela????es comerciais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.atividadeProfissional"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Acordos e ajustes"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Detalhes sobre
                              acordos ou ajustes comerciais; acordos sobre
                              representa????o ou acordos legais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.acordosAjustes"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Autoriza????es ou consentimentos"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados de: Autoriza????es
                              ou consentimentos realizados pelo titular de
                              dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.financeiros.autorizacoesConsentimentos"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="62">
                      <Accordion.Header>
                        Caracter??sticas Pessoais
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Detalhes pessoais"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Idade, sexo, data
                              de nascimento, local de nascimento, estado civil,
                              nacionalidade.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.detalhesPessoais"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Detalhes militares"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Situa????o militar,
                              patente militar, distin????es militares, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.detalhesMilitares"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Situa????o de Imigra????o"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Detalhes sobre o
                              visto, autoriza????o de trabalho, limita????es de
                              resid??ncia ou movimenta????o, condi????es especiais
                              relacionadas ?? autoriza????o de resid??ncia, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.situacaoImigracao"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Descri????o F??sica"
                          tooltip={
                            <p>
                              Dados de descri????o f??sica s??o informa????es f??sicas
                              de uma pessoa com possibilidade de serem
                              visivelmente indetificadas. Descrever se s??o
                              tratados: Altura, peso, cor do cabelo, cor dos
                              olhos, caracter??sticas distintivas, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.caracteristicas.descricaoFisica"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="63">
                      <Accordion.Header>H??bitos Pessoais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="H??bitos"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Uso de tabaco,
                              uso de ??lcool , h??bito alimentar, dieta alimentar
                              etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.habitos"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Estilo de vida"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Informa????es sobre
                              o uso de bens ou servi??os, comportamento dos
                              titulares dos dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.estiloVida"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Viagens e deslocamentos"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: sobre antigas
                              resid??ncias e deslocamentos, visto de viagem,
                              autoriza????es de trabalho, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.viagensDeslocamento"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Contatos sociais"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Amigos, parceiros
                              de neg??cios, relacionamentos com pessoas que n??o
                              sejam familiares pr??ximos; etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.contatosSociais"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Posses"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Terra,
                              propriedade ou outros bens.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.posses"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Den??ncias, incidentes ou acidentes"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Informa????es sobre
                              um acidente, incidente ou den??ncia na qual o
                              titular dos dados est?? envolvido, a natureza dos
                              danos ou ferimentos, pessoas envolvidas,
                              testemunhas, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.denunciasIncidentesAcidentes"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Distin????es"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Distin????es civis,
                              administrativas ou militares.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.distincoes"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Uso de m??dia"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: que definem o
                              comportamento de uso de m??dias e meios de
                              comunica????o.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.usoMidia"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="64">
                      <Accordion.Header>
                        Caracter??sticas Psicol??gicas
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Descri????o Psicol??gica"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre
                              personalidade ou car??ter.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitos.distincoes"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="65">
                      <Accordion.Header>Composi????o Familiar</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Casamento ou forma atual de coabita????o"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados: Nome do c??njuge
                              ou companheiro(a), nome de solteira do c??njuge ou
                              companheira, data do casamento, data do contrato
                              de coabita????o, n??mero de filhos, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.casamentoCoabitacao"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Hist??rico conjugal"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre casamentos
                              ou parcerias anteriores, div??rcios, separa????es,
                              nomes de parceiros anteriores.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.historicoConjugal"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Familiares ou membros da fam??lia"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre Detalhes de
                              outros familiares ou membros da fam??lia do titular
                              de dados.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.composicaoFamiliar.membrosFamilia"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="66">
                      <Accordion.Header>Interesses de lazer</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Atividades e interesses de lazer"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre hobbies,
                              esportes, outros interesses.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.interessesLazer.atividadesInteressesLaz"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="67">
                      <Accordion.Header>Associa????es</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Associa????es (exceto profissionais, pol??ticas, em sindicatos ou qualquer outra associa????o que se enquadre em dados pessoais sens??veis)"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre participa????o
                              em organiza????es de caridade ou benevolentes,
                              clubes, parcerias, organiza????es, grupos, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.associacoes.outrasAssociacoesNaoSensiveis"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="68">
                      <Accordion.Header>
                        Processo Judicial/Administrativo/Criminal
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Suspeitas"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre suspeitas de
                              viola????es, conex??es conspirat??rias com criminosos
                              conhecidos. Inqu??ritos ou a????es judiciais (civis
                              ou criminais) empreendidas por ou contra o titular
                              dos dados, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.suspeitas"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Condena????es e senten??as"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre condena????es
                              e senten??as, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.condenacoesSentencas"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="A????es judiciais"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre tutela,
                              guarda tempor??ria ou definitiva, interdi????o,
                              ado????o, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.acoesJud"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Penalidades Administrativas"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre multas,
                              processo disciplinar, advert??ncias, bem como
                              qualquer outro tipo de penalidade ou san????o
                              administrativa prevista em leis, normas e
                              regulamentos.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.processoJudAdmCrim.penalidadesAdm"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="69">
                      <Accordion.Header>H??bitos de Consumo</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados de bens e servi??os"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre bens e
                              servi??os vendidos, alugados ou emprestados ao
                              titular dos dados.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.habitosConsumo.dadosBensServicos"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="610">
                      <Accordion.Header>Dados Residenciais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Resid??ncia"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre natureza da
                              resid??ncia, propriedade pr??pria ou alugada,
                              dura????o da resid??ncia nesse endere??o, aluguel,
                              custos, classifica????o da resid??ncia, detalhes
                              sobre a avalia????o, nomes das pessoas que possuem
                              as chaves.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.residenciais.dadosResidencia"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="611">
                      <Accordion.Header>
                        Educa????o e Treinamento
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Dados acad??micos/escolares"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre diplomas,
                              certificados obtidos, resultados de exames,
                              avalia????o do progresso dos estudos, hist??rico
                              escolar, grau de forma????o, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.academicosEscolares"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Registros financeiros do curso/treinamento"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre taxas de
                              inscri????o e custos pagos, financiamento, formas de
                              pagamento, registros de pagamento, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.registroFinanceiro"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Qualifica????o e experi??ncia profissional"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre
                              certifica????es profissionais, interesses
                              profissionais, interesses acad??micos, interesses
                              de pesquisam experi??ncia de ensino, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.educacaoTreinamento.qualificacaoExperienciaProf"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="612">
                      <Accordion.Header>Profiss??o e emprego</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Emprego atual"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre empregador,
                              descri????o do cargo e fun????o, antiguidade, data de
                              recrutamento, local de trabalho, especializa????o ou
                              tipo de empresa, modos e condi????es de trabalho,
                              cargos anteriores e experi??ncia anterior de
                              trabalho no mesmo empregador, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.empregoAtual"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Recrutamento"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre data de
                              recrutamento, m??todo de recrutamento, fonte de
                              recrutamento, refer??ncias, detalhes relacionados
                              com o per??odo de est??gio, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.recrutamento"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Rescis??o de trabalho"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre data de
                              rescis??o, motivo, per??odo de notifica????o,
                              condi????es de rescis??o, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.rescisao"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Carreira"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre emprego
                              anterior e empregadores, per??odos sem emprego,
                              servi??o militar, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.carreira"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Absentismo e disciplina"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre registos de
                              absentismo, motivos de aus??ncia, medidas
                              disciplinares, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.absenteismoDisciplina"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Avalia????o de Desempenho"
                          tooltip={
                            <p>
                              Descrever se s??o tratados dados sobre avalia????o de
                              desempenho ou qualquer outro tipo de an??lise de
                              qualifica????o ou habilidades profissionais, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.profissaoEmprego.avaliacaoDesempenho"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="613">
                      <Accordion.Header>
                        Registros/grava????es de v??deo, imagem e voz
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="V??deo e imagem"
                          tooltip={
                            <p>
                              Descrever se s??o tratados arquivos de v??deos,
                              fotos digitais, fitas de v??deo, etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.videoImagem"
                        />
                        <Section7FormRow
                          className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                          label="Imagem de Vigil??ncia"
                          tooltip={
                            <p>
                              Descrever se s??o tratadas imagens e/ou v??deos de
                              c??meras de seguran??a/vigil??ncia (ex: CFTV), etc.
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.imagemVigilancia"
                        />
                        <Section7FormRow
                          className="mb-3 pt-2 pb-2"
                          label="Voz"
                          tooltip={
                            <p>
                              Descrever se s??o tratadas fitas e arquivos
                              digitais de voz, bem como outros registros de
                              grava????es de voz , etc
                            </p>
                          }
                          disabled={!isEditing}
                          name="categoriaDadosPessoais.regVideoImgVoz.voz"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="614">
                      <Accordion.Header>Outros</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                          <Form.Label as={Col}>
                            Tempo Reten????o dos Dados
                          </Form.Label>
                          <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                          <Form.Label as={Col}>
                            Caminho Rede e/ou Sistema CPTM
                          </Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriaDadosPessoais.outros.outros"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriaDadosPessoais.outros.outros &&
                              values.categoriaDadosPessoais.outros.outros
                                .length > 0 ? (
                                values.categoriaDadosPessoais.outros.outros.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section7FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label="Outros (Especificar)"
                                        tooltip={<React.Fragment />}
                                        disabled={!isEditing}
                                        name={`categoriaDadosPessoais.outros.outros[${index}]`}
                                      />
                                      <Row className="justify-content-center">
                                        <ButtonGroup
                                          as={Col}
                                          className="mt-1 mb-3"
                                          lg={2}
                                        >
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              arrayHelpers.push(
                                                emptyItemCategoriaDadosPessoais()
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </Button>
                                        </ButtonGroup>
                                      </Row>
                                    </React.Fragment>
                                  )
                                )
                              ) : (
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCategoriaDadosPessoais()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              )}
                            </React.Fragment>
                          )}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>
                  Categorias de Dados Pessoais Sens??veis
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>Descri????o</Form.Label>
                    <Form.Label as={Col}>Tempo Reten????o dos Dados</Form.Label>
                    <Form.Label as={Col}>Fonte Reten????o</Form.Label>
                    <Form.Label as={Col}>
                      Caminho Rede e/ou Sistema CPTM
                    </Form.Label>
                  </Row>
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam origem racial ou ??tnica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.origemRacialEtnica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam convic????o religiosa"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.conviccaoReligiosa"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam opini??o pol??tica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.opiniaoPolitica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filia????o a sindicato"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoSindicato"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filia????o a organiza????o de car??ter religioso"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoOrganizacaoReligiosa"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados que revelam filia????o ou cren??a filos??fica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoCrencaFilosofica"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados que revelam filia????o ou prefer??ncias pol??tica"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.filiacaoPreferenciaPolitica"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados referentes ?? sa??de ou ?? vida sexual"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.saudeVidaSexual"
                  />
                  <Section7FormRow
                    className="mb-3 pt-2 pb-2"
                    label="Dados gen??ticos"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.geneticos"
                  />
                  <Section7FormRow
                    className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2"
                    label="Dados biom??tricos"
                    tooltip={<React.Fragment />}
                    disabled={!isEditing}
                    name="categoriaDadosPessoaisSensiveis.biometricos"
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>
                  Frequ??ncia e totaliza????o das categorias de dados pessoais
                  tratados
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Descrever em que frequ??ncia os dados s??o tratados.
                          Isso representa a disponibilidade e hor??rio de
                          funcionamento do sistema automatizado ou processo
                          manual que trata os dados pessoais. Abaixo segue
                          exemplo fict??cio de descri????o do Sistema Nacional de
                          Desaparecidos -SND a ser preenchido no invent??rio.
                          <br />
                          <br />
                          <b>Exemplo:</b> O SND est?? dispon??vel no regime 24x7
                          (24 horas por dia nos 7 dias da semana) para
                          comunica????o (coleta) dos dados do desaparecimentos e
                          as demais fases e opera????es de tratamento s??o
                          realizadas no hor??rio comercial em dias ??teis.
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>
                        Frequ??ncia de tratamento dos dados pessoais
                      </Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="frequenciaTratamento"
                        value={values.frequenciaTratamento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.frequenciaTratamento &&
                          !errors.frequenciaTratamento
                        }
                        isInvalid={!!errors.frequenciaTratamento}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip className="text-muted">
                          Informar a quantidade total de dados pessoais e dados
                          pessoais sens??veis descritos no invet??rio.
                          <br />
                          <b>Exemplo:</b>
                          <br />
                          Tratamento de dados pessoais de detalhes pessoais como
                          Idade, sexo, data de nascimento, local de nascimento,
                          estado civil, nacionalidade.
                          <br />
                          Tratamento de dados pessoais de sa??de como CID10 e
                          data de ??ltimo exame m??dico
                          <br />A informa????o que deve ser preenchida no
                          invent??rio ??:
                          <br />
                          <b>
                            S??o tratados 6 dados pessoais e 2 dados pessoais
                            sens??veis, totalizando 8 dados pessoais tratados
                            pelo servi??o.
                          </b>
                        </Tooltip>
                      }
                    >
                      <Form.Label as={Col}>
                        Quantidade de dados pessoais e dados pessoais sens??veis
                        tratados
                      </Form.Label>
                    </OverlayTrigger>
                    <Col lg={8}>
                      <Form.Control
                        disabled={!isEditing}
                        type="text"
                        name="quantidadeDadosTratados"
                        value={values.quantidadeDadosTratados}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={
                          touched.quantidadeDadosTratados &&
                          !errors.quantidadeDadosTratados
                        }
                        isInvalid={!!errors.quantidadeDadosTratados}
                      />
                      <Form.Control.Feedback type="invalid">
                        Esse campo ?? obrigat??rio
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>
                  Categorias dos titulares de dados pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="90">
                      <Accordion.Header>Categorias gerais</Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.categorias"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares.categorias &&
                              values.categoriasTitulares.categorias.length >
                                0 ? (
                                values.categoriasTitulares.categorias.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria ${index + 1}`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.categorias[${index}]`}
                                      />
                                      <Row className="justify-content-center">
                                        <ButtonGroup
                                          as={Col}
                                          className="mt-1 mb-3"
                                          lg={2}
                                        >
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              arrayHelpers.push(
                                                emptyItemCategoriaTitulares()
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </Button>
                                        </ButtonGroup>
                                      </Row>
                                    </React.Fragment>
                                  )
                                )
                              ) : (
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCategoriaTitulares()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              )}
                            </React.Fragment>
                          )}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="91">
                      <Accordion.Header>
                        Categorias que envolvam crian??as e adolescentes
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.criancasAdolescentes"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares
                                .criancasAdolescentes &&
                              values.categoriasTitulares.criancasAdolescentes
                                .length > 0 ? (
                                values.categoriasTitulares.criancasAdolescentes.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria Crian??as e Adolescentes ${
                                          index + 1
                                        }`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.criancasAdolescentes[${index}]`}
                                      />
                                      <Row className="justify-content-center">
                                        <ButtonGroup
                                          as={Col}
                                          className="mt-1 mb-3"
                                          lg={2}
                                        >
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              arrayHelpers.push(
                                                emptyItemCategoriaTitulares()
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </Button>
                                        </ButtonGroup>
                                      </Row>
                                    </React.Fragment>
                                  )
                                )
                              ) : (
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCategoriaTitulares()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              )}
                            </React.Fragment>
                          )}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="92">
                      <Accordion.Header>
                        Categorias que envolvam outros grupos vulner??veis
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                          <Form.Label as={Col}></Form.Label>
                          <Form.Label as={Col}>Tipo de Categoria</Form.Label>
                          <Form.Label as={Col}>Descri????o</Form.Label>
                        </Row>
                        <FieldArray
                          name="categoriasTitulares.outrosGruposVulneraveis"
                          render={(arrayHelpers) => (
                            <React.Fragment>
                              {values.categoriasTitulares
                                .outrosGruposVulneraveis &&
                              values.categoriasTitulares.outrosGruposVulneraveis
                                .length > 0 ? (
                                values.categoriasTitulares.outrosGruposVulneraveis.map(
                                  (item, index) => (
                                    <React.Fragment key={index}>
                                      <Section10FormRow
                                        className={`mb-3 pt-2 pb-2 ${
                                          index % 2 === 0
                                            ? "bg-primary bg-opacity-10"
                                            : ""
                                        }`}
                                        label={`Categoria Outros Grupos Vulner??veis ${
                                          index + 1
                                        }`}
                                        disabled={!isEditing}
                                        name={`categoriasTitulares.outrosGruposVulneraveis[${index}]`}
                                      />
                                      <Row className="justify-content-center">
                                        <ButtonGroup
                                          as={Col}
                                          className="mt-1 mb-3"
                                          lg={2}
                                        >
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              arrayHelpers.push(
                                                emptyItemCategoriaTitulares()
                                              )
                                            }
                                          >
                                            +
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </Button>
                                        </ButtonGroup>
                                      </Row>
                                    </React.Fragment>
                                  )
                                )
                              ) : (
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCategoriaTitulares()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              )}
                            </React.Fragment>
                          )}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>
                  Compartilhamento de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>Nome da Institui????o</Form.Label>
                    <Form.Label as={Col}>
                      Dados pessoais compartilhados
                    </Form.Label>
                    <Form.Label as={Col}>
                      Finalidade do compartilhamento
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="compartilhamentoDadosPessoais"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.compartilhamentoDadosPessoais &&
                        values.compartilhamentoDadosPessoais.length > 0 ? (
                          values.compartilhamentoDadosPessoais.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section11FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`compartilhamentoDadosPessoais[${index}]`}
                                />
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemCompatilhamentoDados()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemCompatilhamentoDados()
                                  )
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="11">
                <Accordion.Header>
                  Medidas de Seguran??a/Privacidade
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>
                      Tipo de medida de seguran??a e privacidade
                    </Form.Label>
                    <Form.Label as={Col}>
                      Descri????o do(s) Controle(s)
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="medidasSegurancaPrivacidade"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.medidasSegurancaPrivacidade &&
                        values.medidasSegurancaPrivacidade.length > 0 ? (
                          values.medidasSegurancaPrivacidade.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section12FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  label={`Medida de Seguran??a/Privacidade ${
                                    index + 1
                                  }`}
                                  disabled={!isEditing}
                                  name={`medidasSegurancaPrivacidade[${index}]`}
                                />
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemMedidaSegurancaPrivacidade()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemMedidaSegurancaPrivacidade()
                                  )
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="12">
                <Accordion.Header>
                  Transfer??ncia Internacional de Dados Pessoais
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>
                      Nome da Organiza????o Receptora
                    </Form.Label>
                    <Form.Label as={Col}>Pa??s</Form.Label>
                    <Form.Label as={Col}>
                      Dados pessoais transferidos
                    </Form.Label>
                    <Form.Label as={Col}>
                      Tipo de garantia para transfer??ncia
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="transferenciaInternacional"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.transferenciaInternacional &&
                        values.transferenciaInternacional.length > 0 ? (
                          values.transferenciaInternacional.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section13FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`transferenciaInternacional[${index}]`}
                                />
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(
                                          emptyItemTransferenciaInternacional()
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemTransferenciaInternacional()
                                  )
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="13">
                <Accordion.Header>
                  Contrato(s) de servi??os e/ou solu????es de TI que trata(m) dados
                  pessoais do servi??o/processo de neg??cio
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>N??mero do Contrato</Form.Label>
                    <Form.Label as={Col}>N?? Processo Contrata????o</Form.Label>
                    <Form.Label as={Col}>Objeto do Contrato</Form.Label>
                    <Form.Label as={Col}>
                      E-mail do Gestor do Contrato
                    </Form.Label>
                  </Row>
                  <FieldArray
                    name="contratoServicosTITratamentoDados"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.contratoServicosTITratamentoDados &&
                        values.contratoServicosTITratamentoDados.length > 0 ? (
                          values.contratoServicosTITratamentoDados.map(
                            (item, index) => (
                              <React.Fragment key={index}>
                                <Section14FormRow
                                  className={`mb-3 pt-2 pb-2 ${
                                    index % 2 === 0
                                      ? "bg-primary bg-opacity-10"
                                      : ""
                                  }`}
                                  disabled={!isEditing}
                                  name={`contratoServicosTITratamentoDados[${index}]`}
                                />
                                <Row className="justify-content-center">
                                  <ButtonGroup
                                    as={Col}
                                    className="mt-1 mb-3"
                                    lg={2}
                                  >
                                    <Button
                                      variant="primary"
                                      onClick={() =>
                                        arrayHelpers.push(emptyItemContratoTI())
                                      }
                                    >
                                      +
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                  </ButtonGroup>
                                </Row>
                              </React.Fragment>
                            )
                          )
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(emptyItemContratoTI())
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="14">
                <Accordion.Header>Risco de Privacidade</Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}></Form.Label>
                    <Form.Label as={Col}>
                      Tipo de Risco de Privacidade
                    </Form.Label>
                    <Form.Label as={Col}>Observa????es</Form.Label>
                  </Row>
                  <FieldArray
                    name="riscosPrivacidade"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.riscosPrivacidade &&
                        values.riscosPrivacidade.length > 0 ? (
                          values.riscosPrivacidade.map((item, index) => (
                            <React.Fragment key={index}>
                              <Section15FormRow
                                className={`mb-3 pt-2 pb-2 ${
                                  index % 2 === 0
                                    ? "bg-primary bg-opacity-10"
                                    : ""
                                }`}
                                label={`Risco ${index + 1}`}
                                disabled={!isEditing}
                                name={`riscosPrivacidade[${index}]`}
                              />
                              <Row className="justify-content-center">
                                <ButtonGroup
                                  as={Col}
                                  className="mt-1 mb-3"
                                  lg={2}
                                >
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      arrayHelpers.push(
                                        emptyItemRiscoPrivacidade()
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </React.Fragment>
                          ))
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(emptyItemRiscoPrivacidade())
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="15">
                <Accordion.Header>
                  Observa????es sobre o Processo
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3 bg-primary bg-opacity-10 pt-2 pb-2">
                    <Form.Label as={Col}>Observa????o</Form.Label>
                  </Row>
                  <FieldArray
                    name="observacoesProcesso"
                    render={(arrayHelpers) => (
                      <React.Fragment>
                        {values.observacoesProcesso &&
                        values.observacoesProcesso.length > 0 ? (
                          values.observacoesProcesso.map((item, index) => (
                            <React.Fragment key={index}>
                              <Section16FormRow
                                className={`mb-3 pt-2 pb-2 ${
                                  index % 2 === 0
                                    ? "bg-primary bg-opacity-10"
                                    : ""
                                }`}
                                label={`Observa????o ${index + 1}`}
                                disabled={!isEditing}
                                name={`observacoesProcesso[${index}]`}
                              />
                              <Row className="justify-content-center">
                                <ButtonGroup
                                  as={Col}
                                  className="mt-1 mb-3"
                                  lg={2}
                                >
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      arrayHelpers.push(
                                        emptyItemObservacoesProcesso()
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    -
                                  </Button>
                                </ButtonGroup>
                              </Row>
                            </React.Fragment>
                          ))
                        ) : (
                          <Row className="justify-content-center">
                            <ButtonGroup as={Col} className="mt-1 mb-3" lg={2}>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  arrayHelpers.push(
                                    emptyItemObservacoesProcesso()
                                  )
                                }
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </Row>
                        )}
                      </React.Fragment>
                    )}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {props.new && (
              <Button
                type="submit"
                className="float-end mt-3"
                disabled={!(isValid && dirty)}
              >
                Registrar Novo
              </Button>
            )}
            {props.approve && (
              <Row className="float-end mt-3">
                <ButtonGroup as={Col} lg={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Aprovar</Button>
                </ButtonGroup>
              </Row>
            )}
            {props.edit && isEditing && isValid && (
              <Button
                type="submit"
                className="float-end mt-3"
                disabled={!(isValid && dirty)}
              >
                Salvar Altera????es
              </Button>
            )}
            {props.edit && !isEditing && (
              <Row className="float-end mt-3">
                <ButtonGroup as={Col} lg={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={() => onCancel()}
                  >
                    Cancelar
                  </Button>
                  <Button variant="danger" onClick={handleShowDeleteModal}>
                    Remover
                  </Button>
                  <Button variant="primary" onClick={() => onStartEditing()}>
                    Editar
                  </Button>
                </ButtonGroup>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default CaseForm;
