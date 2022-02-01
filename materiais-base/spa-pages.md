# Rotas do Frontend

- "/", "/login" => Tela de Login => apenas se não logado;
- "/:uid/cases" => Lista de Casos (do Usuário especificado) => após acesso com login;
- "/cases/new" => Formulário de registro de novo caso => após acesso com login;
- "/cases/:cid" => Formulário de edição do caso de uso (comitê) => após acesso com login;
- "/cases/" => Lista total de casos (comitê) => após acesso com login;
- "/cases/approve" => Lista de casos pendentes de aprovação (comite) => após acesso com login;
