### Planejando do zero um Sass Multi-tenancy para pequenas empresas.

## Etapa 1 - Entendendo conceitos.

Software as a service = Software como um serviço.
Multi-tenancy = Vários inquilinos.


Single-Tenant 
  - Vantagem: Personalizar abertamente o sistema.
  - Desvantagem: Alto custo de manutenção do sistema original.

<br />
Multi-Tenant <br />
  1. Domínio
  2. Sub-domínio
  3. Login
  4. Rota

  - Vantagem: Baixo custo de manutenção do sistema.
  - Desvantagem: Acoplamento de recursos.

## Etapa 2 - Planejamento do sistema.

Sistema de delivery <br />

### Pessoas que vão utilizar esse sistema:
  - Usuário final.
  - O Estabelecimento.
  - Admin do sistema.

### Funcionalidades Principais:

| Usuário final | Estabelecimento | Admin |
|--|--|--|
| Carrinho de compras (com checkout) - (sem pagamentos pelo app). | Gestão de pedidos | Gestão de estabelecimentos. |
| Listagem de produtos. | Gestão de produtos. |  |
| Login/Cadastro. |  |  |
| Visualização de pedido. |  |  |

### Telas e experiência em geral:

| Usuário final | Estabelecimento | Admin |
|--|--|--|
| Home (Listagem de promoções e produtos). | Login/Cadastro para estabelecimentos | Listagem de estabelecimentos. |
| Página do produto específico. | Listagem de pedidos. | Edição de estabelecimentos. |
| Carrinho de compras. | Edição de pedidos. | Listagem de usuários. |
| Login/Cadastro. | Listagem de produtos. |  |
| Esqueci minha senha. | Edição de produtos. |  |
| Checkout (para logado). |  |  |
| Cadastro de endereços. |  |  |
| Lista de pedidos. |  |  |
| Pedido individual. |  |  |

## Etapa 3 - Definindo as tecnologias.

- NextJs
- Prisma ORM
- MySQL / PostgreSQL
- API RESTFull
- Typescript

## Etapa 4 - Definindo os Endpoints das telas de forma geral.

- Tela Home:
  - GET: Pegar lista de promoções
  - GET: Pegar lista dos produtos.

- Página do produto especifico:
  - GET: Pegar informações do produto em especifico.

- Carrinho de compras:
  - GET: Calcular o frete baseado no bairro.

- Login/Cadastro:
  - POST: Realizar o cadastro do usuário.
  - POST: Realizar o login do usuário.

- Esqueci minha senha.
  - POST: Envio do e-mail de esqueci minha senha.

- Checkout:
  - GET: Pegar endereços do usuário.
  - POST: Fazer o pedido (Produtos, Endereço, Usuário e Tipo de pagamento).

- Cadastro de endereços:
  - POST: Cadastrar um endereço.

- Lista de pedidos:
  - GET: Pegar a lista de pedidos do usuário

- Pedido individual:
  - GET: Pegar informações de um pedido em especifico.
  - GET: Pegar status do pedido.

- Login para estabelecimentos.
  - POST: Logar o estabelecimento.

- Listagem de pedidos.
  - GET: Para listar os pedidos do estabelecimento.

- Edição de pedidos.
  - GET: Pegar informações do pedido único.
  - GET: Pegar lista de produtos.
  - PUT: Salvar as alterações do pedido único.

- Listagem de produtos.
  - GET: Pegar lista de produtos.
  - DELETE: Excluir um produto (soft-delete).

- Edição de produtos.
  - GET: Pegar informações de um produto único.
  - POST: Adicionar um produto.
  - PUT: Editar um produto.

- Listagem de estabelecimentos.
  - GET: Pegar lista de estabelecimentos.

- Edição de estabelecimentos.
  - GET: Pegar informações de um estabelecimento único.
  - POST: Adicionar um novo estabelecimento.
  - PUT: Alterar informações do estabelecimento.

- Listagem de usuários.
  - GET: Pegar a lista de usuários.

## Etapa 5 - Planejando o banco de dados.

Planejar o banco de dados primeiramente com as informações principais, depois alterando conforme for surgindo as necessidades.



