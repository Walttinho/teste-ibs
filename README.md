# Desenvolvimento de uma aplicação para gerenciamento de pessoas e seus endereços

Neste projeto, vamos criar uma API REST em Node.js para realizar operações de CRUD (Create, Read, Update, Delete) em registros de pessoas, cada uma contendo as seguintes informações:

- Nome;
- Sexo;
- Data de nascimento;
- Estado civil;
- Múltiplos endereços, contendo:
  - CEP;
  - Endereço;
  - Número;
  - Complemento;
  - Bairro;
  - Estado;
  - Cidade.

Para consumir esta API, será necessário desenvolver um front-end com uma interface intuitiva para listar, cadastrar, editar e excluir pessoas, incluindo seus respectivos endereços. Uma funcionalidade adicional desejada é a integração com uma API de consulta de CEPs para preencher automaticamente os detalhes do endereço.

Ao cadastrar uma pessoa com sucesso, exibir sua idade e quantos dias faltam para o próximo aniversário, apresentando uma mensagem de parabéns se o cadastro ocorrer no dia do aniversário.

## Funcionalidades Básicas:

- Operações CRUD para pessoas e seus endereços.
- Integração com API de consulta de CEPs.
- Exibição da idade da pessoa e quantos dias faltam para o próximo aniversário ao cadastrar uma pessoa, com mensagem de parabéns se for o dia do aniversário.

## Requisitos Adicionais:

- **Validações e Tratamento de Erros:** Implementar validações nos campos de entrada tanto no front-end quanto no back-end, e adicionar tratamento de erros em todas as camadas da aplicação.
- **Desafios Opcionais:** 
    - Utilização do framework NestJS no back-end;
    - Utilização do framework Angular no front-end;
    - Paginação e Busca: Adicionar suporte à paginação na listagem de pessoas para lidar com grandes conjuntos de dados, e implementar um mecanismo de busca para filtrar pessoas com base em critérios como nome, sexo, estado civil, etc.
    - Autenticação e Autorização: Criar um sistema de autenticação de usuários para acessar a API e o front-end, garantindo que apenas usuários autorizados possam realizar operações.
