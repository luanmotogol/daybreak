const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

// Servindo arquivos estáticos (incluindo favicon.ico)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '123',
  database: 'gg'  // Nome do banco de dados alterado para 'gg'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados MySQL estabelecida.');
});

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para lidar com o registro de uma conta
app.post('/registrar', (req, res) => {
  const { UserAccount, Password } = req.body; // Renomear para UserAccount e Password

  // Verificação adicional
  if (!UserAccount || !Password) {
    return res.status(400).send('Por favor, forneça um login e uma senha.');
  }

  console.log('Dados recebidos para registro:', req.body);

  const sql = `INSERT INTO daybreak_users (UserAccount, Password) VALUES (?, ?)`;
console.log('Consulta SQL:', sql, UserAccount, Password);

  app.post('/registrar', (req, res) => {
    const { UserAccount, Password } = req.body;
    console.log('Dados recebidos:', UserAccount, Password);
    // Restante do código...
  });
  

  db.query(sql, [UserAccount, Password], (err, result) => { // Usar os novos nomes aqui
    if (err) {
      console.error('Erro ao registrar conta:', err);
      return res.status(500).send('Erro ao registrar conta.');
    }
    console.log('Conta registrada com sucesso!', result);
    res.send('Conta registrada com sucesso!');
  });
});

// Rota de teste de conexão
app.get('/test-connection', (req, res) => {
  const sql = 'SELECT 1 + 1 AS solution';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta de teste:', err);
      res.status(500).send('Erro ao executar a consulta de teste.');
      return;
    }
    console.log('Consulta de teste executada com sucesso!', results);
    res.send(`A conexão com o banco de dados está funcionando. Resultado: ${results[0].solution}`);
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
