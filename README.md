<h1>MeetApp</h1>

<p>Aplicação que funciona como agregador de eventos para agendamentos e cadastro de usuários. <br> A estrutura é uma Api Rest que retorna respostas em JSON.</p>
<p>Funções atuais:</p>
<ul>
	<li>Cadastro de Usuários, com encriptação da senha em JWT</li>
	<li>Login/Criação de Sessão</li>
	<li>Atualização dos dados do usuário logado</li>
</ul>

<br>
<br>
<h2>Rotas: </h2>
<p> Método HTTP: /Rota</p>
<p>
	<h3>GET:  /</h3>
	- Rota usada como teste, caso a aplicação esteja rodando retornará: 
</p>

```json
{ 
	"message": "tudo ok"
}
```

<p>
	<h3>POST:  /user</h3>
	- Cadastra o usuário recebendo name, email e password. O cadastro com sucesso recebe os dados enviados com o status 201(Created).
	<br>A senha será encriptada em hash antes de ser gravada no banco de dados.
</p>

```json
//Requisição:
{
	"name" : "name",
	"email" : "email@email.com",
	"password" : "password123"
}
```

<p>
	<h3>POST:  /login</h3>
	- Cria sessão e autentica o usuário para ter acesso a aplicação, podendo editar seus dados de cadastro futuramente outras funções.
	Deve enviar email e senha em json com método post  no formato a seguir: 
</p>

```json
{
	 "email":"email",
	 "password": "senha"
}
```

<p>
	Caso login e senha estejam corretos conforme o cadastrado, a resposta será:
</p>

```json
{
	  "name": "nomeCadastrado",
	  "email": "email",
	  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNTk0MTQ3MDIyLCJleHAiOjE1OTQ3NTE4MjJ9.biKWaL79_mkxK8cwgkUQ5mZP6Z4LM5LmLRVso2LY5K4"
}
```
<p> O token recebido será usado no front end para certificar a autenticação do usuário e algumas rotas só poderão ser acessadas pelo usuário ao informar esse token no corpo da requisição.
<p> Em caso de email ou senha incorreta:</p>

```json
//Email incorreto:
{
  "erro": "Usuário não encontrado!"
}
//Senha incorreta
{
  "erro": "Senha incorreta"
}
```
<p>
<h3>PUT:  /user</h3>
- Edita os dados do usuário logado, apenas será sobrescrito os dados enviados. E possível editar apenas os atributos informados não sendo necessário sempre enviar todos os dados.
Em caso de mudança de senha deverá ser informada a senha antiga, informar a nova senha e confirmar a nova senha.
</p>

```

{
	"name": "NovonomeDoUsuario",
	"email":"novoemail@email.com",
	"password": "senha", //se informada os campos abaixo são obrigatórios
	"confirmPassword": "senha",
	"oldPassword": "senhaAntiga" 
}

```
<br><br>


## Fazendo Funcionar

Antes de tudo é necessário ter nodejs e npm instalado.

Abra o terminal no mesmo diretório da aplicação e execute:

```bash

npm install

```

Assim será instalado todas as dependências, após isso para rodar a aplicação execute:

```bash

npm run dev

```

A aplicação será aberta em modo dev e ao aparecer a mensagem abaixo: 

```bash

--------Server Iniciado--------

```

Pronto a aplicação estará pronta para ser testada, agora só usar alguma aplicação que teste API's Rest para testar as requisições ou teste no modo hard usando cURL :v




<br><br>

## Tecnologias usadas:
	- Node.js
	- Express.Js
	- Sqlite
	- Sequelize
	- JWT Json Web Token
	- Bcrypt
	- Nodemon
	- Sucrase
	- Yup
