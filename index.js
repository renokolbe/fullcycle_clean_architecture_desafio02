const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'dbnode',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql_i = require('mysql')
const connection = mysql_i.createConnection(config)

// Deleta a tabela caso exista
const sql1 = `DROP TABLE IF EXISTS people`
connection.query(sql1)

// Cria a tabela
const sql2 = `CREATE TABLE people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id));`
connection.query(sql2)

// Metodo Get
app.get('/', (req, res) => {

      // Inclui Nome com Valor Randomico na Tabela
      const sql3 = `INSERT INTO people (name) select concat( 
        UCASE(char(round(rand()*25)+97)),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97),
        char(round(rand()*25)+97)
      )`
      connection.query(sql3)
      
      // Obtem Lista de Nomes da Tabela
      const sql4 = "SELECT * FROM people"
      connection.query(sql4, function (err, result, fields) {
        // Se aconteceu algum erro - encerra a execucao
        if (err) throw err;
        // Caso nao tenha ocorrido erro, obtem lista de dados da tabela  e concatena
        var resultados = '<p><b>Nomes</b></p>'
        Object.keys(result).forEach(function(key) {
          var row = result[key];
          console.log(row.name)
          resultados = resultados + '<p>' + row.name + '</p>'
        });
        res.send('<h1>Full Cycle Rocks by RenoKolbe</h1><p>'+ resultados+'</p')
      });

})

app.listen(port, () => {
    console.log("Rodando na porta " + port)
})