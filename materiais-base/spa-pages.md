# Rotas do Frontend

- "/", "/login" => Tela de Login => apenas se não logado;
- "/logout" => Leva ao logout
- "/:uid/cases" => Lista de Casos (do Usuário especificado) => após acesso com login;
- "/:uid/cases:cid" => Formulário de edição do caso de uso (Usuário especificado) => após acesso com login;
- "/:uid/cases/new" => Formulário de registro de novo caso => após acesso com login;
- "/cases/" => Lista total de casos (comitê) => após acesso com login;
- "/cases/approve" => Lista de casos pendentes de aprovação (comite) => após acesso com login;
- "/cases/approve/:cid" => Mostra um caso pendentes de aprovação (comite) => após acesso com login;
