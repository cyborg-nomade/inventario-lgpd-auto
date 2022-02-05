/**
 * Objeto com dados dos Agentes de Tratamento.
 * @typedef {Object} AgenteTratamento
 * @property {string} nome - Nome do agente de tratamento.
 * @property {string} area - Área.
 * @property {string} telefone - Telefone do agente de tratamento.
 * @property {string} email - Email do agente de tratamento.
 */

/**
 * Objeto com as fases do ciclo de vida do tratamento de dados pessoais em que o operador do processo atua.
 * @typedef {Object} FasesCicloTratamento
 * @property {boolean} coleta - se atua na coleta de dados.
 * @property {boolean} retencao - se atua na retenção de dados.
 * @property {boolean} processamento - se atua no processamento de dados.
 * @property {boolean} compartilhamento - se atua no compartilhamento de dados.
 * @property {boolean} eliminacao - se atua na eliminação de dados.
 * @property {string[]} verbos - quais dos 20 verbos de tratamento de dados são utilizados.
 */

/**
 * Objeto com as fases do ciclo de vida do tratamento de dados pessoais em que o operador do processo atua.
 * @typedef {Object} FinalidadeTratamento
 * @property {string} hipoteseTratamento - As hipóteses de tratamento estão descritas nos arts. 7º e 11 da LGPD.
 * @property {string} descricaoFinalidade - Razão ou motivo pela qual se deseja tratar os dados pessoais.
 * @property {string} previsaoLegal - Informar Lei, Decreto, normativo ou regulamento que respalda a finalidade do tratamento de dados pessoais realizado.
 * @property {string} resultadosTitular - Resultados pretendidos para o titular de dados.
 * @property {string} beneficiosEsperados - Benefícios esperados para o órgão, entidade ou para a sociedade como um todo.
 */

/**
 * Objeto completo de casos de uso de dados pessoais, para registro, edição e aprovação.
 * @typedef {Object} NewCaseItemObject
 * @property {string} nome - Nome do serviço/processo de negócio.
 * @property {number} id - Nº Ref / ID.
 * @property {string} dataCriacao - Data de Criação do Inventário.
 * @property {string} dataAtualizacao - Data de Atualização do Inventário.
 * @property {string} criador - ID do usuário criador do item.
 * @property {AgenteTratamento} controlador - Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais.
 * @property {AgenteTratamento} encarregado - Pessoa indicada pelo controlador e operador para atuar como canal de comunicação entre o controlador, os titulares dos dados e a ANPD
 * @property {AgenteTratamento} extensaoEncarregado - Pessoa indicada pelo controlador e operador para atuar como canal de comunicação entre o controlador, os titulares dos dados e a ANPD
 * @property {AgenteTratamento} areaTratamentoDados - Pessoa indicada pelo controlador e operador para atuar como canal de comunicação entre o controlador, os titulares dos dados e a ANPD
 * @property {AgenteTratamento} operador - Pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador
 * @property {FasesCicloTratamento} fasesCicloTratamento - Em qual fase  do ciclo de vida o  Operador atua
 * @property {string} descricaoFluxoTratamento - De que forma (como) os dados  pessoais são coletados, retidos/armazenados, processados/usados, compartilhados e eliminados.
 * @property {string} abrangenciaGeografica - Abrangência da área geográfica do tratamento. Informar se a abrangência do dados tratados é nacional, estadual, distrital, municipal ou regional..
 * @property {string} fonteDados - Fonte de dados utilizada para obtenção dos dados pessoais.
 * @property {FinalidadeTratamento} finalidadeTratamento - Finalidade do Tratamento de Dados Pessoais.
 */
