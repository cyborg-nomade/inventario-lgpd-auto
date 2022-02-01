# Rotas

## Rotas de Usuários (/api/users/...)

- **GET .../**
  - retorna lista com todos os usuários
- **POST .../login**
  - faz login do usuário

## Rotas de Casos de Uso de Dados (/api/cases/...)

- **GET .../**
  - retorna todos os casos de uso de dados cadastrados
- **GET .../user/:uid**
  - retorna todos os usos cadastrados pelo usuário especificado
- **GET .../:cid**
  - retorna o caso de uso de dados especificado
- **POST .../**
  - registra um novo caso de uso de dados
- **PATCH .../:cid**
  - edita o caso de uso de dados especificado
- **DELETE .../:cid**
  - elimina o cado de dados especificado
